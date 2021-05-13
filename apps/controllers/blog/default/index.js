const express = require('express')
const router = express.Router()
const home = require('./home')

/**
 *  CAC ROUTER DUOC PHEP TRUY CAP MAC DINH TU USER CHUA DUOC DANG NHAP | DA DANG NHAP ROI
 */

/**
 *  ROUTE TRUY CAP VAO TRANG CHU
 */
router.use('/', home)

/**
 *  LAY CAC BAI VIET THEO DANH MUC - CO GIOI HAN KHI CUON LOAD
 */
 router.use('/archive-posts', archivePosts)

 /**
  * LAY CHI TIET THONG TIN BAI VIET
  */
 router.use('/single-post', singlePost)

 /**
  * XEM THONG TIN & CAC BAI VIET CUA TAC GIA
  */
 router.use('/author-post', authorPost)

 /**
  * XEM THONG TIN ABOUTUS
  */
 router.use('/about-us', aboutUs)


module.exports = router