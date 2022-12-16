const jwt = require('jsonwebtoken')
const createUserToken = async(user, req, res) =>{

    //Criação do token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    },
    "$2a$12$W/N8/NO5uh7x55ITOqZU2e4yjVGFhmzOfcnaS494EOWWtwtZIsbqK"
    )

    //Retorna o token
    res.status(200).json({
        message:'Você esta autenticado!',
        token:token,
        userId:user._id
    })
}

module.exports = createUserToken