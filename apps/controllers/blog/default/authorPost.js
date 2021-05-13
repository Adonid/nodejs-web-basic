const express = require('express')
const router = express.Router()
const {User, Post, Category} = require('../../../models')
const {notices} = require('../../../common')
const {
    generalMiddleware
} = require("../../../middleware")

/**
 * GET - Lay du lieu trang HOME
 * 
 * @param {}
 * 
 * @returns {posts}
 * 
 */
 router.get('/', async (req, res) => {
    
})

module.exports = router