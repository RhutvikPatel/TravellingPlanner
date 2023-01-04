const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route = require("./src/routes/route")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config()


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
.then(() => console.log("MongoDb is Connected..."))
.catch(err => console.log(err))

app.use("/",route)

app.listen(process.env.PORT, ()=>
    console.log("Express App Running On Port 3000")
)