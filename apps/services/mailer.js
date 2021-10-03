const nodeMailer = require('nodemailer')
const config = require('../../config/config.json')

const transporter = nodeMailer.createTransport({
    host: config.mailler.host,
    port: config.mailler.port,
    secure: config.mailler.port===465?true:false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
      user: config.mailler.user,
      pass: config.mailler.password
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendMail = async (to, subject, htmlContent) => {
    const options = {
        from: config.mailler.user,  // địa chỉ admin email bạn dùng để gửi
        to: to,                     // địa chỉ gửi đến
        subject: subject,           // Tiêu đề của mail
        html: htmlContent           // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
    }
    // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
    const resuft = await transporter.sendMail(options)
                                    .then(send => {
                                        // console.log(send)
                                        return true
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        return false
                                    })
    return resuft
}

module.exports = {
    sendMail
  }