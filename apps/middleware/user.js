const {userValidation} = require('../validator')
const {notices} = require('../common')
const {Post} = require('../models')

const verifyUserRegister = async (req, res, next) => {
    const errors = await userValidation.checkFormRegister(req)
    if(errors){
        const msg = notices.errorField('any', errors)
        res.status(msg.code).send(msg)
        return next('route')
    }
    return next()
}


module.exports={
    verifyUserRegister
}