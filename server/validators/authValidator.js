const Joi = require('joi')

const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments:2})
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required(),
        repeat_password: Joi.ref('password')
    })
    .with('email', 'password')
    .with('email', 'repeat_password')

    const {email, password, repeat_password} = req.body
    const {error} = schema.validate({email, password, repeat_password})
    if(error){
        console.log("Register Validator Error: ",{ message: error.details[0].message})
        switch(error.details[0].context.key){
            case "email":
                return res.status(500).json({ message: "Email must be a valid email" })
            case "password":
                return res.status(500).json({ message: "Password must contain at leat 6 characters" })
            case "repeat_password":
                return res.status(500).json({ message: "Password mismatch" })
            default:
                return res.status(500).json({ message: "An error occured, please try again..." })
        }
    }
    return next()
}

const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments:2}).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    })
    .with('email', 'password')

    const {email, password} = req.body
    const {error} = schema.validate({email, password})
    if(error){
        console.log("Login Validator Error: ", { message: error.details[0].message})
        switch(error.details[0].context.key){
            case "email":
                return res.status(500).json({ message: "Email must be a valid email" })
            case "password":
                return res.status(500).json({ message: "Password does not meet minimum requirement" })
            default:
                return res.status(500).json({ message: "An error occured..."})
        }
    }
    return next()
}

module.exports = {
    registerValidator,
    loginValidator
}