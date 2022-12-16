const jwt = require('jsonwebtoken')
const User = require('../models/User')

//Pegando o usuário através do jwt token
const getUserByToken = async(token) =>{

    if(!token){
        return res.status(401).json({
            message:"O token não foi encontrado!"
        })
    }
    const decoded = jwt.verify(token, '$2a$12$W/N8/NO5uh7x55ITOqZU2e4yjVGFhmzOfcnaS494EOWWtwtZIsbqK')
    const userId = decoded.id
    const user = await  User.findOne({_id:userId})
    return user
}

module.exports = getUserByToken