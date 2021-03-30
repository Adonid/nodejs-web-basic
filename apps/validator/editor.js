const {notices, bcrypt} = require('../common')
const {User} = require('../models')
const {emailCheckBase, isResetPassword, login, register} = require('./general')

const roleId = 2
/** KIEM TRA XEM EMAIL NAY DA DANG KY CHUA
 * 
 * @param req 
 * @returns boolean | json
 */
 const isValidEmailEditor = async req => {
    const {email} = req.body
    // Validate email
    const emailBase = emailCheckBase(email)
    if(emailBase){
        return emailBase
    }
    if(email.length < 9 || email.length > 32){
        return notices.notEmail
    }
    // Check email is valid in database 
    const user = await User.getUser({email, roleId: 2})
                        .then(data => data)
                        .catch(err=>err)
    if(!user)
        return notices.notValidEmail
    return false
    
}

/** KIEM TRA XEM req nay co du tieu chuan de dang ky EDITOR khong
 * @params req
 * @returns errors
 */
 const isRegisterEditor = async req => {
    const {email} = req.body
    // Kiem tra so bo req
    const isPreRegister = register(req)
    if(isPreRegister)
        return isPreRegister

    //  email nay phai CHUA dang ky
    const user = await User.getUser({email, roleId})
                        .then(data => data)
                        .catch(err=>err)
    if(user)
        return notices.registerFailed

    return false
}

/** KIEM TRA XEM req nay co du tieu chuan de danh nhap vao EDITOR khong
 * @params req
 * @returns errors
 */
 const isLoginEditor = async req => {
    const {email, password} = req.body
    // Kiem tra so bo req
    const isPreLogin = login(req)
    if(isPreLogin)
        return isPreLogin

    // email nay phai dang ky ROI
    const user = await User.getUser({email, roleId})
                        .then(data => data)
                        .catch(err=>err)
    if(!user)
        return notices.loginFailed
        
    // Mat khau phai trung khop
    const compare = bcrypt.comparePassword(password, user.password)
    if(!compare)
        return notices.loginFailed
    
    // Editor nay phai da duoc kich hoat
    if(!user.active)
        return notices.userNotActive

    return false
}

/** KIEM TRA XEM req nay co du tieu chuan de update password CHO EDITOR khong
 * @params req
 * @returns errors
 */
 const isResetPasswordEditor = async req => {
    const {email, codeReset} = req.body
    // Kiem tra so bo req
    const isReset = isResetPassword(req)
    if(isReset)
        return isReset

    // Du lieu yeu cau reset password phai khop voi du lieu da luu tru CUA EDITOR
    const user = await User.getUser({email, codeReset, roleId})
                        .then(data => data)
                        .catch(err=>err)
    if(!user)
        return notices.notDataResetPassword

    return false
}


module.exports={
    isValidEmailEditor,
    isRegisterEditor,
    isLoginEditor,
    isResetPasswordEditor
}