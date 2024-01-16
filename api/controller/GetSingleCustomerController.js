const userSchema = require('../DB/Schema');
const log = require('../../logConfig/winston');
const  mongoose  = require('mongoose');
const GetSingleCustomerController = async (req, res, next) => {
    try {
        log.info(`--------------------Inside Get Single Customer Controller----------------------`);
        const { id } = req.params;
        // get all from DB;
        if(!mongoose.Types.ObjectId.isValid(id)){
            log.info(`id is invalid: ${id}`);
            return res.status(404).json({
                message: 'failure',
                description: `no customer exist with this id`,
            });
        }
        const getSingle = await userSchema.findById({_id: id})
        if(!getSingle){
            const error = new Error();
            console.log(error)
            error.message = `no customer exist !!!`
            log.info(`no customer exist !!!`);
            return next(error)
        }
        // return success response
        log.info(`customer's found successfully`);
        return res.status(200).json({
            message: 'success',
            description: `customer's found successfully`,
            ResponseDescription: getSingle
        })
    } catch (err) {
        const error = new Error();
        error.message = err.message
        log.info(`Failure:  ${JSON.stringify(error.message)}`);
        return next(err)
    }
}

module.exports = {
    GetSingleCustomerController
}