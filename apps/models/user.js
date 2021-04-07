const {User, Role, Province, District, Commune} = require('../../models')

/** KIEM TRA SU TON TAI CUA TAI KHOAN THEO EMAIL 
 * 
 * @param obj options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean or OBJECT
*/
const getUser = obj => {
    return new Promise( async (resolve, reject) => {
        const data = await User.findOne({
            // attributes: ['id', 'roleId', 'name', 'fullName', 'avatarUrl'],
            where: obj,
            include: [Role, Province, District, Commune],
        })
        // console.log(data.dataValues.Role.dataValues)
        // console.log(data.dataValues.Province.dataValues)
        // console.log(data.dataValues.District.dataValues)
        // console.log(data.dataValues.Commune.dataValues)
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
        avatarUrl   : user.profile_picture,
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

/** CAP NHAT 1 FIELD TRONG BANG USER
 * 
 * @params email
 * @returns code
 */
const updateUser = async (value, index, indexPrimary=false) => {
    const user = await User.update(value, {
        where: index    
    })
    .then((data) => {
        return data||false
    })
    .catch(err => {
        return false
    })
    if(user){
        const data = await getUser(indexPrimary||index)
                           .then(u => u)
                           .catch(err => false)
        if(data){
            const {name, fullName} = data
            return {name, fullName}
        }
        return false
    }
    return false
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
        attributes: ['id', 'name', 'email', 'active', 'provider', 'fullName', 'phoneNumber', 'avatarUrl', 'createdAt' ],
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
        attributes: ['id', 'name', 'email', 'active', 'fullName', 'phoneNumber', 'avatarUrl', 'createdAt' ],
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

module.exports={
    getUser,
    createAdmin,
    createEditor,
    createUser,
    updateUser,
    paginationUser,
    paginationEditor
}