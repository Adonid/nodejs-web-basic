const {userValidation} = require('../validator')
const {notices} = require('../common')
const {User} = require('../models')
const roleId = 3

/** XAC MINH FORM REGISTER */
const verifyUserRegister = async (req, res, next) => {
    const {email} = req.body
    // Validate form data
    const errors = userValidation.checkFormRegister(req)
    if(errors){
        const msg = notices.errorField('any', errors)
        res.status(msg.code).send(msg)
        return next('route')
    }
    // Su duy nhat cua email
    const emailValid = await User.existsUser({email})
    if(emailValid){
        const msg = notices.fieldNotDuplicate('email', 'Email')
        res.status(msg.code).send(msg)
        return next('route')
    }
    return next()
}

/** XAC MINH EMAIL TO RESET PASSWORD */
const verifyEmailForgetPassword = async (req, res, next) => {
    const {email} = req.body
    // Validate Email
    const errors = userValidation.checkFormatEmail(email)
    if(errors){
        const msg = notices.errorField('email', errors)
        res.status(msg.code).send(msg)
        return next('route')
    }
    // Email cua USER nay phai TON TAI
    const emailValid = await User.existsUser({email, roleId})
    if(!emailValid){
        const msg = notices.notValidEmail
        res.status(msg.code).send(msg)
        return next('route')
    }
    return next()
}

/** XAC MINH FORM RESET PASSWORD */
const verifyFormResetPassword = async (req, res, next) => {
    const {email, password, codeReset} = req.body
    // Validate form data
    const errors = userValidation.checkFormResetPassword(email, password, codeReset)
    if(errors){
        const msg = notices.errorField('any', errors)
        res.status(msg.code).send(msg)
        return next('route')
    }
    // SU TON TAI CUA TAI KHOAN VA CODERESET
    const userValid = await User.existsUser({email, codeReset, roleId})
    if(!userValid){
        const msg = notices.errorField('any', "Uhm! Email hoặc mã xác minh không đúng")
        res.status(msg.code).send(msg)
        return next('route')
    }
    return next()
}


module.exports={
    verifyUserRegister,
    verifyFormResetPassword,
    verifyEmailForgetPassword
}