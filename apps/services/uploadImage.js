/* 
* TIEN HANH CAC THAO TAC THEM, XOA FILE ANH TREN SERVER
*/
const fs = require('fs')
const ResizeImage = require('./resizeImage')
const { Stream } = require('stream')

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

  /** XOA FILE NEU TON TAI FILE
 * 
 * @param {pathFile}  // 'images/post/minh-tam/thumbnail/binh-minh-dau-tien-2021.jpeg'
 * 
 * @return {} boolean
 * 
 */
   const removeFileIfExists = async (pathFile) => {
    try {
      if (fs.existsSync(pathFile)) 
        fs.unlinkSync(pathFile)
    } catch(err) {
      console.error(err)
    }
  }

/**
 * LUU FILE ANH TU DINH DANG BASE64
 * 
 *  @param {folder, nameFile, base64} 
 * 
 *  @return {} boolean|pathFile
 */
  const saveImageBase64 = (folder, nameFile, base64) => {
    // Buffer & Stream la lam viec voi file lon va tu phan chia vung nho hieu qua
    const pathFile = folder + nameFile
    const buffer = new Buffer.from(base64, "base64")
    const img = new Stream.PassThrough()
    img.end(buffer)
    fs.writeFile(pathFile, img, (err) => {
      if (err) return console.error(err)
      console.log('file saved to ', pathFile)
      return pathFile
    })
  }


  /** LUU FILE ANH GOC(80%)
 * 
 * @param {folder, nameFile, buffer} 
 * 
 * @return {} boolean|pathFile
 * 
 */
   const saveOriginal = async (folder, nameFile, buffer) => {
    try {
      const OriginalImage = new ResizeImage(folder, nameFile)
      const pathFile = OriginalImage.saveOriginalImage(buffer)
      return pathFile
    } catch(err) {
      console.error(err)
      return false
    }
  }

  /** LUU FILE ANH THANH FILE THUMBNAIL
 * 
 * @param {folder, nameFile, buffer} 
 * 
 * @return {} boolean|pathFile
 * 
 */
   const saveThumbnail = async (folder, nameFile, buffer) => {
    try {
      const ThumbnailImage = new ResizeImage(folder, nameFile)
      const pathFile = ThumbnailImage.saveThumbnailImage(buffer)
      return pathFile
    } catch(err) {
      console.error(err)
      return false
    }
  }




module.exports = {
    createFolder,
    fileExists,
    removeFileIfExists,
    saveImageBase64,
    saveOriginal,
    saveThumbnail,
}