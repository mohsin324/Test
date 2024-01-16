const RequestSchema = require('../helper/AddCustomerRequest');
const userSchema = require('../DB/Schema');
const log = require('../../logConfig/winston');
const AddCustomerController = async (req, res, next) => {
    try {
        log.info(`--------------------Inside Add Customer Controller----------------------`);
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
        // create in DB
        console.log('im here')
        const createUser = await userSchema.create(info)
        console.log(createUser, ' outside ')
        if(!createUser){
            const error = new Error();
            error.message = `customer does not created!!!`
            log.info(`customer does not created!!!`);
            return next(error)
        }
        // return success response
        log.info(`customer created successfully:  ${JSON.stringify(createUser)}`);
        return res.status(200).json({
            message: 'success',
            description: `customer added successfully`,
            ResponseDescription: createUser
        })
    } catch (err) {
        const error = new Error();
        error.message = err.message
        log.info(`Failure:  ${JSON.stringify(error.message)}`);
        return next(err)
    }
}
module.exports = {
    AddCustomerController
}