const ApiResponse = require('../utils/api-response')
const AttendantDb = require('../database/models/attendantDb');
const UserDb = require('../database/models/userDb');
const USER_ROLE = require('../constants/role-constant')
const UserIdGenerator = require('../utils/user-id-generator')
const OtpUtility = require('../utils/otp-utility')
const VisitorFormDb = require('../database/models/visitorFormDb')

/**
 * 
 * @param {any} attendant 
 * @param {any} user 
 * @returns 
 */
async function registerAttendant(attendant, user){
    console.log("Service received request ", attendant);
    //TODO: valiudate and proccess the request
    let attendantDbExist = await UserDb.findOne({mobileNo: attendant.mobileNo})
    if(attendantDbExist){
        return new ApiResponse(400, 'Attendant Is Already Registed With Provided Mobile No.', null, null)
    }
    const userDb = new UserDb({
        mobileNo: attendant.mobileNo,
        name: `${attendant.firstName} ${attendant.middleName} ${attendant.lastName}`,
        role: USER_ROLE.ATTENDANT,
        userId: UserIdGenerator.getNextUserId(),
        isActive: true,
        otpDetails: OtpUtility.generateOTP()        
    })
    attendant.attendantId = userDb.userId
    attendant.isOnDuty = true
    const attendantDb = new AttendantDb(attendant)
    
    try {
        await userDb.save()
        //await OtpUtility.sendOtp(userDb.mobileNo, userDb.otpDetails.code)
        result = await attendantDb.save()
        //convert result to API data          
        return new ApiResponse(201, 'Attendant Registed.', null, result)    
    } catch (error) {
        console.log("Error while registering attendant ",error.message)
        return new ApiResponse(500, 'Exception While Attendant Registration!.', null, error.message)
    }       
}
/**
 * 
 * @param {Number} page 
 * @param {Number} limit 
 * @param {any} user 
 */
async function getAttendantsList(page, limit, user){
    const pageOptions = {
        page: parseInt(page, 10) || 0,
        limit: parseInt(limit, 10) || 10
    }
    try {
        var recCount = await AttendantDb.countDocuments({'business.businessId': user.businessId})
        result = await AttendantDb.find({'business.businessId': user.businessId})
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Attendant List!.', null, err.message)
    }
    //TODO : update result for paggination link 
    let listData = {start: page, count: result.length, totalCount: recCount, totalPages: Math.ceil(recCount/limit), data: result} 
    return new ApiResponse(200, "Fetched Attendant list", null, listData)
}

async function updateAttendant(attendantId, payload, user){
    try {
        let attendant = await AttendantDb.findOne({attendantId:{$eq: attendantId}, 'business.businessId':{$eq: user.businessId}})
        if(!attendant)
            return new ApiResponse(400, 'Attendant not found for update.', null, null)
        payload.attendantId = attendantId
        delete payload._id

        await AttendantDb.findOneAndUpdate({_id:attendant._id}, payload)
        return new ApiResponse(200, "Attendant Updated Successfully.", null, payload)  
    } catch (error) {
        return new ApiResponse(500, 'Exception While updating Attendant !.', null, error)
    }
}

async function getAttendantById(attendantId, user){
    try {
        let attendant = await AttendantDb.findOne({attendantId:{$eq: attendantId}, 'business.businessId':{$eq: user.businessId}})
        if(!attendant)
            return new ApiResponse(400, 'Attendant not found.', null, null)
        
        return new ApiResponse(200, "Attendant fetched Successfully.", null, attendant)  
    } catch (error) {
        return new ApiResponse(500, 'Exception While updating Attendant !.', null, error)
    }
}

async function deleteAttendantById(attendantId, user){
    try {
        await AttendantDb.deleteOne({attendantId:{$eq: attendantId}, 'business.businessId':{$eq: user.businessId}})
        await UserDb.deleteOne({userId:{$eq: attendantId}})
        return new ApiResponse(200, "Attendant Deleted Successfully.", null, null)  
    } catch (error) {
        return new ApiResponse(500, 'Exception While Deleting Attendant !.', null, error)
    }
}

async function addFormData(attendantId, user, payload){
    try {
        // let validationResult = await validateVisitorsFormData(user, payload)
        // if(validationResult.resultCode != 200){
        //     return new ApiResponse(validationResult.resultCode, validationResult.message, null, null)
        // }
        if(payload.formId){
            let visitorFormDb = await VisitorFormDb.findOne({attendantId:{$eq: payload.attendantId}, formId:{$eq: payload.formId}})
            if(visitorFormDb){
                visitorFormDb.formDataJson = payload.formDataJson
                await visitorFormDb.save();
                return new ApiResponse(200, 'Form updated successfully.', null, visitorFormDb)
            }else
                return new ApiResponse(400, 'Form not found for update.', null, null)
        }else{
            payload.formId = UserIdGenerator.getNextUserId()
            const visitorFormDb = new VisitorFormDb(payload)
            await visitorFormDb.save();
            return new ApiResponse(200, 'Form saved successfully.', null, visitorFormDb)
        }
    } catch (error) {
        return new ApiResponse(500, 'Exception While add/update form data!.', null, error)
    }
}
 async function getFormDataById(attendantId, formId, user){
    try {        
            let visitorFormDb = await VisitorFormDb.findOne({attendantId:{$eq: attendantId}, formId:{$eq: formId}})
            if(visitorFormDb){
                return new ApiResponse(200, 'Form updated successfully.', null, visitorFormDb)
            }else
                return new ApiResponse(400, 'Form not found.', null, null)
        
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching form data!.', null, error)
    }
 }

 async function getFormDtaListByAttendant(fromDate, toDate,page, limit, user) {
    try {
         let filter = [{businessId:{ $eq:user.businessId}}]
        // if(fromDate && toDate){      
        //     // if(!fromDate.includes('+'))
        //     //     fromDate = fromDate.slice(0, fromDate.indexOf('GMT')+3)+'+'+fromDate.slice(fromDate.indexOf('GMT')+3).trim()
        //     // if(!toDate.includes('+'))
        //     //     toDate = toDate.slice(0, toDate.indexOf('GMT')+3)+'+'+toDate.slice(toDate.indexOf('GMT')+3).trim()          
        //     filter.push({createdAt: {
        //         $gte: new Date(fromDate).toUTCString(), 
        //         $lt: new Date(toDate).toUTCString()
        //     }})
        // }
        const pageOptions = {
            page: parseInt(page, 10) || 0,
            limit: parseInt(limit, 10) || 10
        }
        try {
            var recCount = await VisitorFormDb.countDocuments({businessId: {$eq:user.businessId}})
            result = await VisitorFormDb.find({ $and: filter })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            
        } catch (error) {
            return new ApiResponse(500, 'Exception While Fetching FormData List!.', null, err.message)
        }
        let listData = {start: page, count: result.length, totalCount: recCount, totalPages: Math.ceil(recCount/limit), data: result} 
        return new ApiResponse(200, "Fetched FormData list", null, listData)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching form data list!.', null, error)
    }
 }

// async function validateVisitorsFormData(user, payload, attendantId){
    

// }

async function deleteFormDataById(attendantId, formId ,user){
    try {
        console.log("Attendant deleting form data", attendantId, formId)
        await VisitorFormDb.deleteOne({attendantId:{$eq: attendantId}, formId:{$eq: formId}})
        return new ApiResponse(200, "Form Data Deleted Successfully.", null, null)  
    } catch (error) {
        return new ApiResponse(500, 'Exception While Deleting Form Data !.', null, error)
    }
}

module.exports={
    registerAttendant, getAttendantsList, updateAttendant, 
    getAttendantById, deleteAttendantById, addFormData, getFormDataById, getFormDtaListByAttendant,
    deleteFormDataById
}
