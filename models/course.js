
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    price:Number,
    image:{
        url:String,
        filename : String,
    },
    tag:String,
    mentor:String
})

const courselisting = mongoose.model('listing',courseSchema)
module.exports = courselisting