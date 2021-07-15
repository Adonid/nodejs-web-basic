const {generalValidation} = require('../validator')
const {User, Post, Category} = require('../models')
const {notices, bcrypt, regex} = require('../common')
const {DriverGoogle} = require('../services')
const config = require('../../config/config.json')

const ROLE_ADMIN  = 1
const ROLE_AUTHOR = 2
const ROLE_USER   = 3

/**
 * 
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 * @return next('route') | next()
 */

const login = (req, res, next) => {
    const errors = generalValidation.login(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const register = (req, res, next) => {
    const errors = generalValidation.register(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

/** Xu ly cap nhat AVATAR
 *  Ap dung cho TAT CA user
 * 
 * @param {req, res, next}
 * 
 * @return next('route') | next()
 * 
 */
 const checkUpdateImage = async (req, res, next) => {
    const {email, roleId, name} = req.user
    const {imageBase64} = req.body
    // DUNG DINH DANG IMAGE64 KHONG
    const isImage = regex.base64String(imageBase64)
    if(!isImage){
        const err = notices.errorField('image', "Uh! Không phải định dạng ảnh.")
        res.status(err.code).json(err)
        return next('route')
    }
    // PHAI TON TAI USER NAY
    const user = await User.existsUser({email, roleId, name})
    if(!user){
        const err = notices._500
        res.status(err.code).json(err)
        return next('route')
    }
    return next()
}

/**
 * xac thuc du lieu THONG TIN CO BAN
 * @param {name, fullName, phoneNumber, address, provinceId, districtId, communeId} = req.body
 * @return {next | next('route')}
 */
const checkUserBasicInfo = (req, res, next) => {
    const errors = generalValidation.checkUserDataBasic(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

/**
 * xac thuc PASSWORD TRUOC KHI UPDATE
 * @param {password, newPassword, rePassword} = req.body
 * @return {next | next('route')}
 */
const checkUpdatePassword = async (req, res, next) => {
    const {id, email, roleId} = req.user
    const {password} = req.body
    const errors = generalValidation.checkUserPassword(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    const user = await User.getUser({id, email, roleId})
                            .then(data => data)
                            .catch(err => err)
    if(!user){
        res.status(notices._500.code).send(notices._500)
        return next('route')
    }
    if(!bcrypt.comparePassword(password, user.password)){
        const err = notices.fieldError("password", "Uh! Mật khẩu không đúng")
        res.status(err.code).send(err)
        return next('route')
    }
    return next()
}

/**
 * DOI THUONG THAO TAC KHONG PHAI LA ADMIN
 * @param {roleId} = req.body
 * @return {next | next('route')}
 */
const checkNotAdmin = async (req, res, next) => {
    const {roleId} = req.body
    const errorActive = generalValidation.checkActiveUser(req)
    if(errorActive){
        res.status(errorActive.code).send(errorActive)
        return next('route')
    }
    if(roleId===ROLE_ADMIN){
        const err = notices.requestError("Uh! Không được thay đổi Admin")
        res.status(err.code).send(err)
        return next('route')
    }
    return next()
}

/**
 * MIDDLEWARE DU LIEU TAO MOI POST
 * @param {'title', 'imageBase64', 'desc', 'readTime', 'content', 'authorId', 'categoryId'} = req.body
 * @return {next | next('route')}
 */
const checkNewPost = async (req, res, next) => {
    const {title, categoryId} = req.body
    // Kiem tra dinh dang du lieu
    const error = generalValidation.checkNewPost(req)
    if(error){
        res.status(error.code).send(error)
        return next('route')
    }
    // Tieu de bai viet khong trung nhau
    const post = await Post.getOnePost({title})
    if(post){
        const duplicate = notices.fieldNotDuplicate('title', title)
        res.status(duplicate.code).send(duplicate)
        return next('route')
    }
    // Co ton tai danh muc nay khong
    const category = await Category.getCategory({id: categoryId})
    if(!category){
        const duplicate = notices.notFound('danh mục này')
        res.status(duplicate.code).send(duplicate)
        return next('route')
    }
    return next()
}

/**
 * MIDDLEWARE DU LIEU KICH HOAT POST
 * @param {id, active} = req.body
 * @return {next | next('route')}
 */
const checkActivePost = async (req, res, next) => {
    const {id, active} = req.body
    // Kiem tra dinh dang du lieu
    if(typeof(active) !== 'boolean'){
        const error = notices.fieldNotFormat("active", "Dữ liệu active(true or false)")
        res.status(error.code).send(error)
        return next('route')
    }
    // Co ton tai bai viet nay khong
    const post = await Post.getOnePost({id})
    if(!post){
        const duplicate = notices.notFound('Bài viết này')
        res.status(duplicate.code).send(duplicate)
        return next('route')
    }
    return next()
}

/**
 * MIDDLEWARE DU LIEU UPDATE POST
 * @param {id, title, imageBase64, desc, readTime, content, categoryId} = req.body
 * @return {next | next('route')}
 */
const checkUpdatePost = async (req, res, next) => {
    const {id, title, categoryId} = req.body
    // Kiem tra dinh dang du lieu
    const error = generalValidation.checkUpdatePost(req)
    if(error){
        res.status(error.code).send(error)
        return next('route')
    }
    // Tieu de bai viet khong trung nhau
    const post = await Post.isPostDuplicate(id, title)
    if(post){
        const duplicate = notices.fieldNotDuplicate('title', title)
        res.status(duplicate.code).send(duplicate)
        return next('route')
    }
    // Co ton tai danh muc nay khong
    const category = await Category.getCategory({id: categoryId})
    if(!category){
        const duplicate = notices.notFound('danh mục này')
        res.status(duplicate.code).send(duplicate)
        return next('route')
    }
    return next()
}

module.exports={
    login,
    register,
    checkUpdateImage,
    checkUserBasicInfo,
    checkUpdatePassword,
    checkNotAdmin,
    checkNewPost,
    checkActivePost,
    checkUpdatePost
}