const {user, role, province, district, commune, post, comments_post, favourites_post, user_image} = require('../../models')
const {image_user} = require('../models')
const config = require('../../config/config.json')

/** KIEM TRA DAY CO DUNG LA 1 TAI KHOAN KHONG
 * 
 * @param index options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean
*/
const existsUser = async index => {
    const userData = await user.findOne({
            attributes: ['id'],
            where: index
        })
        .then(u => {
            // console.log(u)
            return u?u.dataValues.id:false
        })
        .catch(err => {
            // console.log(err)
            return false
        })

    return userData
}

/** LAY THONG TIN CO BAN CUA USER KHI DOI CHIEU THONG TIN DANG NHAP
 * 
 * @param obj options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean or OBJECT = {id, password,}
*/
const getUserBasic = obj => {
    return new Promise( async (resolve, reject) => {
        const data = await user.findOne({
            where: obj,
            attributes:  ['id', 'name', 'fullName', 'email', 'password', 'codeReset', 'active', 'roleId', 'updatedAt']
        })
        if(data)
            resolve(data.dataValues)
        else
            reject(false)
    })
}
/** LAY THONG TIN CHI TIET CUA 1 USER BAT KY
 * 
 * @param obj options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean or OBJECT
*/
const getUser = obj => {
    return new Promise( async (resolve, reject) => {
        const data = await user.findOne({
            where: obj,
            attributes:{
                exclude: ['password', 'codeReset', 'provinceId', 'districtId', 'communeId', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: role,
                    attributes: ['id', 'roleName']
                }, 
                {
                    model: province,
                    attributes: ['id', 'name']
                }, 
                {
                    model: district,
                    attributes: ['id', 'name']
                }, 
                {
                    model: commune,
                    attributes: ['id', 'name']
                },  
                {
                    model: user_image,
                    attributes: ['type', 'name', 'original', 'thumbnail']
                }
            ],
        })
        if(data)
            resolve(data.dataValues)
        else
            reject(false)
    })
}

/** LUU TAI KHOAN ADMIN DANG KY
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns boolean
 */
const createAdmin = async (name, email, password) => {
    const userData = await user.create({
        name    : name,
        email   : email,
        password: password,
        roleId  : 1,
        active  : false
    })
    .then(user => {
        return user?true:false
    })
    .catch(err => {
        return false
    })
    return userData
}

/** LUU TAI KHOAN EDITOR DANG KY
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns boolean
 */
const createEditor = async (name, email, password) => {
    const userData = await user.create({
        name    : name,
        email   : email,
        password: password,
        roleId  : 2,
        active  : false
    })
    .then( u => {
        return u?true:false
    })
    .catch(err => {
        // console.log(err)
        return false
    })
    return userData
}

/** LUU TAI KHOAN USER DANG KY BANG MANG SOCIALs
 * 
 * @param {provider, name, email, profile_picture, meta} user 
 * 
 * @returns boolean
 */
const createUser = async ({provider, name, email, profile_picture, meta}) => {
    const resuft = await user.create({
        name,
        email,
        provider,
        social      : meta,
        password    : "aa@A88",
        roleId      : 3,
        active      : true
    })
    .then( u => {
        // console.log(u.dataValues)
        return u?u.dataValues:false
    })
    .catch(err => {
        // console.log(err)
        return false
    })
    // console.log(resuft)
    // Anh avatar cho user
    const newAvatar = {type: config.image.typeAvatar, name, userId: resuft.id, original: profile_picture}
    try {
        await image_user.createImage(newAvatar)
        return true
    } catch (error) {
        // console.log(err)
        return false
    }
}

/** CAP NHAT FIELD(s) TRONG BANG USER
 * 
 * @params {value, index, indexPrimary=false}
 * value: {nameField: value, ...}
 * index: {nameField: valueField}
 * indexPrimary: nameField - dung khi cap nhat luon ca truong index
 * @returns code
 */
const updateUser = async (value, index) => {
    const userData = await user.update(value, {
        where: index    
    })
    .then( data => {
        // console.log(data)
        return data||false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return userData
}

/** ADMINISTRATORs
 * 
 * LAY DANH SACH USERS THEO THAM SO TRUY VAN
 * 
 * @param {*} offset - vi tri bat dau lay
 * @param {*} limit  - gioi han toi da so users
 * @returns array
 */
const paginationUser = async (offset=0, limit=5) => {
    const users = await user.findAll({
        attributes: ['id', 'name', 'email', 'active', 'provider', 'fullName', 'phoneNumber', 'createdAt' ],
        include: [
            {
                model: user_image,
                attributes: ['name', 'original', 'thumbnail']
            }
        ],
        where: {roleId: 3},
        offset,
        limit
    })
    .then(u => {
        return u
    })
    .catch(err => {
        // console.log(err)
        return false
    })
    return users
}

/** ADMINISTRATORs
 * 
 * LAY TAT CA EDITORs
 * 
 * @param {*} none
 * @returns {*} array
 */
const paginationEditor = async () => {
    const editors = await user.findAll({
        attributes: ['id', 'name', 'email', 'active', 'fullName', 'phoneNumber', 'createdAt' ],
        include: [
            {
                model: user_image,
                attributes: ['name', 'original', 'thumbnail']
            }
        ],
        where: {roleId: 2}
    })
    .then(u => {
        return u||false
    })
    .catch(err => {
        // console.log(err)
        return false
    })
    return editors
}

/** ADMINISTRATORs
 * 
 * LAY CHI TIET USER
 * 
 * @param {*} req
 * @returns {*} user
 */
const getUserDetail = async (email, roleId) => {
    // Khong lay admin
    if(roleId===1)
        return false
    const userData = await user.findOne({
        attributes: ['id', 'name', 'email', 'active', 'fullName', 'phoneNumber', 'createdAt' ],
        where: {email, roleId},
        include: [
            {
                model: role,
                attributes: ['id', 'roleName']
            }, 
            {
                model: province,
                attributes: ['id', 'name']
            }, 
            {
                model: district,
                attributes: ['id', 'name']
            }, 
            {
                model: commune,
                attributes: ['id', 'name']
            },  
            {
                model: user_image,
                attributes: ['type', 'name', 'original', 'thumbnail']
            },
            post, comments_post, favourites_post],
    })
    .then(u => {
        return u
    })
    .catch(err => {
        // console.log(err)
        return false
    })
    return userData
}

/** LAY TAT CA TAC GIA
 * 
 * @param {}
 * 
 * @return boolean or OBJECT
*/
const getAuthors = async () => {
    const authors = await user.findAll({
        attributes: ['id', 'name', 'fullName' ],
        where: {roleId: 2}
    })
    .then(u => {
        return u
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return authors
}

/** DEM SO LUONG TAC GIA - KHONG CO ADMIN
 * 
 * @param {index}
 * 
 * @return boolean or OBJECT
*/
const countPeople = async index => {
    const authors = await user.count({
        where: index
    })
    return authors
}

module.exports={
    getUserBasic,
    existsUser,
    getUser,
    createAdmin,
    createEditor,
    createUser,
    updateUser,
    paginationUser,
    paginationEditor,
    getUserDetail,
    getAuthors,
    countPeople
}