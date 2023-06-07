const express = require('express')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
require('dotenv').config()

const app = express()
const port = process.env.PORT
const jwtSecret = process.env.jwtSecret

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_blog'
})

db.connect((err) => {
    if(err)
        return console.log(err)
    console.log('Database connected successfully...')
})

app.use(express.json())

const users = []

// Get all users
app.get('/', (req, res) => {
    db.query(`SELECT * FROM users`, (err, result) => {
        if(err)
            return console.log(err)
        res.status(200).json(result)
    })
})

// Register User
app.post('/register', (req, res) => {
    const {username, address, token, post} = req.body
    console.log(username)
    const uuid = uuidv4()
    db.query(`SELECT * FROM users WHERE username = "${username}"`, (err, result) => {
        if(err){
            console.log("ERROR: ", err) //SUCCESS... No user found with similar name
            res.status(400).json('Server Error, Please try again later...')
        }

        if(result.length !== 0 ){
            return res.status(401).json('User already exists!')
        }
        if(result.length == 0){
            nextFunc()
        }

    })
    function nextFunc(){
        db.query(`INSERT INTO users(uuid, username, address, token, post) 
            VALUES("${uuid}", "${username}","${address}","${token}", "${post}")`, (err, result) => {
            if(err){
                console.log(err)
                res.status(400).json('Unable to register user, Please try again later...')
            }
            res.status(201).json(`${username} is registered...`)
        })
    }

})

// Login User
app.post('/login', (req, res) => {
    const {username} = req.body
    db.query(`SELECT * FROM users WHERE username = "${username}"`, (err, result) => {
        console.log("RESULT", result)
        if(err){
            console.log(err)
            res.status(400).json('Server error occured, try signing in again')
        }
        if(result.length == 0)
            return res.status(401).json("User not Found... Please register!")
        if(result.length > 0)
            nextFunc()
    })
    function nextFunc(){
        const token = jwt.sign(username, jwtSecret)
        db.query(`UPDATE users SET token = "${token}" WHERE username = "${username}"`, (err, result) => {
            if(err)
                return res.status(400).json("Unable to set token for user")
            
            res.status(200).json(`Authorized for ${username}: ${token}`)
        })
    }
})

// Get user with Token
app.post('/user', (req, res) => {
    const {usertoken} = req.headers
    if(!usertoken)
        return res.status(404).send('Unauthorized')
    
    const verifiedUser = jwt.verify(usertoken, jwtSecret, (err, result) => {
        if(err)
            return res.status(404).json("Error logging user in.... please sign in again")
        return result
    })

    req.verifiedUser = verifiedUser

    db.query(`SELECT * FROM users WHERE token = "${usertoken}"`, (err, result) => {
        if(err)
            return res.status(400).json(`Token for user ${req.verifiedUser} does not exist`)
        res.status(200).json(result[0])
    })
})

app.post('/post', (req, res)=> {
    const {username, post} = req.body
    // const stringPost
    const token = jwt.sign(username, jwtSecret)
    if(token){
        db.query(`SELECT uuid FROM users WHERE token = "${token}"`, (err, result)=> {
            console.log('Result************', result[0].uuid)
            if(err){
                console.log(err)
                return res.status(404).json('user not found...')
            }
            db.query(`UPDATE users SET post = "${post}" WHERE uuid = "${result[0].uuid}"`, (err, result)=>{
                if(err){
                    return res.status(400).json('Unable to set Post please try again...')
                }
                res.status(201).json('Post made successfully.')
            })
        })
    }

})

app.post('/getPosts', (req, res) => {
    const {username} = req.body
    db.query(`SELECT uuid FROM users WHERE username = "${username}"`, (err, result) => {
        console.log("RESULT", result)
        if(err){
            console.log(err)
            res.status(400).json('Server error occured, try signing in again')
        }
        if(result.length == 0)
            return res.status(401).json("User not Found... Please register!")
        if(result.length > 0){
            req.uuid = result[0].uuid
            nextFunc()
        }
    })
    function nextFunc(){
        db.query(`SELECT post FROM users WHERE uuid = "${req.uuid}"`, (err, result) => {
            if(err){
                console.log(err)   
                return res.status(400).json('Unable to retrieve posts... please try again later')
            }
            res.status(200).json(result)
        })
    }
})



app.listen(port, ()=> {
    console.log(`App running on port ${port}`)
})