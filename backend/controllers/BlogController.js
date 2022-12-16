const { json } = require('express')
const { get } = require('mongoose')
const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')
const Blog = require('../models/Blog')
const { updateMany, update } = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class BlogController {

    //Criação de um post

    static async create(req, res) {
        const { titulo, texto } = req.body
        const images = req.files

        if (!titulo) {
            res.status(422).json({
                message: "O título é obrigatório!"
            })
            return
        }
        if (!texto) {
            res.status(422).json({
                message: "O texto é obrigatório!"
            })

            return
        }

        //Receber um  usuário para o post
        const token = getToken(req)
        const user = await getUserByToken(token)


        //Criação de um post

        const blog = new Blog({
            titulo,
            texto,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
            },
        })

    
        images.map((image) => {
            blog.images.push(image.filename)
        })
        try {
            const newPost = await blog.save()
            res.status(200).json({ 
                message: 'Post cadastrado com sucesso!' ,
                newPost,})
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }

    }

    static async getAll(req, res){
        const blog = await Blog.find().sort('-createdAt')
        res.status(200).json({
            blog:blog
        })
    }
    static async getAllUserPosts(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const blog = await Blog.find({ 'user._id': user._id }).sort('-createdAt')
        res.status(200).json({
            blog: blog
        })


    }

    static async getPostById(req, res) {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            res.status(422).json({
                message: "ID INVÁLIDO!"
            })
            return
        }

        const blog = await Blog.findOne({ _id: id })

        if (!blog) {
            res.status(404).json({
                message: "Post não encontrado!"
            })

            
        }
        res.status(200).json({
            blog: blog
        })
    }

    static async removeBlogById(req, res) {
        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            res.status(422).json({
                message: "ID INVÁLIDO!"
            })
            return
        }

        const blog = await Blog.findOne({ _id: id })
        if (!blog) {
            res.status(404).json({
                message: "O post não foi encontrado!"
            })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (blog.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                message: "Houve um problema na solicitação, tente mais tarde!"
            })
            return
        }

        await Blog.findByIdAndRemove(id)

        res.status(200).json({
            message: "O Post foi removido com sucesso!"
        })


    }

    static async updatePost(req, res) {
        const id = req.params.id
        const { titulo, texto } = req.body
        const images = req.files
        const updatedData = {}

        if(!ObjectId.isValid(id)) {
            res.status(422).json({
                message: "ID INVÁLIDO!"
            })
            return
        }

        const blog = await Blog.findOne({ _id: id })
        if (!blog) {
            res.status(404).json({
                message: "O post não foi encontrado!"
            })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (blog.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                message: "Houve um problema na solicitação, tente mais tarde!"
            })
            return
        }


        if (!titulo) {
            res.status(422).json({
                message: "O campo titulo é obrigatório!"
            })
            return
        } else {
            updatedData.titulo = titulo
        }
        if (!texto) {
            res.status(422).json({
                message: "O campo texto é obrigatório!"
            })
            return
        } else {
            updatedData.texto = texto
        }

        if (images.length === 0) {
            res.status(422).json({
                message: "A imagem é obrigatória!"
            })

            return

        } else {
            updatedData.images = []
            images.map((images) => {
                updatedData.images.push(images.filename)
            })
        }

        await Blog.findByIdAndUpdate(id, updatedData)

        res.status(200).json({
            message: "O post foi atualizado com sucesso!"
        })

    }
}