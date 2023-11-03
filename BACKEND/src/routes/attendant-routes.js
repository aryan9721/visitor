const express = require('express');

const route = express.Router()

const attendantController = require('../controller/attendant-controller')
const RouteSecurity = require('../services/route-security-service')

//register attendant
route.post('/', RouteSecurity.autherizeRouteForBusinessUser, attendantController.registerAttendant)

//get list of attendants
route.get('/', RouteSecurity.autherizeRouteForBusinessUser, attendantController.getAttendantsList)

//update attendant
route.put('/:attendantId', RouteSecurity.autherizeRouteForBusinessUser, attendantController.updateAttendant)

//get attendant by Id
route.get('/:attendantId', RouteSecurity.autherizeRouteForAttendant, attendantController.getAttendantById)

//delete attendant by Id
route.delete('/:attendantId', RouteSecurity.autherizeRouteForBusinessUser, attendantController.deleteAttendantById)

//Add/update form data
route.put('/formData/:attendantId', RouteSecurity.autherizeRouteForAttendant, attendantController.addFormData)

//Get form data by Id
route.get('/formData/:attendantId/:formId', RouteSecurity.autherizeRouteForAttendant, attendantController.getFormDataById)

//get all forms by Attendant Id
route.get('/forms/list', RouteSecurity.autherizeRouteForAttendant, attendantController.getFormsByAttendant)

//Delete form data by Id
route.delete('/formData/:attendantId/:formId', RouteSecurity.autherizeRouteForAttendant, attendantController.deleteFormDataById)

module.exports = route