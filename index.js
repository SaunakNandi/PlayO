const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const moment=require('moment')
const jwt=require('jsonwebtoken')
const app=express()
const port=8000
const cors=require('cors')
const crypto=require('crypto')
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const User=require('./models/User.models.js')
const Game=require('./models/Game.models.js')
const Venue=require('./models/Venue.models.js')
const {venues} = require('./constants.js')
const { request } = require('http')

mongoose.connect('mongodb+srv://saunak:saunak@cluster0.uzoamlw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Connected to MongoDB')
}).catch(err => console.log("Error connecting to MongoDB"))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

app.post('/register',async(req,res)=>{
    console.log('called')
    try {
        const userData=req.body
        const newUser=new User(userData)  // creating new user
        await newUser.save()
        console.log(newUser)
        const secretKey=crypto.randomBytes(32).toString("hex")
        const token=jwt.sign({userId:newUser._id},secretKey)
        res.status(200).json({token})
    } catch (error) {
        console.log(`Error registering`,error)
        res.status(500).json({error:"Registration Error"})
    }
})

app.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email,password)
        const user=await User.findOne({email})
        console.log("login ",user)
        if(!user)
            return res.status(401).json({message:'User Not found'})
        if(user.password!==password)
            return res.status(401).json({message:'Invalid Password'})
        const secretKey=crypto.randomBytes(32).toString('hex')
        const token=jwt.sign({userId:user._id},secretKey)
        res.status(200).json({token})
    } catch (error) {
        console.log(`Error registering`,error)
        res.status(500).json({error:"Login Error"})
    }
})

async function addVenues(){
    for(const venueData of venues)
    {
        const existingVenue=await Venue.findOne({name:venueData?.name})
        if(existingVenue)
        {
            console.log("Venue ${venueData.name} already exists. Skipping")
        }
        else{
            const newVenue=new Venue(venueData)
            await newVenue.save()
            console.log("Venue ${venueData.name} added successfully")
        }
    }
}

addVenues().catch(err=>{
    console.log('Error adding venues',err)
})

app.get('/venues',async(req,res)=>{
    try {
        const venues=await Venue.find({})
        res.status(200).json(venues)
    } catch (error) {
        console.log("Venue error",error)
        res.status(500).json({message:"Failed to fetch venues"})
    }
})

app.post('/creategame',async(req,res)=>{
  try {
    const {sport,area,date,time,admin,totalPlayers}=req.body
    const activityAccess="Public"
    const newGame = new Game({
        sport,
        area,
        date,
        time,
        admin,
        totalPlayers,
        players: [admin],
      });
    const savedGame=await newGame.save()
    res.status(200).json(savedGame)
  } catch (error) {
    console.log("Error",error)
    res.status(500).json({message:"Failed to create a game"})
  }
})

app.get('/games',async(req,res)=>{
    try {
        const games=await Game.find({}).populate('admin').populate('players','image firstName lastName')
        // console.log(games.length)
        const currentDate=moment()
        const filteredGames=games?.filter(game=>{
            // console.log("game ",game)
            const gameDate=moment(game.date,"Do MMM")
            // console.log("game time ",game.time)
            const gameStartTime=game.time.split(" - ")[0]
            // console.log('game time',gameTime)
            const gameDateTime=moment(`${gameDate.format("YYYY-MM-DD")} ${gameStartTime}`,'YYYY-MM-DD h:mm A')  //2025-04-13 10:00
            return gameDateTime.isAfter(currentDate)
        })
        const formattedGames=filteredGames.map(game=>(
            {
                _id:game._id,
                sport:game.sport,
                date:game.date,
                area:game.area,
                time:game.time,
                players:game.players.map(player=>({
                    _id:player._id,
                    imageUrl:player.image,
                    name:`${player.firstName} ${[player.lastName]}`,
                })),
                totalPlayers:game.totalPlayers,
                queries:game.queries,
                requests:game.requests,
                isBooked:game.isBooked,
                adminName:`${game.admin.firstName} ${game.admin.lastName}`,
                adminUrl:game.admin.image,
                matchFull:game.matchFull
            }
        ))
        return res.json(formattedGames)
    } catch (error) {
        console.log("Error",error)
    res.status(500).json({message:"Failed to fetch game"})
    }
})


// games which I am a part of
app.get('/upcoming',async(req,res)=>{
    try {
        const userId=req.query.userId
        console.log("upcoming userId ",userId)
        //  either the user is admin or player
        const games=await Game.find({$or:[{admin:userId},{players:userId}]})
            .populate("admin").populate("players","image firstName lastName")
        console.log("upcoming games ",games)

        const formattedGames=games.map(game=>({
                _id:game._id,
                sport:game.sport,
                date:game.date,
                area:game.area,
                time:game.time,
                players:game.players.map(player=>({
                    _id:player._id,
                    imageUrl:player.image,
                    name:`${player.firstName} ${[player.lastName]}`,
                })),
                totalPlayers:game.totalPlayers,
                queries:game.queries,
                requests:game.requests,
                isBooked:game.isBooked,
                courtNumber:game.courtNumber,
                adminName:`${game.admin.firstName} ${game.admin.lastName}`,
                isUserAdmin:game.admin._id.toString()===userId,
                adminUrl:game.admin.image,
                matchFull:game.matchFull,
            }
        ))
        // console.log("formattedGames ",formattedGames)
        res.status(200).json(formattedGames)   // Wrong status code can cause unexpected problem
    } catch (error) {
        console.log("Error upcoming",error)
        res.status(500).json({message:'Failed to fetch games'})
    }
})

// api to send user a request to accept a particular game
app.post('/games/:gameId/request',async(req,res)=>{
    try {
        const {userId,comment}=req.body
        console.log("userId and its type ",userId,typeof userId)
        const {gameId}=req.params
        const game=await Game.findById(gameId)
        console.log("game ",game)
        if(!game)
            return res.status(400).json({message:"Game not found"})
        const existingRequest=game?.requests?.find(request=>request.userId.toString()==userId)
        console.log(existingRequest)
        if(existingRequest)
            return res.status(400).json({message:"Request already sent"})

        game.requests.push({userId,comment})
        await game.save()
        res.status(200).json({message:"Request sent successfully"})
    } catch (error) {
        console.log("Error upcoming",error)
        res.status(500).json({message:'Failed to send request'})
    }
})

// api to show all of the request to admin

app.get('/games/:gameId/requests',async(req,res)=>{
    try {
        const {gameId}=req.params;
        console.log("Request called with game ID",gameId)
        const game=await Game.findById(gameId).populate({
            path:'requests.userId',
            select:'email firstName lastName image skill noOfGames playpals sports'
        })
        if(!game) return res.status(400).json({message:"Game not found"})
        const requestsWithUserInfo=game?.requests?.map(request=>({
            userId: request.userId._id,
            email: request.userId.email,
            firstName: request.userId.firstName,
            lastName: request.userId.lastName,
            image: request.userId.image,
            skill: request.userId.skill,
            noOfGames: request.userId.noOfGames,
            playpals: request.userId.playpals,
            sports: request.userId.sports,
            comment: request.comment,
        }))
        console.log("Requests with User Info ",requestsWithUserInfo)
        res.status(200).json(requestsWithUserInfo)
    } catch (error) {
        console.log('Error',error)
        res.status(500).json({message:"Falied to get the requests"})
    }
})

app.get("/user/:userId",async(req,res)=>{
    try {
        const {userId}=req.params
        const user=await User.findById(userId)
        if(!user)
            return res.status(200).json({message:"User not found"})
        return res.status(200).json({user})
    } catch (error) {
        console.log('Error',error)
        res.status(500).json({message:"Falied to fetch user"})
    }
})

app.post('/accept',async(req,res)=>{
    try {
        const {gameId,userId}=req.body
        // console.log("gameId for accept",gameId)
        const game=await Game.findById(gameId)
        if(!game)
            return res.status(404).json('Game not found')

        game.players.push(userId)
        await Game.findByIdAndUpdate(gameId,{
            $pull:{requests:{userId:userId}}   // pulling userId from requests
        },{new:true})

        await game.save()
        res.status(200).json({message:'Request accepted',game})

    } catch (error) {
        console.log('Error',error)
        res.status(500).json({message:"Falied to fetch user"})
    }
})

app.get('/game/:gameId/players',async(req,res)=>{
    try {
        const {gameId}=req.params
        const game=await Game.findById(gameId).populate('players')
        if(!game)
            return res.status(404).json({message:'Game not found'})

        res.status(200).json(game.players)
    } catch (error) {
        console.log('Error',error)
        res.status(500).json({message:"Falied to fetch players"})
    }
})

app.post('/book',async(req,res)=>{
    try {
        const {courtNumber,date,time,userId,name,game}=req.body
        const venue=await Venue.findOne({name})

        if(!venue)
            return res.status(404).json({message:"Venue not found"})
        const bookingConflict=venue?.bookings && venue.bookings.find(booking=>booking.courtNumber==courtNumber&& booking.date==date && booking.time==time)
        if(bookingConflict) return res.status(400).json({message:"Slot already booked"})
        
        venue.bookings.push({courtNumber,date,time,user:userId,game})
        await venue.save()
        await Game.findByIdAndUpdate(game,{
            isBooked:true,
            courtNumber:courtNumber
        })
        res.status(200).json({message:"Booking successful",venue})
    } catch (error) {
        console.log('Error',error)
        res.status(500).json({message:"Falied to fetch players"})
    }
})

app.post('/toggle-match-full',async(req,res)=>{
    try {
        const {gameId}=req.body
        const game=await Game.findById(gameId)
        if(!game) return res.status(404).json({message:"Game not found"})
        game.matchFull=!game.matchFull
        await game.save()
        res.status(200).json({message:"Matchfull status updated",matchFull:game.matchFull})
    } catch (error) {
        console.log('Error',error)
        res.status(500).json({message:"Falied to mark matchfull"})
    }
})