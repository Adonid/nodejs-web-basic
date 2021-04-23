const {Slug} = require('../helpers')

/** KHOP CHUOI
 * 
 * @param {*} str 
 * 
 * @return boolean
 * 
 */
const username = str => (new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{3,16})")).test(str) ? false : true
const password = str => (new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,32})")).test(str) ? false : true
const phoneNumber = str => (new RegExp("^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}")).test(str) ? false : true
// const textNormal = str => (new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\(\)%\^&\*])(?=.{3,64})")).test(str) ? false : true

const textNormal = str => {
    const slug = Slug.slugName(str)
    return /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{2,}$/g.test(slug) ? false : true
}

module.exports={ 
    username,
    password,
    phoneNumber,
    textNormal
}