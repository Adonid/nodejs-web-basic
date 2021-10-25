const express = require('express')
const router = express.Router()
const {Post, Tag, User, CompanyDescription, DistributedData} = require('../../../models')
const {notices} = require('../../../common')
const { Op } = require("sequelize")
const {userMiddleware} = require("../../../middleware")


/**
 * To HOME PAGE
 * 
 * @params null
 * 
 * @returns {posts}
 */
 router.get('/', async (req, res) => {
    // Lay 9 bai viet moi nhat
    const postsFirst = await Post.getPosts("", {active: true}, 0, 9)
    // Lay 3 chu de co bai viet nhieu nhat

    if(postsFirst){
        const data = notices.reqSuccess(postsFirst)
        return res.status(data.code).json(data)
    }
    const err = notices._500
    return res.status(err.code).json(err)
 })

 /**
 * TOI TRANG CHU DE
 * 
 * @params {id}
 * 
 * @returns {posts}
 */
  router.get('/category', async (req, res) => {
    const id = req.query.id
    // Lay danh sach bai viet tu danh muc
    const mainPosts = await Post.getPosts("", {active: true, categoryId: id}, 0, 10)
    // Lay tat ca danh muc
    const tags = await Tag.getTags()
    // Lay cac bai viet cua danh muc khac
    const otherPosts = await Post.getPosts("", {active: true, categoryId: {[Op.not]: id,}}, 0, 15)
    if(mainPosts){
        const data = notices.reqSuccess({mainPosts, tags, otherPosts})
        return res.status(data.code).json(data)
    }
    const err = notices._500
    return res.status(err.code).json(err)
 })

 /**
 * TOI TRANG TAC GIA
 * 
 * @params {id}
 * 
 * @returns {posts}
 */
  router.get('/author', userMiddleware.checkAuthorExists, async (req, res) => {
    const id = req.query.id
    // Lay thong tin tac gia
    try {
        const author = await User.getUser({id, roleId: {[Op.not]: 3}})
                              .then(user => user)
                              .catch(err => err)
        // Lay danh sach bai viet tu tac gia nay
        const mainPosts = await Post.getPosts("", {active: true, authorId: id}, 0, 10)
        // Lay tat ca the tag
        const tags = await Tag.getTags()
        // Lay cac bai viet cua tac gia khac
        const otherPosts = await Post.getPosts("", {active: true, authorId: {[Op.not]: id}}, 0, 15)
        const data = notices.reqSuccess({author, mainPosts, tags, otherPosts})
            return res.status(data.code).json(data)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }    
 })

 /**
 * DOC BAI VIET
 * 
 * @params {id}
 * 
 * @returns {content}
 */
  router.get('/post', async (req, res) => {
      const {id} = req.query
    // Lay chi tiet tat ca cua bai viet
    const post = await Post.getDetailedPost({id, active: true, draft: false, remove: false})
    // Lay cac bai viet co cung the tag nay duoc gan vao
    const relativePosts = await Post.getPosts(post.title, {active: true, id: {[Op.not]: id}}, 0, 15)
    if(post){
        const data = notices.reqSuccess({post, relativePosts})
        return res.status(data.code).json(data)
    }
    const err = notices._500
    return res.status(err.code).json(err)
 })

 /**
 * TRANG ABOUT US - GIOI THIEU CONG TY
 * 
 * @params null
 * 
 * @returns {data}
 */
  router.get('/about-us', async (req, res) => {
    try {
        // Lay danh sach cac dac vu
        const agents = await CompanyDescription.getCompanysDescription()
        // Danh sach cac thanh vien
        const members = await User.getUsers({active: true, member: true, roleId: {[Op.not]: 3}})
        const data = notices.reqSuccess({agents, members})
        return res.status(data.code).json(data)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }   
 })

  /**
 * TRANG DIEU KHOAN CONG TY
 * 
 * @params null
 * 
 * @returns {data}
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
 * THEM QUAN TAM CUA KHACH HANG
 * 
 * @param {name, email, message}
 * 
 * @return {*} object JSON
 * 
 */
  router.post('/care/create', async (req, res) => {
    const {payload} = req.body
    const content = JSON.stringify(payload)
    try {
        await DistributedData.createDistributedData({type: 'care', content})
        const notify = notices._201("Phản hồi")
        return res.status(notify.code).json(notify)
    } catch (error) {
        return res.status(notices._500.code).json(notices._500)
    }
})


module.exports = router