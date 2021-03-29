const {notices} = require('../common')
const {User} = require('../models')
const {emailCheckBase, isResetPassword} = require('./general')

/** KIEM TRA XEM EMAIL NAY DA DANG KY CHUA
 * 
 * @param req 
 * @returns boolean | json
 */
 const isValidEmailAdmin = async req => {
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
    const user = await User.getUser({email, roleId: 1})
                        .then(data => data)
                        .catch(err=>err)
    if(!user)
        return notices.notValidEmail
    return false
    
}

/** KIEM TRA XEM req nay co du tieu chuan de update password CHO ADMIN khong
 * @params req
 * @returns errors
 */
 const isResetPasswordAdmin = async req => {
    const {email, codeReset} = req.body
    const roleId = 1
    // Kiem tra so bo req
    const isReset = isResetPassword(req)
    if(isReset)
        return isReset

    // Du lieu yeu cau reset password phai khop voi du lieu da luu tru CUA ADMIN
    const user = await User.getUser({email, codeReset, roleId})
                        .then(data => data)
                        .catch(err=>err)
    if(!user)
        return notices.notDataResetPassword

    return false
}


module.exports={
    isValidEmailAdmin,
    isResetPasswordAdmin
}