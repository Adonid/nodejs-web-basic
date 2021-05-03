const {notices, regex, bcrypt} = require('../common')
const {User} = require('../models')
const {
    emailCheckBase, 
    isResetPassword, 
    login, 
    register, 
    checkBase64String,
    checkHexColorCode
} = require('./general')

const roleId = 1

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

/** KIEM TRA XEM req nay co du tieu chuan de dang ky ADMIN khong
 * @params req
 * @returns errors
 */
 const isRegisterAdmin = async req => {
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

/** KIEM TRA XEM req nay co du tieu chuan de danh nhap vao ADMIN khong
 * @params req
 * @returns errors
 */
 const isLoginAdmin = async req => {
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
    
    // Admin nay phai da duoc kich hoat
    if(!user.active)
        return notices.userNotActive

    return false
}

/** KIEM TRA XEM req nay co du tieu chuan de update password CHO ADMIN khong
 * @params req
 * @returns errors
 */
 const isResetPasswordAdmin = async req => {
    const {email, codeReset} = req.body
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

/** KIEM TRA XEM req nay co du tieu chuan de update password CHO ADMIN khong
 * @params req
 * @returns errors
 */
 const checkNewCategory = req => {
    const {name, imageBase64, color, description} = req.body
    // Kiem tra so bo req
    if(!name || !name.trim()){
        return notices.fieldEmpty('name', 'tên danh mục')
    }
    const image64 = checkBase64String(imageBase64)
    if(image64){
        return image64
    }
    const colorCode = checkHexColorCode(color)
    if(colorCode){
        return colorCode
    }
    if(description || description.trim()){
        if(regex.textNormal(description)){
            return notices.fieldNotFormat("description", "Mô tả danh mục")
        }
        return false
    }
    return false
}


module.exports={
    isValidEmailAdmin,
    isRegisterAdmin,
    isLoginAdmin,
    isResetPasswordAdmin,
    checkNewCategory
}