const Joi = require('joi')

const makePostValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(2)
            .required(),
        content: Joi.string()
            .min(20)
            .required()
    })
    .with('title', 'content')

    const{title, content} = req.body
    const {error} = schema.validate({title, content})
    if(error){
        console.log("Post Validator Error: ", { message: error.details[0].message})
        switch(error.details[0].context.key){
            case "title":
                return res.status(500).json({ message: "Title must be at least 2 chars long..." })
            case "content":
                return res.status(500).json({ message: "Content must be at least 20 chars long..." })
        }
    }
    return next()
}

module.exports = {
    makePostValidator
}