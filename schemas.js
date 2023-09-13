const Joi = require('joi');

module.exports = {
    teamValidation: (body) => {
        const schema = Joi.object({
            teamname: Joi.string().required(),
            teamnumber: Joi.number().required().max(60),
            Leadername: Joi.string().required(),
            LeaderEmail: Joi.string().required()
            // teamID: Joi.string().required(),
        }).required()
        return schema.validate(body);
    }

};