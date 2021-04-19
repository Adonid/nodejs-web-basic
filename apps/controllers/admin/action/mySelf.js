const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')
const {DriverGoogle} = require('../../../services')
const config = require('../../../../config/config.json')

/**
 * GET - Lay thong tin cua chinh toi
 * 
 * @params {user} - nhu trong da Passport tra ve
 * 
 * @returns {} object JSON
 * 
 */
router.get('/', async (req, res) => {
    const {user} = req
    const myself = await User.getUser(user)
                             .then(user => user)
                             .catch(err => err)
    if(myself){
        delete myself.password
        const msg = notices.reqSuccess(myself)
        return res.status(msg.code).json(msg)
    }
    return res.status(notices._500.code).json(notices._500)
})

module.exports = router