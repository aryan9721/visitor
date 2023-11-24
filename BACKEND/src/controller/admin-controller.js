const ApiResponse = require('../utils/api-response')
const AdminService = require('../services/admin-service')


function registerAdmin(req, res, next){
    console.log("Controller received request ", req.body);
    AdminService.registerAdmin(req.body, req.user)
        .then(result=>{
            console.log("Register Admin Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function updateAdmin(req, res, next){
    console.log("Controller received request ", req.body);
    AdminService.updateAdmin(req.params.userId, req.body, req.user)
        .then(result=>{
            console.log("Register Admin Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function getAdminByUserId(req, res, next){
    console.log("Controller received request ", req.body);
    AdminService.getAdminByUserId(req.params.userId, req.user)
        .then(result=>{
            console.log("Register Admin Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

function deleteAdminByUserId(req, res, next){
    console.log("Controller received request ", req.body);
    AdminService.deleteAdminByUserId(req.params.userId, req.user)
        .then(result=>{
            console.log("Register Admin Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}
function approveBusiness(req, res, next){
    AdminService.approveBusiness(req.params.userId,req.params.status, req.user)
        .then(result=>{
            console.log("Approve Business Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}


function getFormCount(req, res, next){
    AdminService.getFormCount(req.params.businesssId, req.user)
        .then(result=>{
            console.log("get form count Conroller Result : ",result)
            res.status(result.statusCode)
            res.send(result)
        })
}

module.exports = {
    registerAdmin, updateAdmin, approveBusiness, getFormCount
}