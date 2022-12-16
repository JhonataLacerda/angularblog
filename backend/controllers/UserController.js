const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/Create-User-Token')
const getToken = require('../helpers/GetToken')
const jwt = require('jsonwebtoken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class UserController {

    static async register(req, res) {
        const { name, email, password, confirmpassword } = req.body

        //Validações do campos acima ^^

        if (!name) {
            res.status(422).json({
                message: 'O nome do usuário é obrigatório!'
            })
            return
        }

        if (!email) {
            res.status(422).json({
                message: 'O E-mail do usuário é obrigatório!'
            })
            return
        }
        if (!password) {
            res.status(422).json({
                message: 'A senha é obrigatória!'
            })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({
                message: 'A confirmação da senha é obrigatória!'
            })
            return
        }

        //Verifica se o usuário existe

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(422).json({
                message: 'Por favor, utilize um outro E-mail'
            })
            return
        }

        //Criação de uma senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //Criação de um usuário
        const user = new User({
            name,
            email,
            password: passwordHash,

        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)


        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    
    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({
                message: 'O E-mail é obrigatório!'
            })
            return
        }

        if (!password) {
            res.status(422).json({
                message: 'A senha é obrigatória!'
            })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(422).json({
                message: 'Não há usuário cadastrado com este E-mail!'
            })

            return
        }

        //Verifica se a senha é igual a senha do banco de dados
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({
                message: 'Senha invalida!'
            })
            return
        }

        await createUserToken(user, req, res)

    }

    static async checkUser(req, res) {
        let currentUser
        console.log(req.headers.authorization)
        if (req.headers.authorization) {

            const token = getToken(req)
            const decoded = jwt.verify(token, '$2a$12$W/N8/NO5uh7x55ITOqZU2e4yjVGFhmzOfcnaS494EOWWtwtZIsbqK')
            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined
        } else {
            currentUser = null
        }
        res.status(200).send(currentUser)





    }

    static async getAll(req, res){
        const user = await User.find().select("-password").sort('-createdAt');
        res.status(200).json(user)
    }


    static async getUserById(req, res) {
        const id = req.params.id
        const user = await User.findById(id).select("-password")

        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            }
            )
            return
        }
        res.status(200).json({
            user
        })
    }

    static async editUser(req, res) {

        const id = req.params.id

        //Check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)
        const { name, email, password, confirmpassword } = req.body



        if (req.file) {
            user.image = req.file.filename
        }

        //Validations
        if (!name) {
            res.status(422).json({
                message: 'O nome é obrigatório!'
            })
            return
        }
        if (!email) {
            res.status(422).json({
                message: 'O E-mail é obrigatório!'
            })
            return
        }
        const userExists = await User.findOne({ email: email })


        //Check if email has  already taken
        if (user.email !== email && userExists) {
            res.status(422).json({
                message: 'O E-mail deve ser diferente'
            })
        }

        user.email = email





        if (password != confirmpassword) {
            res.status(422).json({ message: 'As senhas não conferem!' })
            return
        } else if (password === confirmpassword && password != null) {

            //Creating password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            //return  user update data
            const updateUser = await User.findOneAndUpdate({ _id: user.id }, { $set: user }, { new: true })
            res.status(200).json({
                message: 'Usuário atualizado com sucesso!'
            })

        } catch (err) {
            res.status(500).json({ message: err })
            return
        }



        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }

    }
}
