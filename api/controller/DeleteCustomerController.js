const userSchema = require('../DB/Schema');
const log = require('../../logConfig/winston');
const  mongoose  = require('mongoose');
const DeleteCustomerController = async (req, res, next) => {
    try {
        log.info(`--------------------Inside Delete Customer Controller----------------------`);
        const { id } = req.params;
        // get all from DB;
        if(!mongoose.Types.ObjectId.isValid(id)){
            log.info(`id is invalid: ${id}`);
            return res.status(404).json({
                message: 'failure',
                description: `no customer exist with this id`,
            });
        }
        const deleteOne = await userSchema.findByIdAndDelete({_id: id})
        if(!deleteOne){
            const error = new Error();
            console.log(error)
            error.message = `no customer exist !!!`
            log.info(`no customer exist !!!`);
            return next(error)
        }
        // return success response
        log.info(`customer's deleted successfully`);
        return res.status(200).json({
            message: 'success',
            description: `customer's deleted successfully`,
            ResponseDescription: deleteOne
        })
    } catch (err) {
        const error = new Error();
        error.message = err.message
        log.info(`Failure:  ${JSON.stringify(error.message)}`);
        return next(err)
    }
}

module.exports = {
    DeleteCustomerController
}