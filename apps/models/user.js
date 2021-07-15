const {User, Role, Province, District, Commune, Post, CommentsPost, FavouritesPost, UserImage} = require('../../models')

/** KIEM TRA DAY CO DUNG LA 1 TAI KHOAN KHONG
 * 
 * @param obj options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean
*/
const existsUser = obj => {
    const user = User.findOne({
            attributes: ['id'],
            where: index
        })
        .then(u => {
            console.log(u)
            return u||false
        })
        .catch(err => {
            console.log(err)
            return false
        })

    return user
}

/** KIEM TRA SU TON TAI CUA TAI KHOAN THEO EMAIL 
 * 
 * @param obj options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean or OBJECT
*/
const getUser = obj => {
    return new Promise( async (resolve, reject) => {
        const data = await User.findOne({
            where: obj,
            include: [Role, Province, District, Commune, UserImage],
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
const createUser = async (user) => {
    const resuft = await User.create({
        name        : user.name,
        email       : user.email,
        provider    : user.provider,
        // avatar      : {webViewLink: user.profile_picture, webContentLink: "", thumbnailLink: "", fileId: ""},
        social      : user.meta,
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
    return resuft
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
        // console.log(err)
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
        include: [UserImage],
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
        include: [UserImage],
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
        include: [Role, Province, District, Commune, Post, CommentsPost, FavouritesPost, UserImage],
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