/**
 * TAO CHUOI NGAU NHIEN
 */
const makeCodeReset = (length, type=false) => {
    var result           = ''
    var characters       = type?'0123456789':'0123456789abcdefghijlmnopqrstuvwxyz'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
 }

 module.exports = {
     makeCodeReset
 }