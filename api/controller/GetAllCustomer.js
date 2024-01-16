const userSchema = require('../DB/Schema');
const log = require('../../logConfig/winston');
const GetAllCustomerController = async (req, res, next) => {
    try {
        log.info(`--------------------Inside Get All Customer Controller----------------------`);
        // get all from DB
        const findAll = await userSchema.find()
        if(!findAll){
            const error = new Error();
            error.message = `DB is null !!!`
            log.info(`DB is null !!!`);
            return next(error)
        }
        // return success response
        log.info(`customer's found successfully`);
        return res.status(200).json({
            message: 'success',
            description: `customer's found successfully`,
            ResponseDescription: findAll
        })
    } catch (err) {
        const error = new Error();
        error.message = err.message
        log.info(`Failure:  ${JSON.stringify(error.message)}`);
        return next(err)
    }
}
module.exports = {
    GetAllCustomerController
}