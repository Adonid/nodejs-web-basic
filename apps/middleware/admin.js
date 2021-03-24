const {General} = require('../validator')

/**
 * 
 * @param {]} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
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

module.exports={
    login,
    register
}