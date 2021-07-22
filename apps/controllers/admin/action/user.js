const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')


/**
 * LAY CHI TIET CAC DU LIEU CUA 1 USER
 * 
 * @params {query} 
 * 
 * @returns {*} object JSON
 * 
 */
 router.get('/', async (req, res) => {
    const id = JSON.parse(req.query.params).id
    try {
        const user = await User.getUser({id, roleId: 3})
                              .then(user => user)
                              .catch(err => err)
        const data = notices.reqSuccess(user)
        if(user)
            return res.status(data.code).json(data)
        return res.status(notices._500.code).json(notices._500)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

module.exports = router