const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./db/dbConfig')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')

const app = express()
app.use(express.json())
app.use(cors())

//Routes 
app.use('/auth', authRouter)
app.use('/user', userRouter)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})