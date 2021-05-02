const {adminValidation} = require('../validator')


const verifyEmailAdmin = async (req, res, next) => {
    const errors = await adminValidation.isValidEmailAdmin(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const verifyLoginAdmin = async (req, res, next) => {
    const errors = await adminValidation.isLoginAdmin(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const verifyRegisterAdmin = async (req, res, next) => {
    const errors = await adminValidation.isRegisterAdmin(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const updatePasswordAdmin = async (req, res, next) => {
    const errors = await adminValidation.isResetPasswordAdmin(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const checkNewCategory = async (req, res, next) => {
    const errors = adminValidation.checkNewCategory(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}



module.exports={
    verifyEmailAdmin,
    verifyLoginAdmin,
    verifyRegisterAdmin,
    updatePasswordAdmin,
    checkNewCategory
}