const express = require('express');

const route = express.Router()
const RouteSecurity = require('../services/route-security-service')
const AdminController = require('../controller/admin-controller')

//register Admin
route.post('/', RouteSecurity.autherizeRouteForSupperAdmin, AdminController.registerAdmin)

//Active/Deactivate Business user
route.put('/approve/:userId/:status', RouteSecurity.autherizeRouteForAdminUser, AdminController.approveBusiness)

//update Admin
route.put('/:userId', RouteSecurity.autherizeRouteForAdminUser, AdminController.updateAdmin)

// //get Admin by user id
// route.get('/:userId', RouteSecurity.autherizeRouteForAdminUser, AdminController.getAdminByUserId)

// //delete Admin by user id
// route.delete('/:userId', RouteSecurity.autherizeRouteForSupperAdmin, AdminController.deleteAdminByUserId)

// //get Admin by email id
// route.get('/:emailId', RouteSecurity.autherizeRouteForAdminUser, AdminController.getAdminByEmailId)


module.exports = route