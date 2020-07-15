let validators = {},
    { check, body, buildCheckFunction, query } = require('express-validator'),
    commonRequestValidator = require('./commonRequestValidator');

validators = {
    get: {
        '/': [
            query('email').exists(),
            query('password').exists(),
        ]
    },

    post: {
        '/': [
            query('email').exists(),
            query('password').exists(),
        ]
    },

};

module.exports = validators;
