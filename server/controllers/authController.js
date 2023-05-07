// const users = require('../models/user')  //array option
const UserModel = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')

var salt = bcrypt.genSaltSync(10);

const registerController = async (req, res) => {
    const {email, password} = req.body
    const hashedPass = bcrypt.hashSync(password, salt)
    const newUser = {
        uuid: uuidv4(),
        email,
        password: hashedPass,
        username: ''
    }
    // users.push(newUser)   //array option
    await UserModel.create(newUser)
    res.status(201).json(newUser)
}

const loginController = (req, res) => {
    const {email} = req.body
    const token = req.token
    res.status(200).json(`${email} logged in: ${token}`)
}

module.exports = {
    registerController,
    loginController
}