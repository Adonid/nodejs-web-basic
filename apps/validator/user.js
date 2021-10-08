const {regex} = require('../common')

/** CHECK EMAIL */
const checkFormatEmail = email => {
    const emailNotEmpty = regex.requireField('email', email)
    if(emailNotEmpty){
        return emailNotEmpty
    }
    const emailFormat = regex.requireEmail('email', email)
    if(emailFormat){
        return emailFormat
    }
    return false
}

/** CHECK REQUIRED FIELD */
const checkRequireField = (name, value) => {
    const nameNotEmpty = regex.requireField(name, value)
    if(nameNotEmpty){
        return nameNotEmpty
    }
    return false
}

/** CHECK FORMAT FORM REGISTER USER
 * 
 * @param req 
 * @returns boolean | json
 */
 const checkFormRegister = req => {
    const {name, email, password} = req.body
    // Validate USERNAME
    const nameNotEmpty = regex.requireField('name', name)
    if(nameNotEmpty){
        return nameNotEmpty
    }
    const nameFormat = regex.requireUserName('name', name)
    if(nameFormat){
        return nameFormat
    }
    // Validate EMAIL
    const emailNotEmpty = regex.requireField('email', email)
    if(emailNotEmpty){
        return emailNotEmpty
    }
    const emailFormat = regex.requireEmail('email', email)
    if(emailFormat){
        return emailFormat
    }
    // Validate PASSWORD
    const passwordNotEmpty = regex.requireField('password', password)
    if(passwordNotEmpty){
        return passwordNotEmpty
    }
    const passwordFormat = regex.requirePassword('password', password)
    if(passwordFormat){
        return passwordFormat
    }
    
    return false
    
}


module.exports={
    checkFormatEmail,
    checkRequireField,
    checkFormRegister,
}