const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')
const {generalMiddleware} = require('../../../middleware')


/**
 * Cap nhat thong tin co ban cho user
 * 
 * @param {id, email, roleId, active}
 * 
 * @returns {user} object JSON
 * 
 */
router.post('/active-user', generalMiddleware.checkNotAdmin, async (req, res) => {
    const {id, email, roleId, active} = req.body
    const user = await User.updateUser(
        {active},
        {id, email, roleId}
    )
    if(user){
        const note = notices.reqSuccess(user)
        return res.status(note.code).send(note)
    }
    return res.status(notices._500.code).send(notices._500)
})

module.exports = router