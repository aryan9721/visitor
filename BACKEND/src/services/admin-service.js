const ApiResponse = require('../utils/api-response')
const UserDb = require('../database/models/userDb');
const USER_ROLE = require('../constants/role-constant')
const UserIdGenerator = require('../utils/user-id-generator')
const OtpUtility = require('../utils/otp-utility')
const VisitorFormDb = require('../database/models/visitorFormDb')

async function registerAdmin(payload, user){
    try {
        
        return new ApiResponse(200, "Admin Registered Successfully.", null, null)  
    } catch (error) {
        return new ApiResponse(500, 'Exception Registering Admin!.', null, error)
    }
}

async function updateAdmin( userId, payload, user){
    try {
        
        return new ApiResponse(200, "Admin Updated Successfully.", null, null)  
    } catch (error) {
        return new ApiResponse(500, 'Exception Updating Admin!.', null, error)
    }
}

async function approveBusiness( userId, status,user){
    try {
        let userDb = await UserDb.findOne({userId: userId})
        if(userDb){
            userDb.isActive = status==='ACTIVE' ? true:status==='INACTIVE' ? false:userDb.isActive
            await userDb.save()
            return new ApiResponse(200, "User changed to '"+status+"' status Successfully.", null, null) 
        }else return new ApiResponse(400, "Invalid user!", null, null)  
    } catch (error) {
        return new ApiResponse(500, 'Exception Updating Admin!.', null, error)
    }
}

async function getFormCount( businessId, fromDate, toDate, user){
    try {

        let filter = [{businessId:{ $eq:businessId?businessId:user.businessId}}]
        if(fromDate && toDate){      
            if(!fromDate.includes('+'))
                fromDate = fromDate.slice(0, fromDate.indexOf('GMT')+3)+'+'+fromDate.slice(fromDate.indexOf('GMT')+3).trim()
            if(!toDate.includes('+'))
                toDate = toDate.slice(0, toDate.indexOf('GMT')+3)+'+'+toDate.slice(toDate.indexOf('GMT')+3).trim()          
            filter.push({createdAt: {
                $gte: new Date(fromDate).toUTCString(), 
                $lt: new Date(toDate).toUTCString()
            }})
        } 

        let forms = await VisitorFormDb.find({ $and: filter })
        if(forms){   
            let formStats = {formCount: forms.length}         
            return new ApiResponse(200, "Success", null, formStats) 
        }else return new ApiResponse(400, "Invalid business id!", null, null)  
    } catch (error) {
        return new ApiResponse(500, 'Exception Updating Admin!.', null, error)
    }
}


module.exports={registerAdmin, updateAdmin, approveBusiness, getFormCount}