const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel')
// const users = require('../models/user')
// let posts = require('../models/post')

const makePostController = async(req, res) => {
    const {title, content} = req.body
    // const foundUser = users.find((user) => user.email == req.decodedEmail)   //array option
    const foundUser = await UserModel.findOne({email: req.decodedEmail})
    if(!foundUser)
        return res.status(400).json('user not found, login...')

    const newPost = {
        id: foundUser.uuid,
        title: title,
        slug: title.toLowerCase().split(' ').join('-'),
        content: content,
        date: new Date()
    }
    // posts = [newPost, ...posts]   //array option

    await PostModel.create(newPost) //mongodb option
    res.status(200).json(`${req.decodedEmail} created a new post...`)
}

const getUserPostsController = async(req, res) => {
    // const foundUser = users.find((user) => user.email == req.decodedEmail)   //array option
    const foundUser = await UserModel.findOne({email: req.decodedEmail}).exec() //mongodb option
    if(!foundUser)
        return req.status(400).json('user not found, login...')
    // const userPosts = posts.filter((post) => post.id == foundUser.uuid)   //array option
    const userPosts = await PostModel.find(
        {id: foundUser.uuid}, 
        "-_id title slug content date"   //Selects fields to be shown, minus id
    )
    .sort({date: -1})
    .exec()


    res.status(200).json(userPosts)
}

const getAllPostsController = async(req, res) => {
    // get All posts from database
    // res.status(200).json(posts)
    const allPosts = await PostModel.find(
        {},
        "-_id title slug content date"
    )
    .sort({date: -1})
    .exec()
    res.status(200).json(allPosts)
}

module.exports = {
    makePostController,
    getUserPostsController,
    getAllPostsController
}