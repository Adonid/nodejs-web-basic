const sharp = require('sharp')
const path = require('path')
const { Stream } = require('stream')
const config = require('../../config/config.json')

class ResizeImage {
  constructor(folder, nameFile) {
    this.folder = folder
    this.nameFile = nameFile
    // Tao duong dan tuyet doi chua anh
    const fileName = path.resolve(`${folder}/${nameFile}`)
    this.fileName = fileName
  }
  // Luu anh goc
  async saveOriginalImage(imgBase64) {
    // Xu ly File dung luong lon
    const base64 = imgBase64.split(/,(.+)/)[1]
    // Buffer & Stream la lam viec voi file lon va tu phan chia vung nho hieu qua
    const buffer = new Buffer.from(base64, "base64")
    const img = new Stream.PassThrough()
    img.end(buffer)
    // Resize anh & luu anh
    await sharp(img)
          .jpeg({
                quality: config.image.quality,
                chromaSubsampling: config.image.chromaSubsampling,
                mozjpeg: config.image.mozjpeg
           })
          .toFile(this.fileName)
    
    return this.fileName
  }
  // Luu anh thumbnail
  async saveThumbnailImage(imgBase64) {
    // Xu ly File dung luong lon
    const base64 = imgBase64.split(/,(.+)/)[1]
    // Buffer & Stream la lam viec voi file lon va tu phan chia vung nho hieu qua
    const buffer = new Buffer.from(base64, "base64")
    const img = new Stream.PassThrough()
    img.end(buffer)
    // Resize anh & luu anh
    await sharp(img)
          .resize(config.image.thumbnail.width, config.image.thumbnail.height, {fit: sharp.fit.inside, withoutEnlargement: true})
          .jpeg({
                quality: config.image.quality,
                chromaSubsampling: config.image.chromaSubsampling,
                mozjpeg: config.image.mozjpeg
           })
          .toFile(this.fileName)
    
    return this.fileName
  }
}

module.exports = ResizeImage