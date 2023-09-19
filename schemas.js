const Joi = require('joi');

module.exports = {
    teamValidation: (body) => {
        const schema = Joi.object({
            teamName: Joi.string().required(),
            teamNumber: Joi.number().required().max(60),
            leaderName: Joi.string().required(),
            leaderEmail: Joi.string().required()
            // teamID: Joi.string().required(),
        }).required()
        return schema.validate(body);
    }
};