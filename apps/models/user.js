const {User} = require('../../models')

/** KIEM TRA SU TON TAI CUA TAI KHOAN THEO EMAIL 
 * 
 * @param obj options - {email: "123hello@gmail.com"}...
 * 
 * @return boolean or OBJECT
*/
const getUser = obj => {
    return new Promise( async (resolve, reject) => {
        const data = await User.findOne({
            where: obj
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
    .then(() => {
        return user?true:false
    })
    .catch(err => {
        // console.log(err);
        return false
    })
    return user
}

/** CAP NHAT 1 FIELD TRONG BANG USER
 * 
 * @params email
 * @returns code
 */
const updateUser = async (value, index, indexPrimary=false) => {
    console.log(value, index)
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

module.exports={
    getUser,
    createAdmin,
    createEditor,
    updateUser
}