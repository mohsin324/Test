const router = require('express').Router();
const { AddCustomerController} = require('../controller/AddCustomerController');
// controllers
const { GetAllCustomerController } = require('../controller/GetAllCustomer');
const { DeleteCustomerController} = require('../controller/DeleteCustomerController');
const { UpdateCustomerController} = require('../controller/UpdateCustomerController');
const { GetSingleCustomerController} = require('../controller/GetSingleCustomerController');

// file uploader
const { upload } = require('../Utils/FileUploader');

// routes
router.route('/getall-customer').get(GetAllCustomerController);
router.route('/add-customer').post(upload,AddCustomerController);
router.route('/delete-customer/:id').delete(DeleteCustomerController);
router.route('/update-customer/:id').put(upload,UpdateCustomerController);
router.route('/getsingle-customer/:id').get(GetSingleCustomerController);



module.exports = router