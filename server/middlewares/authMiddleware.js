// const users = require('../models/user') //array option
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtSecret = process.env.jwtSecret

const registerMiddleware = async(req, res, next) => {
    const { email } = req.body
    // const foundUser = users.find((user) => user.email == email) //array option
    const foundUser = await UserModel.findOne({email}).exec()
    if(foundUser)
        return res.status(404).json("User already exists, sign in...")

    if(!foundUser)
        next()
}

const loginMiddleware = async(req, res, next) => {
    const { email, password } = req.body
    // const foundUser = users.find((user) => user.email == email) //array option
    const foundUser = await UserModel.findOne({email}).exec()
    if(!foundUser)
        return res.status(400).json('User does not exist consider signing up...')
    
    const comparePass = bcrypt.compareSync(password, foundUser.password)

    if(!comparePass)
        return res.status(404).json('Check email or password...')
    
    const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60), //expires in 1hr
            email, // email to be signed
        },
        jwtSecret // private key
    )
    req.token = token
    next()
}

const verifyUserMiddleware = (req, res, next) => {
    const {usertoken} = req.headers
    jwt.verify(usertoken, jwtSecret, (err, decoded) => {
        if(err){
            console.log(err)
            return res.status(404).json('session expired, please login...')
        }
        req.decodedEmail = decoded.email
        next()
    })
}

module.exports = {
    registerMiddleware,
    loginMiddleware,
    verifyUserMiddleware
}