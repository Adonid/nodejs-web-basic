const validator = require('validator')
const {notices} = require('../common')
const {User} = require('../../models')

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

/** KIEM TRA SU TON TAI CUA TAI KHOAN THEO EMAIL 
 * 
 * @param email address
 * 
 * @return boolean or OBJECT
*/
const emailAvailable = email => {
    return new Promise( async (resolve, reject) => {
        const data = await User.findAll({
            where: {
                email: email  
            }
        })
        if(data[0]||false)
            resolve(data[0].dataValues)
        else
            reject(false)
    })
}

module.exports={
    emailCheckBase,
    emailAvailable
}