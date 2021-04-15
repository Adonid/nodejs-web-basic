/* 
Google Drive API:
Demonstration to:
1. upload 
2. delete 
3. create public URL of a file.
required npm package: googleapis
*/

const {google} = require('googleapis')
const config = require('../../config/config.json')
const fs = require('fs')
const path = require('path')
const { Stream } = require('stream')

const CLIENT_ID = config.googledriver.clientID
const CLIENT_SECRET = config.googledriver.clientSecret
const REDIRECT_URI = config.googledriver.callbackURL
const REFRESH_TOKEN = config.googledriver.refeshtoken

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  })

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/
/** Upload file len GOOGLE DRIVER
 * 
 * @params {imgBase64} file anh da ma hoa sang kieu base64
 * 
 * @returns {kind, id, name, mimeType} 
 * 
 */
const uploadFile = async (imgBase64) => {
  try {
    // Xu ly File dung luong lon
    // const imgUpload = imgBase64.split(/,(.+)/)[1];
    // Buffer & Stream la lam viec voi file lon va tu phan chia vung nho hieu qua
    const buf = new Buffer.from(imgBase64, "base64");
    const img = new Stream.PassThrough();
    img.end(buf);
    const response = await drive.files.create({
      requestBody: {
        name: 'example-1.jpg', //This can be name of your choice
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: img,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)
    return false
  }
}

/** Delete file tren GOOGLE DRIVER
 * 
 * @params {fileId}
 * 
 * @returns {status}
 * 
 */
 const deleteFile = async (fileId) => {
    try {
      const response = await drive.files.delete({
        fileId,
      })
      console.log(response.data, response.status)
      return response.status
    } catch (error) {
      console.log(error.message)
      return false
    }
  }

/** Lay thong tin file
 * 
 * @params {fileId}
 * 
 * @return {webContentLink, webViewLink}
 * 
 */
  const generatePublicUrl = async (fileId) => {
    try {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
      return result.data
    } catch (error) {
      console.log(error.message);
      return false
    }
  }

module.exports = {
    uploadFile,
    deleteFile,
    generatePublicUrl
}