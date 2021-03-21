const {adminValidator} = require('../validator')

/**
 * 
 * @param {]} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const login = (req, res, next) => {
    const errors = adminValidator.login(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const register = (req, res, next) => {
    const errors = adminValidator.register(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

module.exports={
    login,
    register
}