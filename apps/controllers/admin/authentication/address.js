const express = require('express')
const router = express.Router()
const {User, Address} = require('../../../models')
const {notices} = require('../../../common')


/**
 * Lay ra danh sach cac districts thuoc 1 province
 * 
 * @param {provinceId} 
 * 
 * @returns {*} object JSON
 * 
 */
router.get('/districts', async (req, res) => {
    const {provinceId} = req.body
    const districts = await Address.getDistricts(provinceId)
    if(districts){
        const info = notices.reqSuccess(districts)
        return res.status(info.code).json(info)
    }
    const err = notices._500
    return res.status(err.code).json(err)
})

/**
 * Lay ra danh sach cac communes thuoc 1 district
 * 
 * @param {districtId} 
 * 
 * @returns {*} object JSON
 * 
 */
router.get('/communes', async (req, res) => {
    const {districtId} = req.body
    const communes = await Address.getCommunes(districtId)
    if(communes){
        const info = notices.reqSuccess(communes)
        return res.status(info.code).json(info)
    }
    const err = notices._500
    return res.status(err.code).json(err)
})

module.exports = router