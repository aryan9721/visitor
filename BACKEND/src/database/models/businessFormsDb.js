const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessFormDBSchema = new Schema({
    businessId : {type:String, required: true},
    businessName : {type:String, required: true},
    formDescription : {type:String, required: true},    
    formJson : {type:String, required: true}
},{timestamps: true})

const businessForm = mongoose.model('business-form', businessFormDBSchema)

module.exports = businessForm;