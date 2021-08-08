const express = require('express')
const router = express.Router()
const {ImagePost} = require('../../../models')
const {notices} = require('../../../common')


/**
 * LAY CAC ANH THEO YEU CAU TRUY VAN
 * 
 * @params {query} 
 * 
 * @returns {*} object JSON
 * 
 */
 router.get('/', async (req, res) => {
    const {index, offset, limit} = req.body
    try {
        const images = await ImagePost.queryImages(index, offset, limit)
        const data = notices.reqSuccess(images)
        if(images)
            return res.status(data.code).json(data)
        return res.status(notices._500.code).json(notices._500)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

module.exports = router