const {userValidation} = require('../validator')
const {notices} = require('../common')
const {User} = require('../models')

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


module.exports={
    verifyUserRegister
}