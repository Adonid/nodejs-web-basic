const {User} = require('../../models')

/** KIEM TRA SU TON TAI CUA TAI KHOAN THEO EMAIL 
 * 
 * @param email address
 * 
 * @return boolean or OBJECT
*/
const emailAvailable = email => {
    return new Promise( async (resolve, reject) => {
        const data = await User.findAll({
            where: {
                email: email  
            }
        })
        if(data[0]||false)
            resolve(data[0].dataValues)
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

module.exports={
    emailAvailable,
    createAdmin,
    createEditor
}