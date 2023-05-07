
// register user in array******************

// const findUser = users.find((user)=> user.username === username)
// if(findUser)
//     return res.status(400).json('User already exists....', uuid)


// const newUser = {
    //     uuid: uuid,
    //     username,
    //     address,
    //     token,
    //     post
    // }

    // users.push(newUser)

    // res.send(`${newUser} is registered`)
    // res.send(newUser)

// Find user in array**************************
// const searchUser = users.find((user) => user.username === username)



// Get user with Token************************
// app.post('/user', (req, res) => {
//     const {usertoken} = req.headers
//     console.log(req.headers)
//     if(!usertoken)
//         return res.status(404).send('Unauthorized')
    
//     const verifiedUser = jwt.verify(usertoken, jwtSecret, (err, result) => {
//         if(err)
//             return res.status(404).json("Error logging user in.... please sign in again")
//         return result
//     })

//     req.verifiedUser = verifiedUser
//     console.log(req.verifiedUser)

//     const foundUser = users.find((user) => user.username === req.verifiedUser)

//     res.send(foundUser)
// })
