const AttendantService = require('../services/attendant-service')
const ApiResponse = require('../utils/api-response')

function registerAttendant(req, res, next){
    console.log("Controller received request ", req.body);
    AttendantService.registerAttendant(req.body, req.user)
        .then(result=>{
            console.log("Register Attendant Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function loginAttendant(req, res, next){
    console.log(req.body)
    res.send();
}

function getAttendantsList(req, res, next){
    AttendantService.getAttendantsList(req.query.page, req.query.limit, req.user)
        .then(result=>{
            console.log("Get list of attendant Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })

}

function updateAttendant(req, res, next){
    AttendantService.updateAttendant(req.params.attendantId,req.body, req.user)
        .then(result=>{
            console.log("Update Attendant Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function getAttendantById(req, res, next){
    AttendantService.getAttendantById(req.params.attendantId, req.user)
    .then(result=>{
        console.log("Get Attendant by Id Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function deleteAttendantById(req, res, next){
    AttendantService.deleteAttendantById(req.params.attendantId, req.user)
    .then(result=>{
        console.log("Delete Attendant Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function addFormData(req, res, next){
    AttendantService.addFormData(req.params.attendantId, req.user, req.body)
    .then(result=>{
        console.log("Add/update visitors form data Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function getFormDataById(req, res, next){
    AttendantService.getFormDataById(req.params.attendantId,req.params.formId, req.user)
    .then(result=>{
        console.log("Get visitors form data Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function getFormsByAttendant(req, res, next){
    AttendantService.getFormDtaListByAttendant(req.query.fromDate, req.query.toDate,req.query.page, req.query.limit, req.user)
    .then(result=>{
        console.log("Get formData list Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function deleteFormDataById(req, res, next){
    AttendantService.deleteFormDataById(req.params.attendantId, req.params.formId,req.user)
    .then(result=>{
        console.log("Delete Form data Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}



module.exports = {
    registerAttendant, loginAttendant, getAttendantsList, updateAttendant, getAttendantById, 
    deleteAttendantById, addFormData, getFormDataById, getFormsByAttendant, deleteFormDataById
}