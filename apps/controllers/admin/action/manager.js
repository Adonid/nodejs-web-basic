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
    const payload = req.body
    const {id, email} = payload
    delete payload.id
    delete payload.email
    try {
        const user = await User.updateUser(
            payload,
            {id, email}
        )
        if(user){
            const note = notices._203("Tài khoản", user)
            return res.status(note.code).send(note)
        }
        return res.status(notices._500.code).send(notices._500)
    } catch (error) {
        return res.status(notices._500.code).send(notices._500)
    }
})

module.exports = router