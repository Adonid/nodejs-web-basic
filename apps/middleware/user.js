const {userValidation} = require('../validator')
const {notices} = require('../common')
const {User} = require('../models')
const roleId = 3

/** XAC MINH FORM REGISTER */
const verifyUserRegister = async (req, res, next) => {
    const {email} = req.body
    // Validate form data
    const errors = await userValidation.checkFormRegister(req)
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
const verifyEmailUser = async (req, res, next) => {
    const {email} = req.body
    // Validate Email
    const errors = await userValidation.checkFormatEmail(email)
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


module.exports={
    verifyUserRegister,
    verifyEmailUser,
}