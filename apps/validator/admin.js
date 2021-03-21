const {notices, regex} = require('../common')
const validate = require('./common')

/**
 * @params 
 * @returns errors
 */


const login = req => {
    const {email, password} = req.body

    // Validate email
    const emailBase = validate.emailCheckBase(email)
    if(emailBase)
        return emailBase
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

    // email nay phai dang ky roi
    const user = validate.isUser(email)
    if(user!==false)
        return notices.loginFailed

    return false
}
/**
 * @params 
 * @returns errors
 */
const register = req => {
    const {name, email, password, repassword} = req.body

    // Validate username
    if(!name || !name.trim()){
        return notices.fieldEmpty('name', 'tên người dùng')
    }
    if(regex.username(name)){
        return notices.usernamedNotFormat
    }
    // Validate email
    const emailBase = validate.emailCheckBase(email)
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

    // email nay phai chua dang ky
    const user = validate.isUser(email)
    if(user===false)
        return notices.registerFailed

    return false
}

module.exports={
    login,
    register
}