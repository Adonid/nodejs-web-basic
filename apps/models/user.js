const {User, Role, Province, District, Commune, Post, CommentsPost, FavouritesPost, UserImage} = require('../../models')
const {ImageUser} = require('../models')
const config = require('../../config/config.json')

/** KIEM TRA DAY CO DUNG LA 1 TAI KHOAN KHONG
 * 
 * @param index options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean
*/
const existsUser = index => {
    const user = User.findOne({
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

    return user
}

/** LAY THONG TIN CO BAN CUA USER KHI DOI CHIEU THONG TIN DANG NHAP
 * 
 * @param obj options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean or OBJECT = {id, password,}
*/
const getUserBasic = obj => {
    return new Promise( async (resolve, reject) => {
        const data = await User.findOne({
            where: obj,
            attributes:  ['id', 'name', 'email', 'password', 'codeReset', 'active', 'roleId', 'updatedAt']
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
        const data = await User.findOne({
            where: obj,
            attributes:{
                exclude: ['password', 'codeReset', 'provinceId', 'districtId', 'communeId']
            },
            include: [
                {
                    model: Role,
                    attributes: ['id', 'roleName']
                }, 
                {
                    model: Province,
                    attributes: ['id', 'name']
                }, 
                {
                    model: District,
                    attributes: ['id', 'name']
                }, 
                {
                    model: Commune,
                    attributes: ['id', 'name']
                },  
                {
                    model: UserImage,
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
    const user = await User.create({
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
    return user
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
    const user = await User.create({
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
    return user
}

/** LUU TAI KHOAN USER DANG KY BANG MANG SOCIALs
 * 
 * @param {provider, name, email, profile_picture, meta} user 
 * 
 * @returns boolean
 */
const createUser = async ({provider, name, email, profile_picture, meta}) => {
    const resuft = await User.create({
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
        await ImageUser.createImage(newAvatar)
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
const updateUser = async (value, index, indexPrimary=false) => {
    const user = await User.update(value, {
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
    return user
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
    const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'active', 'provider', 'fullName', 'phoneNumber', 'createdAt' ],
        include: [
            {
                model: UserImage,
                attributes: ['type', 'name', 'original', 'thumbnail']
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
 * @returns {*} editors
 */
const paginationEditor = async () => {
    const editors = await User.findAll({
        attributes: ['id', 'name', 'email', 'active', 'fullName', 'phoneNumber', 'createdAt' ],
        include: [
            {
                model: UserImage,
                attributes: ['type', 'name', 'original', 'thumbnail']
            }
        ],
        where: {roleId: 2}
    })
    .then(u => {
        return u
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
    const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'active', 'fullName', 'phoneNumber', 'createdAt' ],
        where: {email, roleId},
        include: [
            {
                model: Role,
                attributes: ['id', 'roleName']
            }, 
            {
                model: Province,
                attributes: ['id', 'name']
            }, 
            {
                model: District,
                attributes: ['id', 'name']
            }, 
            {
                model: Commune,
                attributes: ['id', 'name']
            },  
            {
                model: UserImage,
                attributes: ['type', 'name', 'original', 'thumbnail']
            },
            Post, CommentsPost, FavouritesPost],
    })
    .then(u => {
        return u
    })
    .catch(err => {
        // console.log(err)
        return false
    })
    return user
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
    getUserDetail
}