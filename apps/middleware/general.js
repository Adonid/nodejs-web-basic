const {generalValidation} = require('../validator')
const {User} = require('../models')
const {notices, bcrypt} = require('../common')
const {Slug} = require('..//helpers')
const {DriverGoogle} = require('../services')
const config = require('../../config/config.json')

const ROLE_ADMIN  = 1
const ROLE_AUTHOR = 2
const ROLE_USER   = 3

/**
 * 
 * @param {]} req 
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
 const updateAvatar = async (req, res, next) => {
    const {email, roleId, name} = req.user
    const {imageBase64} = req.body
    // PHAI TON TAI USER NAY
    const user = await User.getUser({email, roleId, name})
                            .then(data => data)
                            .catch(err => err)
    if(!user || !imageBase64){
        const err = notices._500
        res.status(err.code).json(err)
        return next('route')
    }
    // UPLOAD AVATAR MOI LEN
    const dataFile = await DriverGoogle.uploadFile(config.googledriver.avatarFolder, imageBase64, Slug.slugNameImage(name))
    if(!dataFile){
        const error = notices._500
        res.status(error.code).json(error)
        return next('route')
    }
    // XOA FILE CU NEU CO   
    const {fileId} = user.avatar
    if(fileId){
        const status = await DriverGoogle.deleteFile(fileId)
        // Loi ko xoa duoc
        if(!status){
            const error = notices._500
            res.status(error.code).json(error)
            return next('route')
        }
    }
    // CAP NHAT FILE CHO USER NAY
    const updated = await User.updateUser(
        {avatar: {webViewLink: dataFile.webViewLink, webContentLink: dataFile.webContentLink, thumbnailLink: dataFile.thumbnailLink, fileId: dataFile.fileId}},
        {email}
    )
    if(updated){
        const message = notices._203("???nh ?????i di???n", updated)
        res.status(message.code).json(message)
        return next()
    }
    const error = notices._500
    res.status(error.code).json(error)
    return next('route')
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
        const err = notices.fieldError("password", "Uh! M???t kh???u kh??ng ????ng")
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
        const err = notices.requestError("Uh! Kh??ng ???????c thay ?????i Admin")
        res.status(err.code).send(err)
        return next('route')
    }
    return next()
}

module.exports={
    login,
    register,
    updateAvatar,
    checkUserBasicInfo,
    checkUpdatePassword,
    checkNotAdmin
}