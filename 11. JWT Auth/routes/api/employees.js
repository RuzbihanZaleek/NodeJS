const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController.js');

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

// getting a poram in the url
router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;
