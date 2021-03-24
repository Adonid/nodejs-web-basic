const validator = require('validator')
const {notices, regex, bcrypt} = require('../common')
const {User} = require('../models')

/** CAC METHODS NAY DUNG DE SOI CHIEU VOI DU LIEU CUA REQUEST - ONLY SELECT */


/** KIEM TRA EMAIL CO BAN - khong rong - dung dinh dang
 * 
 * @param email 
 * @returns boolean or error
 */
const emailCheckBase = email => {
    // Validate email
    if(!email || !email.trim()){
        return notices.fieldEmpty('email', 'địa chỉ email')
    }
    if(!validator.isEmail(email)){
        return notices.notEmail
    }
    return false
}

/**
 * @params req
 * @returns errors
 */
 const login = async req => {
    const {email, password} = req.body

    // Validate email
    const emailBase = emailCheckBase(email)
    if(emailBase){
        return emailBase
    }
    if(email.length < 9 || email.length > 32){
        return notices.loginFailed
    }
    // Validate pasword
    if(!password || !password.trim()){
        // return notices.fieldEmpty('password')
        return notices.loginFailed
    }
    if(regex.password(password)){
        // return notices.passwordNotFormat
        return notices.loginFailed
    }

    // email nay phai dang ky ROI
    const user = await User.emailAvailable(email)
                        .then(data => data)
                        .catch(err=>err)
    if(!user)
        return notices.loginFailed
        
    // Mat khau phai trung khop
    const compare = bcrypt.comparePassword(password, user.password)
    if(!compare)
        return notices.loginFailed
    
    // Admin nay phai da duoc kich hoat
    if(!user.active)
        return notices.userNotActive

    return false
}

/**
 * @params req
 * @returns errors
 */
const register = async req => {
    const {name, email, password, repassword} = req.body

    // Validate username
    if(!name || !name.trim()){
        return notices.fieldEmpty('name', 'tên người dùng')
    }
    if(regex.username(name)){
        return notices.usernamedNotFormat
    }
    // Validate email
    const emailBase = emailCheckBase(email)
    if(emailBase)
        return emailBase
    if(email.length < 9 || email.length > 32){
        return notices.lengthNotIn('email', 9, 32, 'Địa chỉ email')
    }
    // Validate pasword
    if(!password || !password.trim()){
        return notices.fieldEmpty('password')
    }
    if(regex.password(password)){
        return notices.passwordNotFormat
    }
    if(password!==repassword){
        return notices.notDuplicate
    }

    // email nay phai CHUA dang ky
    const user = await User.emailAvailable(email)
                        .then(data => data)
                        .catch(err=>err)
    if(user)
        return notices.registerFailed

    return false
}

module.exports={
    emailCheckBase,
    login,
    register
}