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
    const fieldNotEmpty = regex.requireField(name, value)
    if(fieldNotEmpty){
        return fieldNotEmpty
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

/** CHECK FORMAT FORM REGISTER USER
 * 
 * @param {email, password, codeReset} 
 * @returns boolean | json
 */
 const checkFormResetPassword = (email, password, codeReset) => {
    // Validate Email
    const isEmail = checkFormatEmail(email)
    if(isEmail){
        return isEmail
    }
    // Validate Codereset
    const codeResetNotEmpty = checkRequireField('codeReset', codeReset)
    if(codeResetNotEmpty){
        return codeResetNotEmpty
    }
    const codeResetFormat = regex.isCodeReset('codeReset', codeReset, 6)
    if(codeResetFormat){
        return codeResetFormat
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
    checkFormResetPassword,
}