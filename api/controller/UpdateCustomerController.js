const RequestSchema = require('../helper/UpdateCustomerRequest');
const userSchema = require('../DB/Schema');
const log = require('../../logConfig/winston');
const mongoose = require('mongoose');
const UpdateCustomerController = async (req, res, next) => {
    try {
        log.info(`--------------------Inside Update Customer;s Credentials Controller----------------------`);
        const { id } = req.params;
        // destructure data from req body
        const { name, CustomerName, email } = req.body;
        // getting file name
        const ProfilePicture = req.file?.originalname;
        log.info(`User Request Body: ${JSON.stringify(req.body)} Profile Picture: ${ProfilePicture}`);
        // validate user request
        const validateRequest = RequestSchema.validate({
            name,
            CustomerName,
            email,
            ProfilePicture
        });
        // creating error incase request body invalid
        if (validateRequest.error) {
            const error = new Error();
            error.message = validateRequest.error.details
            log.info(`Request Validation Failed: ${JSON.stringify(error.message)}`);
            return next(error)
        }
        // creating object for create in DB
        let info = {
            name,
            CustomerName,
            ProfilePicture: req.file?.path,
            email
        }
        // check id is valid or not
        if(!mongoose.Types.ObjectId.isValid(id)){
            log.info(`id is invalid: ${id}`);
            return res.status(404).json({
                message: 'failure',
                description: `no customer exist with this id`,
            });
        }
        // create in DB
        const updateCustomer = await userSchema.findOneAndUpdate({_id: id},{...info})
        if(!updateCustomer){
            const error = new Error();
            error.message = `customer does not created!!!`
            log.info(`customer does not created!!!`);
            return next(error)
        }
        // return success response
        log.info(`customer credentials updated successfully:  ${JSON.stringify(updateCustomer)}`);
        return res.status(200).json({
            message: 'success',
            description: `customer credentials updated successfully`,
            ResponseDescription: updateCustomer
        })
    } catch (err) {
        const error = new Error();
        error.message = err.message
        log.info(`Failure:  ${JSON.stringify(error.message)}`);
        return next(err)
    }
}
module.exports = {
    UpdateCustomerController
}