const bcrypt = require('bcrypt')
const config = require('../../config/config.json')


/**
 * 
 * @param password 
 * @returns hash
 */
const hashPassword = password => {
    const saltRounds = config.saltRounds
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt); 
    return hash
}

/**
 * 
 * @param password 
 * @returns boolean
 */
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash)

module.exports={
    hashPassword,
    comparePassword
}