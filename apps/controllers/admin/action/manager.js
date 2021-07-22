const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const {notices} = require('../../../common')

/**
 * Cap nhat thong tin co ban cho user
 * 
 * @param {id, email, roleId, active}
 * 
 * @returns {user} object JSON
 * 
 */
router.post('/activities', async (req, res) => {
    const {id, email, active} = req.body
    const user = await User.updateUser(
        {active},
        {id, email}
    )
    if(user){
        const note = notices.reqSuccess(user)
        return res.status(note.code).send(note)
    }
    return res.status(notices._500.code).send(notices._500)
})

module.exports = router