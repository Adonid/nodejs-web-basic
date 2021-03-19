const {checkSchema } = require('express-validator')

/**
 * 
 * SCHEMA matchs
 * 
 */

const schemaLogin = {
    email: {
        isEmail: {
            errorMessage: 'Password should be at least 7 chars long',
            bail: true,
        },
    },
}


/**
 * 
 * Methods xac thuc Authenticate & Authorizator
 * 
 */
 const adminLogin = (req, res, next) => {
    checkSchema(schemaLogin)
}

module.exports={
    adminLogin
}