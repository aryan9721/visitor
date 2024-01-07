const ApiResponse = require('../utils/api-response')
const UserDb = require('../database/models/userDb');
const USER_ROLE = require('../constants/role-constant')
const UserIdGenerator = require('../utils/user-id-generator')
const OtpUtility = require('../utils/otp-utility');
const BusinessDb = require('../database/models/businessDb');
const BusinessFormsDB = require('../database/models/businessFormsDb')

/**
 * 
 * @param {any} business 
 * @param {any} user 
 * @returns 
 */
async function registerBusiness(business, user){
    console.log("Service received request for business registration ", business);
    //TODO: evaluate and process the request
    let businessDbExist = await UserDb.findOne({mobileNo: business.businessContactNo})
    if(businessDbExist){
        return new ApiResponse(400, 'Business Is Already Registered With Provided Business Contact No.', null, null)
    }
    const userDb = new UserDb({
        mobileNo: business.businessContactNo ,
        name: business.businessName,
        role: USER_ROLE.BUSINESS_OWNER,
        userId: UserIdGenerator.getNextBusinessId(),
        isActive: false,
        otpDetails: OtpUtility.generateOTP()
    })
    business.businessId = userDb.userId
    const businessDb = new BusinessDb(business)
    try {
        await userDb.save()
        //await OtpUtility.sendOtp(userDb.mobileNo, userDb.otpDetails.code)
        result = await businessDb.save()
        //convert result to API data          
        return new ApiResponse(201, 'Business Registered.', null, result)    
    } catch (error) {
        console.log("Error ",error.message)
        return new ApiResponse(500, 'Exception While Attendant Registration!.', null, error.message)
    }       
}
/**
 * 
 * @param {Number} page 
 * @param {Number} limit 
 * @param {any} user 
 */
async function getBusinessList(page, limit, user){
    
    const pageOptions = {
        page: parseInt(page, 10) || 0,
        limit: parseInt(limit, 10) || 10
    }
    try {
        var recCount = await BusinessDb.count()
        result = await BusinessDb.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)

        
    } catch (error) {
        return new ApiResponse(500, 'Exception While Fetching Business List!.', null, error.message)
    }
    //TODO : update result for paggination link
    let listData = {start: page, count: result.length, totalCount: recCount, totalPages: Math.ceil(recCount/limit), data: result}   
    return new ApiResponse(200, "Fetched Business list", null, listData)
}

async function getBusinessById(businessId, user){
    try {
        let businessDb = await BusinessDb.findOne({businessId: businessId})
        if(businessDb){
            return new ApiResponse(200, "Business Fetched Successfully.", null, businessDb)
        }else return new ApiResponse(400, 'Invalid Business Id!.', null, null)
    }catch(error){
        return new ApiResponse(500, 'Exception While Fetching Business!.', null, error.message)
    }
}

async function updateBusiness(businessId, payload, user){
    try {
        let businessDb = await BusinessDb.findOne({businessId: businessId})
        if(businessDb){
            delete payload._id
            payload.businessId = businessId
            businessDb = await BusinessDb.findByIdAndUpdate({_id: businessDb._id},payload, {new: true})
            return new ApiResponse(200, "Business Updated Successfully.", null, businessDb)
        }else return new ApiResponse(400, 'Invalid Business Id!.', null, null)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Updating Business!.', null, error.message)
    }
}
async function putform(payload, user){
    try {
        let businessDb = await BusinessDb.findOne({businessId: payload.businessId})
        if(businessDb){
            formDb = await BusinessFormsDB.findOne({businessId: payload.businessId})
            console.log(payload);
            if(formDb)
            {
                formDb.formJson = payload.formJson
                formDb.businessName = payload.businessName
                formDb.formDescription = payload.formDescription
            }
            else
                formDb = new BusinessFormsDB(payload)

            await formDb.save();    
            return new ApiResponse(200, "Form Saved Successfully.", null, formDb)
        }else return new ApiResponse(400, 'Invalid Business Id!.', null, null)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Updating Business!.', null, error.message)
    }

}

async function getFormByBusinessId(businessId, user){
    try {
        let businessDb = await BusinessDb.findOne({businessId: businessId})
        if(businessDb){
            formDb = await BusinessFormsDB.findOne({businessId: businessId})
            if(formDb)
                return new ApiResponse(200, "Form Fetched Successfully.", null, formDb)
            else
                return new ApiResponse(400, 'Form Not Found!', null, null)
            
        }else return new ApiResponse(400, 'Invalid Business Id!.', null, null)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Updating Business!.', null, error.message)
    }

}

async function deleteFormByBusinessId(businessId, user){
    try {
        let businessDb = await BusinessDb.findOne({businessId: businessId})
        if(businessDb){
            formDb = await BusinessFormsDB.findOne({businessId: businessId})
            if(formDb){
                await BusinessFormsDB.deleteOne({businessId:{$eq: businessId}})
                return new ApiResponse(200, "Form Removed Successfully.", null, formDb)
            }                
            else
                return new ApiResponse(400, 'Form Not Found!', null, null)
            
        }else return new ApiResponse(400, 'Invalid Business Id!', null, null)
    } catch (error) {
        return new ApiResponse(500, 'Exception While Updating Business!.', null, error.message)
    }

}

module.exports={
    registerBusiness, getBusinessList, getBusinessById, updateBusiness, putform, getFormByBusinessId, deleteFormByBusinessId
}