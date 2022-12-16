const jwt = require('jsonwebtoken')
const getToken = require('./GetToken')
//Middleware to validate token
const checkToken = (req, res, next) =>{

    if(!req.headers.authorization){
        return res.status(401).json({message:'Acesso negado!'})
    }

     const  token = getToken(req)
     
     if(!token){
        return res.status(401).json({ message:'Acesso negado!' })
     }

     try {
        const verified = jwt.verify(token,'$2a$12$W/N8/NO5uh7x55ITOqZU2e4yjVGFhmzOfcnaS494EOWWtwtZIsbqK')
        req.user = verified
        next()
     } catch (err) {
        return res.status(400).json({message:'Token inválido!'})
     }
}

module.exports = checkToken