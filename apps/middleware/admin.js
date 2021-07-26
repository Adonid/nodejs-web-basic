const {adminValidation} = require('../validator')
const {Category} = require('../models')
const { notices } = require('../common')


const verifyEmailAdmin = async (req, res, next) => {
    const errors = await adminValidation.isValidEmailAdmin(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const verifyLoginAdmin = async (req, res, next) => {
    const errors = await adminValidation.isLoginAdmin(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const verifyRegisterAdmin = async (req, res, next) => {
    const errors = await adminValidation.isRegisterAdmin(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const updatePasswordAdmin = async (req, res, next) => {
    const errors = await adminValidation.isResetPasswordAdmin(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const checkCategory = async (req, res, next) => {
    const {id, name} = req.body
    let exists = false
    // Kiem tra kieu du lieu

    // Neu tao moi thi ko duoc trung nhau
    if(!id){
        const cat1 = await Category.getCategory({name})
        exists = cat1?true:false
    }
    // Neu sua thi ten khong duoc trung nhau
    else{
        const cat2 = await Category.isCategoryDuplicate(id, name)
        exists = cat2?true:false
    }
    if(exists){
        const err = notices.errorField("name", "Tên danh mục này đã tồn tại!")
        res.status(err.code).send(err)
        return next('route')
    }
    return next()
}

const checkDelCategory = async (req, res, next) => {
    const {id} = req.body
    // NEU LA ID MAC DINH THI KHONG CHO PHEP DI TIEP
    if(id===1){
        const err1 = notices._400("Không thể xóa danh mục mặc định!")
        res.status(err1.code).send(err1)
        return next('route')
    }
    // CHI CHO DI TIEP NEU TON TAI DANH MUC NAY
    const cat = await Category.getCategory({id})
    if(!cat){
        const err2 = notices._404("danh mục")
        res.status(err2.code).send(err2)
        return next('route')
    }
    return next()
}

const checkUpdateCategory = async (req, res, next) => {
    const {id, name} = req.body
    const errors = adminValidation.checkUpdateCategory(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    // DANH MUC CO TON TAI KHONG
    const category = await Category.getCategory({id})
    if(!category){
        const err = notices.notFound('danh mục này hoặc đã bị xóa!')
        res.status(err.code).send(err)
        return next('route')
    }
    // CO TRUNG TEN KHONG
    const isDuplicate = await Category.isCategoryDuplicate(id, name)
    if(isDuplicate){
        const err = notices.fieldNotDuplicate('name', name)
        res.status(err.code).send(err)
        return next('route')
    }
    return next()
}



module.exports={
    verifyEmailAdmin,
    verifyLoginAdmin,
    verifyRegisterAdmin,
    updatePasswordAdmin,
    checkCategory,
    checkDelCategory,
    checkUpdateCategory
}