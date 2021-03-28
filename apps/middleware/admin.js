const {General} = require('../validator')

/**
 * 
 * @param {]} req 
 * @param {*} res 
 * @param {*} next 
 * @returns next('route') | next()
 */

const login = async (req, res, next) => {
    const errors = await General.login(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const register = async (req, res, next) => {
    const errors = await General.register(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const verifyEmail = async (req, res, next) => {
    const errors = await General.isValidEmail(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const updatePassword = async (req, res, next) => {
    const errors = await General.isResetPassword(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

module.exports={
    login,
    register,
    verifyEmail,
    updatePassword
}