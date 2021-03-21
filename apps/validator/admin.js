const {notices, regex} = require('../common')
const validate = require('./common')

/**
 * @params req
 * @returns errors
 */


const login = async req => {
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
    let user = false
    user = await validate.emailAvailable(email)
    console.log(user);
    if(!user)
        return notices.loginFailed

    return false
}
/**
 * @params req
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
    const user = validate.emailAvailable(email)
    console.log(user);
    if(user)
        return notices.registerFailed

    return false
}

module.exports={
    login,
    register
}