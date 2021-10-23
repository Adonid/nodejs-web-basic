const express = require('express')
const router = express.Router()
const {CompanyDescription, Colors, Icons} = require('../../../models')
const {notices} = require('../../../common')

/**
 * Lay danh sach tat ca danh muc
 * 
 * @param {*} 
 * 
 * @return {*} object JSON
 * 
 */
router.get('/', async (req, res) => {
    try {
        const fox = await CompanyDescription.getCompanysDescription()
        const colors = await Colors.getColors()
        const icons = await Icons.getIcons()
        const data = notices.reqSuccess({fox, colors, icons})
        return res.status(data.code).json(data)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }    
})

/**
 * CREATE | UPDATE CATEGORY
 * 
 * @param {id, name, color, description} 
 * 
 * @return {*} object JSON
 * 
 */
router.post('/manipulation', async (req, res) => {
    const {id, name, color, icon, description} = req.body
    try {
        // CO ID->UPDATE
        if(id){
            await CompanyDescription.updateCompanyDescription({name, colorId: color, iconId: icon, description}, {id})
        }
        // KO CO ID->ADD NEW
        else{
            await CompanyDescription.createCompanyDescription({name, colorId: color, iconId: icon, description})
        }
        // Lay lai danh sach companysDescription
        const companysDescription = await CompanyDescription.getCompanysDescription()
        const notify = id?notices._203("Đối tượng", companysDescription):notices._201_data("Tạo mô tả", companysDescription)
        return res.status(notify.code).json(notify)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * DELETE CATEGORY - EXCEPTION ID = 1
 * 
 * @param {id} 
 * 
 * @return {*} object JSON
 * 
 */
router.post('/manipulation/del', async (req, res) => {
    const {id} = req.body
    try {
        await CompanyDescription.deleteCompanyDescription(id)
        // Lay lai danh sach categories
        const companysDescription = await CompanyDescription.getCompanysDescription()
        const resuft = notices._204(companysDescription)
        return res.status(resuft.code).json(resuft)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})


module.exports = router