/**
 * TAO CHUOI NGAU NHIEN
 */
const makeCodeReset = (length) => {
    var result           = '';
    var characters       = '0123456789abcdefghijlmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 module.exports = {
     makeCodeReset
 }