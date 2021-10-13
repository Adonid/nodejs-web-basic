const express = require('express')
const router = express.Router()
const {DistributedData} = require('../../../models')
const {notices} = require('../../../common')

/**
 * Lay du lieu POLICY
 * 
 * @param {*} 
 * 
 * @return {*} object JSON
 * 
 */
router.get('/policy', async (req, res) => {
    try {
        const fox = await DistributedData.getDistributedData({type:"policy"})
        const data = notices.reqSuccess(fox)
        return res.status(data.code).json(data)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }    
})

/**
 * UPDATE POLICY
 * 
 * @param {type, content} 
 * 
 * @return {*} object JSON
 * 
 */
router.post('/policy/update', async (req, res) => {
    const {type, content} = req.body
    try {
        await DistributedData.updateDistributedData({content}, {type})
        // Lay lai danh sach policy
        const policy = await DistributedData.getDistributedData({type:"policy"})
        const notify = notices._203("Chính sách & điều khoản", policy)
        return res.status(notify.code).json(notify)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

/**
 * DELETE
 * 
 * @param {id} 
 * 
 * @return {*} object JSON
 * 
 */
// router.post('/policy/del', async (req, res) => {
//     const {id} = req.body
//     try {
//         await DistributedData.deleteDistributedData(id)
//         // Lay lai danh sach categories
//         const companysDescription = await DistributedData.getCompanysDescription()
//         const resuft = notices._204(companysDescription)
//         return res.status(resuft.code).json(resuft)
//     } catch (error) {
//         return res.status(notices._500.code).json(notices._500)
//     }
// })

 /**
 * LAY CAC QUAN TAM CUA KHACH HANG
 * 
 * @param {null}
 * 
 * @return {array}
 * 
 */
  router.get('/cares', async (req, res) => {
    try {
        const datas = await DistributedData.getDistributedDatas({type: 'care'})
        // JSON.parse(datas[0].content)
        const notify = notices.reqSuccess(datas)
        return res.status(notify.code).json(notify)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})

 /**
 * XOA QUAN TAM CUA KHACH HANG
 * 
 * @param {id}
 * 
 * @return {array}
 * 
 */
  router.post('/care/delete', async (req, res) => {
    const {id} = req.body
    try {
        // Xoa
        await DistributedData.deleteDistributedData(id)
        // Lay lai danh sach
        const datas = await DistributedData.getDistributedDatas({type: 'care'})
        const resuft = notices._204(datas)
        return res.status(resuft.code).json(resuft)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})


module.exports = router