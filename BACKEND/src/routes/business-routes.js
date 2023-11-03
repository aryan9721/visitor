const express = require('express');

const route = express.Router()
const RouteSecurity = require('../services/route-security-service')

const businessController = require('../controller/business-controller')

//register business
route.post('/',  businessController.createBusiness)

//Get list of businesses
route.get('/', RouteSecurity.autherizeRouteForAdminUser, businessController.getBusinessList)

//Create/update form
route.put('/form', RouteSecurity.autherizeRouteForBusinessUser, businessController.creatForm)

//update business
route.put('/:businessId', RouteSecurity.autherizeRouteForBusinessUser, businessController.updateBusiness)

//Get business by id
route.get('/:businessId', RouteSecurity.autherizeRouteForAttendant, businessController.getBusinessById)

//Get form
route.get('/form/:businessId', RouteSecurity.autherizeRouteForAttendant, businessController.getFormByBusinessId)

//Delete form
route.delete('/form/:businessId', RouteSecurity.autherizeRouteForBusinessUser, businessController.deleteFormByBusinessId)

module.exports = route