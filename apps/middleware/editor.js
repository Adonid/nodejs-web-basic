const {editorValidation} = require('../validator')
const {notices} = require('../common')
const {Post} = require('../models')

const verifyEmailEditor = async (req, res, next) => {
    const errors = await editorValidation.isValidEmailEditor(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const verifyLoginEditor = async (req, res, next) => {
    const errors = await editorValidation.isLoginEditor(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const verifyRegisterEditor = async (req, res, next) => {
    const errors = await editorValidation.isRegisterEditor(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}


const updatePasswordEditor = async (req, res, next) => {
    const errors = await editorValidation.isResetPasswordEditor(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

const checkIsMyPost = async (req, res, next) => {
    const {id} = req.body
    const user = req.user
    // Lay thong tin bai viet
    const post = await Post.getOnePost({id})
    if(post && post.authorId === user.id){
        return next()
    }
    const errors = notices.notHavePermission('thao tác bài viết này!')
    res.status(errors.code).send(errors)
    return next('route')
}



module.exports={
    verifyEmailEditor,
    verifyLoginEditor,
    verifyRegisterEditor,
    updatePasswordEditor,
    checkIsMyPost
}