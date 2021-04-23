const validator = require('validator')
const {notices, regex, bcrypt} = require('../common')
const {User} = require('../models')

/** CAC METHODS NAY DUNG DE SOI CHIEU VOI DU LIEU CUA REQUEST - ONLY SELECT */

// KIEM TRA DANG TEN NGUOI DUNG - NAME
const checkName = name => {
    // Validate username
    if(!name || !name.trim()){
        return notices.fieldEmpty('name', 'tên người dùng')
    }
    if(regex.username(name)){
        return notices.usernamedNotFormat
    }
    return false
}

// KIEM TRA DANG MAR KHAU - PASSWORD
const checkPassword = password => {
    // Validate pasword
    if(!password || !password.trim()){
        return notices.fieldEmpty('password')
    }
    if(regex.password(password)){
        return notices.passwordNotFormat
    }
    return false
}

// KHONG CO THI XEM NHU KO CO - NEU CO THI PHAI DUNG
// KIEM TRA DANG TEN NGUOI DUNG - FULLNAME
const checkFullName = fullName => {
    // Validate fullName
    if(fullName || fullName.trim()){
        if(regex.username(fullName)){
            return notices.fieldNotFormat("fullName", "Tên đầy đủ")
        }
        return false
    }
    return false
}

// KIEM TRA DANG SO DIEN THOAI - PHONENUMBER
const checkPhoneNumber = phoneNumber => {
    // Validate phoneNumber
    if(phoneNumber || phoneNumber.trim()){
        if(regex.phoneNumber(phoneNumber)){
            return notices.fieldNotFormat("phoneNumber", "Số điện thoại")
        }
    }
    return false
}
// KIEM TRA DANG TEXT NORMAL - ADDRESS
const checkAddress = address => {
    // Validate fullName
    if(address || address.trim()){
        if(regex.textNormal(address)){
            return notices.fieldNotFormat("address", "Địa chỉ")
        }
        return false
    }
    return false
}

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
 const login = req => {
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
    const emailBase = emailCheckBase(email)
    if(emailBase)
        return emailBase
    if(email.length < 9 || email.length > 32){
        return notices.lengthNotIn('email', 9, 32, 'Địa chỉ email')
    }
    // Validate pasword
    const isPassword = checkPassword(password)
    if(isPassword){
        return isPassword
    }
    if(password!==repassword){
        return notices.notDuplicate
    }

    return false
}
/**
 * @params req
 * @returns errors
 */
const isResetPassword = req => {
    const {email, codeReset, password, repassword} = req.body
    // Validate codeReset
    const code = codeReset.toString()
    if(!code || !code.trim() || code.length !== 5){
        return notices.notDataResetPassword
    }
    // Validate email
    const emailBase = emailCheckBase(email)
    if(emailBase)
        return notices.notDataResetPassword
    if(email.length < 9 || email.length > 32){
        return notices.notDataResetPassword
    }
    // Validate pasword
    const isPassword = checkPassword(password)
    if(isPassword){
        return isPassword
    }
    if(password!==repassword){
        return notices.notDuplicate
    }

    return false
}

/** KIEM TRA DU LIEU CO BAN CUA NGUOI DUNG GUI LEN CAP NHAT THONG TIN
 * @params req
 * @returns errors
 */
const checkUserDataBasic = req => {
    const {name, fullName, phoneNumber, address} = req.body
    const nameCheck = checkName(name)
    const fullNameCheck = checkFullName(fullName)
    const numberCheck = checkPhoneNumber(phoneNumber)
    const addressCheck = checkAddress(address)
    if(nameCheck)
        return nameCheck
    
    if(fullNameCheck)
        return fullNameCheck
    
    if(numberCheck)
        return numberCheck
    
    if(addressCheck)
        return addressCheck
    
    return false
    
}

module.exports={
    emailCheckBase,
    login,
    register,
    isResetPassword,
    checkUserDataBasic
}