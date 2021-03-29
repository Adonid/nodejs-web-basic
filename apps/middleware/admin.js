const {adminValidation} = require('../validator')


const verifyEmailAdmin = async (req, res, next) => {
    const errors = await adminValidation.isValidEmailAdmin(req)
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

module.exports={
    verifyEmailAdmin,
    updatePasswordAdmin
}