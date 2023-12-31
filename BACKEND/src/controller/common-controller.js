const ApiResponse = require('../utils/api-response')
const CommonService = require('../services/common-service')
const JwtService = require('../services/jwt-service')
const ba64 = require("ba64")
var fs = require('fs');
function uploadAttendantPhoto(req, res, next){
    res.send()
}


function generateOtp(req, res, next){
    console.log("Request recive in controller to generate otp")
    CommonService.generateOtp(req.params.mobileNo)
    .then(result=>{
        console.log("OTP generated Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}


function userLogin(req, res, next){
    CommonService.userLogin(req.body)
    .then(result=>{
        console.log("User login Conroller Result : ",result)
        if(result.statusCode === 200){
            JwtService.generateJwt(result.data)
                .then(token=>{
                    res.setHeader('Access-Control-Expose-Headers','authtoken')
                    res.setHeader('authtoken', 'Bearer '+ token)
                    res.status(result.statusCode)
                    res.send(result)
                })
                .catch(err=>{
                    result = new ApiResponse(500, 'Error in generating access token!', null, null)
                    res.status(result.statusCode)
                    res.send(result)
                })
        }else{
            res.status(result.statusCode)
            res.send(result)
        }

        
    })

}
function getUserInfo(req, res, next){
    console.log("Request recive in controller to get User info")
    try {
        const jwt = (req.headers['Authorization'] || req.headers['authorization'])? (req.headers['Authorization'] || req.headers['authorization']).split(' ')[1] : null;
        if(!jwt){
            res.status(401)
            res.send(new ApiResponse(401, `No access token found in request!`, null, null))            
        }
        let userDetails = JwtService.decodeJWT(jwt);
        if(!userDetails){
            res.status(400)
            res.send(new ApiResponse(401, `Invalid access token found in request!`, null, null))
        }else{
            res.status(200)
            res.send(new ApiResponse(200, `User details fetched successfully.`, null, userDetails))
        }    
    } catch (error) {
        res.status(500)
        res.send(new ApiResponse(500, `Server error!`, error, null))
    }
        
}

function activateOrDeactivateUser(req, res, next){
    
    CommonService.activateOrDeactivateUser(req.params.userId, req.params.status)
    .then(result=>{
        console.log("Activate Or Deactivate user Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

function getUsersByRole(req, res, next){
    
    CommonService.getUsersByRole(req.params.role)
    .then(result=>{
        console.log("getUsersByRole Conroller Result : ",result)
        res.status(result.statusCode)
        res.send(result)
    })
}

module.exports={
    uploadAttendantPhoto, generateOtp, userLogin, 
    getUserInfo, 
    activateOrDeactivateUser, getUsersByRole
}

