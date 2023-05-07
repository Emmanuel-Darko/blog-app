const express = require('express')
require('dotenv').config()
require('./db/dbConfig')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')

const app = express()
app.use(express.json())

//Routes 
app.use('/auth', authRouter)
app.use('/user', userRouter)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})