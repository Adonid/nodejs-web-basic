/* 
* TIEN HANH CAC THAO TAC THEM, XOA FILE ANH TREN SERVER
*/
const fs = require('fs')
const config = require('../../config/config.json')
const { Stream } = require('stream')
const {Slug} = require('../helpers')

  /** TAO MOI 1 FOLDER
 * 
 * @param {pathFolder}  // 'images/users/minh-tam'
 * 
 * @return {} boolean
 * 
 */
   const createFolder = async (pathFolder) => {
    try {
      if (!fs.existsSync(pathFolder)) {
        fs.mkdirSync(pathFolder)
      }
    } catch (err) {
      console.error(err)
    }
  }

  /** KIEM TRA SU TON TAI FILE
 * 
 * @param {pathFile}  // 'images/post/minh-tam/thumbnail/binh-minh-dau-tien-2021.jpeg'
 * 
 * @return {} boolean
 * 
 */
   const fileExists = async (pathFile) => {
    try {
      if (fs.existsSync(pathFile)) 
        return true
      return false
    } catch(err) {
      console.error(err)
      return false
    }
  }



module.exports = {
    uploadFile,
    deleteFile,
    generatePublicUrl,
    updateFile
}