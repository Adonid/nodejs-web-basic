const {notices} = require('../common')
const {User} = require('../models')
const {emailCheckBase} = require('./general')

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

module.exports={
    isValidEmailEditor
}