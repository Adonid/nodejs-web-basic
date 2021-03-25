const jwt = require('jsonwebtoken')
const config = require('../../config/config.json')
const {User} = require('../models')

const generateToken = async email => {
    const {id, roleId, name, fullName} = await User.getUser({email})
                            .then(data => data)
                            .catch(err=>err)
    const token = jwt.sign(
        { id, roleId, email, name, fullName },
        config.passport.secret,
        { expiresIn: config.passport.expiresIn }
    )
    return token
}

module.exports={
    generateToken
}