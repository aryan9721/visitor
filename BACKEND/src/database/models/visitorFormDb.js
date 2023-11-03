const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitorFormDBSchema = new Schema({
    businessId : {type:String, required: true},
    formId : {type:String, required: true},
    userId : {type:String, required: false},
    attendantName : {type:String, required: true},
    attendantId : {type:String, required: true},
    formDataJson : {type:String, required: true},

},{timestamps: true})

const visitorForm = mongoose.model('visitor-form', visitorFormDBSchema)

module.exports = visitorForm;