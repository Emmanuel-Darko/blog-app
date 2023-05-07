// const users = require('../models/user') //array option
const UserModel = require('../models/userModel')  //mongodb option

const profileController = async(req, res) => {
    const decodedEmail = req.decodedEmail
    // const foundUser = users.find((user) => user.email == decodedEmail) //array option
    const foundUser = await UserModel.findOne({email: decodedEmail}).exec()   //mongodb option
    if(!foundUser)
        return res.status(400).json('user not found...')
    res.status(200).json(foundUser)
}

module.exports = {
    profileController
}