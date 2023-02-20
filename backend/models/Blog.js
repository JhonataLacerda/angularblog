const mongoose = require('../db/conn')
const {Schema} = mongoose

const Blog = mongoose.model('Blog',
      new Schema({
        titulo:{
            type:String,
        },
        texto:{
            type:String,
        },
        images:{
            type:Array
        },
        user: Object,
        
      },
      {
        timestamps:true
      }
      )

)

module.exports = Blog