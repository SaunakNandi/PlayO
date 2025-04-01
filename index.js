const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const moment=require('moment')
const jwt=require('jsonwebtoken')
const app=express()
const port=8000
const cors=require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://saunak:saunak@cluster0.uzoamlw.mongodb.net/').then(()=>{
    console.log('Connected to MongoDB')
}).catch(err => console.log("Error connecting to MongoDB"))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})