const sharp = require('sharp')
const path = require('path')
const config = require('../../config/config.json')

class ResizeImage {
  constructor(folder, nameFile) {
    // Tao duong dan tuyet doi chua anh
    this.fileName = path.resolve(folder+nameFile)
  }
  // Luu anh goc
  async saveOriginalImage(imgBase64) {
    // Xu ly File dung luong lon
    const base64 = imgBase64.split(/,(.+)/)[1]
    // Buffer la lam viec voi file lon va tu phan chia vung nho hieu qua
    const buffer = new Buffer.from(base64, "base64")
    // Resize anh & luu anh
    await sharp(buffer)
          .jpeg({
                quality: config.image.quality,
                chromaSubsampling: config.image.chromaSubsampling,
                mozjpeg: config.image.mozjpeg
           })
          .toFile(this.fileName)
          .catch(err => console.log(err))
    
    return this.fileName
  }
  // Luu anh thumbnail
  async saveThumbnailImage(imgBase64) {
    // Xu ly File dung luong lon
    const base64 = imgBase64.split(/,(.+)/)[1]
    // Buffer la lam viec voi file lon va tu phan chia vung nho hieu qua
    const buffer = new Buffer.from(base64, "base64")
    // Resize anh & luu anh
    await sharp(buffer)
          .resize(config.image.thumbnail.width, config.image.thumbnail.height, {fit: sharp.fit.inside, withoutEnlargement: true})
          .jpeg({
                quality: config.image.quality,
                chromaSubsampling: config.image.chromaSubsampling,
                mozjpeg: config.image.mozjpeg
           })
          .toFile(this.fileName)
          .catch(err => console.log(err))
    
    return this.fileName
  }
}

module.exports = ResizeImage