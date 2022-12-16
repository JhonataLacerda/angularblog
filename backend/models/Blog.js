const mongoose = require('../db/conn')
const {Schema} = mongoose

const Blog = mongoose.model('Blog',
      new Schema({
        titulo:{
            type:String,
            required:true
        },
        texto:{
            type:String,
            required:true
        },
        images:{
            type:Array,
            require:true
        },
        user: Object,
        
      },
      {
        timestamps:true
      }
      )

)

module.exports = Blog