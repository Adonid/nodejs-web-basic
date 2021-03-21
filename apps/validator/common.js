const validator = require('validator')
const {notices} = require('../common')
const {User} = require('../../models')


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

/** KIEM TRA SU TON TAI CUA TAI KHOAN THEO EMAIL 
 * 
 * @param email address
 * 
 * @return boolean
*/
const isUser = async email => {
    await User.findAll({
        where: {
            email: email
        }
    })
    .then(users => {
        return users.toJSON!=undefined?users:false
    })
    .catch(err => {
        return false
    })
}

module.exports={
    emailCheckBase,
    isUser
}