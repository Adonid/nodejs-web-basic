const {generalValidation} = require('../validator')

/**
 * 
 * @param {]} req 
 * @param {*} res 
 * @param {*} next 
 * @returns next('route') | next()
 */

const login = async (req, res, next) => {
    const errors = await generalValidation.login(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const register = async (req, res, next) => {
    const errors = await generalValidation.register(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const updatePassword = async (req, res, next) => {
    const errors = await generalValidation.isResetPassword(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

module.exports={
    login,
    register,
    updatePassword
}