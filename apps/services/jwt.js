const jwt = require('jsonwebtoken')
const config = require('../../config/config.json')
const {User} = require('../models')

/** Mac dinh xu ly nay cac du lieu da dung va co that. Ham nay lam viec trong suot
 * 
 * Tao ma JWT
 * 
 * @param {*} email 
 * @returns 
 */
const generateToken = async email => {
    const {id, roleId, name} = await User.getUser({email})
                            .then(data => data)
                            .catch(err=>err)
    const token = jwt.sign(
        { id, roleId, email, name },
        config.passport.secret,
        { expiresIn: config.passport.expiresIn }
    )
    return token
}

module.exports={
    generateToken
}