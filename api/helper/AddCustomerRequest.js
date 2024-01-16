const Joi = require('joi');
const schema = Joi.object({
    name: Joi.string().required(),
    CustomerName: Joi.string().required(),
    email: Joi.string().required(),
    ProfilePicture: Joi.string().required(),
});

module.exports = schema;