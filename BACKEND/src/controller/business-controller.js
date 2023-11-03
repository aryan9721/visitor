const Error = require('../utils/api-response')
const BusinessService = require('../services/business-service')


function createBusiness(req, res, next){
    console.log("Controller received request for business registration ", req.body);
    BusinessService.registerBusiness(req.body)
        .then(result=>{
            console.log("Register Attendant Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}



function getBusinessList(req, res, next){
    BusinessService.getBusinessList(req.query.page, req.query.limit)
        .then(result=>{
            console.log("Get list of business Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })

}

function updateBusiness(req, res, next){
    BusinessService.updateBusiness(req.params.businessId, req.body,req.user)
        .then(result=>{
            console.log("Update business Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function getBusinessById(req, res, next){
    BusinessService.getBusinessById(req.params.businessId, req.user)
        .then(result=>{
            console.log("Get business by id Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function creatForm(req, res, next){
    BusinessService.putform(req.body, req.user)
        .then(result=>{
            console.log("Add/update form Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}


function getFormByBusinessId(req, res, next){
    BusinessService.getFormByBusinessId(req.params.businessId, req.user)
    .then(result=>{
        console.log("Get business form by Id Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function deleteFormByBusinessId(req, res, next){
    BusinessService.deleteFormByBusinessId(req.params.businessId, req.user)
    .then(result=>{
        console.log("Detele business form by Id Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}



module.exports = {
    createBusiness,getBusinessList, 
    updateBusiness, getBusinessById, creatForm, 
    getFormByBusinessId,
    deleteFormByBusinessId
}