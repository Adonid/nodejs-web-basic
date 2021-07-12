const {Slug} = require('../helpers')
const alias = require('./alias')

/** KHOP CHUOI
 * 
 * @param {*} str 
 * 
 * @return boolean
 * 
 */
const username = str => (new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{3,16})")).test(str) ? false : true
const password = str => (new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,32})")).test(str) ? false : true
// So dien thoai VietNamese
const phoneNumber = str => (new RegExp("^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])(?=.*[0-9])(?=.{10})")).test(str) ? false : true

const textNormal = str => {
    const slug = Slug.slugName(str)
    return /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{2,}$/g.test(slug) ? false : true
}
// La chuoi base64 string
const base64String = str => (new RegExp("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$")).test(str) ? false : true
// La chuoi Ma mau HEX
const hexColorCode = str => /^#([0-9A-Fa-f]{3}){1,2}$/i.test(str) ? false : true


/** KHONG DE TRUONG RONG */
const requireField = (name, value) => {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(value === false || typeof value === "undefined" || value.trim() === "")
        error = field.empty
    return error
}

/** PHAI LA DINH DANG EMAIL */
const requireEmail = (name, value) => {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
        error = field.notFormat
    return error
}

/** PHAI DUNG DINH DANG MAT KHAU */
const requirePassword = (name, value) => {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(value) != true)
        error = field.notFormat
    return error
}

/** PHAI DUNG DINH DANH USERNAME */
const requireUserName = (name, value) => {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,12})").test(value) != true)
        error = field.notFormat
    return error
}

/** PHAI CHECKBOX TRUOC */
const isChecked = (name, value) => {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(!value)
        error = field.empty
    return error
}

/** PHAI LA MA XAC MINH */
const isCodeReset = (name, value) => {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(!/^[0-9]+$/i.test(value) || value.toString().length !== 5)
        error = field.notFormat
    return error
}

/** KHONG CHUA KY TU DAC BIET */
const notSpecialChar = (name, value)=> {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(/[@#$%^*&`~,.<>;':"/[\]|{}()=_+-]/i.test(value))
        error = field.notFormat
    return error
}

/** MINIMUM CHAR*/
const limitedName = (name, value)=> {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(value.toString().length < 5 || value.toString().length > 33)
        error = field.limited
    return error
}

/** LIMITED DESCRIPTION */
const limitedDescription = (name, value)=> {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(value.toString().length < 6 || value.toString().length > 256)
        error = field.limited
    return error
}

/** LIMITED AGE */
const limitedAge = (name, value)=> {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if( Number(value) < 16 || Number(value) > 100)
        error = field.limited
    return error
}

/** PHAI LA DINH SO DIEN THOAI VIET NAM */
const isPhoneNumber = (name, value)=> {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if(! new RegExp("^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])(?=.*[0-9])(?=.{7})").test(value) || value.toString().length > 10)
        error = field.notFormat
    return error
}

/** PHAI LA DINH NUMBER  */
const isNumber = (name, value)=> {
    const field = alias.filter(item => item.name === name)[0]
    let error = false
    if( !/^\d+$/i.test(value))
        error = field.notFormat
    return error
}

module.exports={ 
    username,
    password,
    phoneNumber,
    textNormal,
    base64String,
    hexColorCode,
    
    requireField,
    requireEmail,
    requirePassword,
    requireUserName,
    isChecked,
    isCodeReset,
    notSpecialChar,
    limitedName,
    limitedDescription,
    limitedAge,
    isPhoneNumber,
    isNumber
}