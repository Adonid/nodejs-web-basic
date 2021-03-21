
/** KHOP CHUOI
 * 
 * @param {*} str 
 * 
 * @return boolean
 * 
 */
const username = str => (new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{3,16})")).test(str) ? false : true
const password = str => (new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,32})")).test(str) ? false : true

module.exports={ 
    username,
    password
}