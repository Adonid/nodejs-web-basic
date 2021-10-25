const {userValidation} = require('../validator')
const {notices, bcrypt} = require('../common')
const {User} = require('../models')
const { Op } = require("sequelize")
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

/** XAC MINH FORM LOGIN AS EMAIL & PASSWORD */
const verifyLoginUser = async (req, res, next) => {
    const {email, password} = req.body

    const errors = userValidation.checkFormLogin(email, password)
    if(errors){
        const msg = notices.errorField('any', "Uhm! Email hoặc mật khẩu không đúng.")
        res.status(msg.code).send(msg)
        return next('route')
    }
    /** CHECK IN DATABASE */
    const user = await User.getUserBasic({email, roleId})
                        .then(data => data)
                        .catch(err=>err)
    // Email cua USER nay phai TON TAI
    if(!user){
        const msg = notices.notValidEmail
        res.status(msg.code).send(msg)
        return next('route')
    }
    // Mat khau phai trung khop
    const compare = bcrypt.comparePassword(password, user.password)
    if(!compare){
        const msg = notices.loginFailed
        res.status(msg.code).send(msg)
        return next('route')
    }
    
    return next()
}

/** KIEM TRA TAC GIA CO TON TAI KHONG
 * 
 * @param {req, res, next}
 * 
 * @return next('route') | next()
 * 
 */
 const checkAuthorExists = async (req, res, next) => {
    const id = req.query.id
    // PHAI TON TAI USER NAY
    const user = await User.existsUser({id, roleId: {[Op.not]: 3}})
    if(!user){
        const err = notices._500
        res.status(err.code).json(err)
        return next('route')
    }
    return next()
}


module.exports={
    verifyUserRegister,
    verifyFormResetPassword,
    verifyEmailForgetPassword,
    verifyLoginUser,
    checkAuthorExists
}