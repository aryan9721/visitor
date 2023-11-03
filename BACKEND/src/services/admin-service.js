const ApiResponse = require('../utils/api-response')
const UserDb = require('../database/models/userDb');
const USER_ROLE = require('../constants/role-constant')
const UserIdGenerator = require('../utils/user-id-generator')
const OtpUtility = require('../utils/otp-utility')

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



module.exports={registerAdmin, updateAdmin, approveBusiness}