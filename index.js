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
        const user=await User.findOne({email})
        console.log("login ",user)
        if(!user)
            return res.status(401).json({message:'User Not found'})
        if(user.email!==email)
            return res.status(401).json({message:'Invalid emilID'})
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