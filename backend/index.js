const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors({credentials:true,origin:'http://localhost:4200'}))

app.use(express.static('public'))

const UserRoutes = require('./routes/UserRoutes')
const BlogRoutes = require('./routes/BlogRoutes')
app.use('/users',UserRoutes)
app.use('/blog',BlogRoutes)

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.listen(8080)
