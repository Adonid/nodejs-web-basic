
/**
 * @params null
 * 
 * @return constans
 */

/** 2 ×× Thành công */

const _200 = {
    code: 200,
    msg: "Thành công!"
}

const _201 = (name, as=null) => {
    return {
        code: 200,
        msg: `${as||name} đã được tạo thành công!`
    }
}

const _202 = (name, as=null) => {
    return {
        code: 200,
        msg: `${as||name} đã được phê duyệt!`
    }
}


/** Lỗi máy khách 4 ×× */
const _403 = {
    code: 403,
    error: "Úi. Tải trọng quá lớn!"
}

const _422 = {
    code: 422,
    error: "Thực thể không thể xử lý!"
}
/** Lỗi máy chủ 5 ×× */
const _599 = {
    code: 599,
    error: "Lỗi hết thời gian chờ kết nối mạng"
}

/** Lỗi ở các trường dữ liệu */

/** BAO LOI CHUNG */
const lengthNotIn = (name, min, max, as) => {
    return {
        code: 411,
        field: name,
        error: `${as||name} có độ dài từ ${min}-${max} ký tự nhé!`
    }
}
const fieldEmpty = (name, as=null) => {
    return {
        code: 411,
        field: name,
        error: `Uh ${as||name} rỗng rồi kìa!`
    }
}

/** BAO LOI USERNAME */
const usernamedNotFormat = {
    code: 411,
    field: "name",
    error: "Tên người dùng là chuỗi chứa ít nhất 1 ký tự thường & 1 chữ số, tối thiểu 3 tối đa 16!"
}

/** BAO LOI PASWORD */
const passwordNotFormat = {
    code: 411,
    field: "pasword",
    error: "Mật khẩu là chuỗi chứa ít nhất 1 ký tự thường, 1 ký tự in hoa, 1 chữ số, 1 ký tự đặc biệt, tối thiểu 6 tối đa 32!"
}
const notDuplicate = {
    code: 411,
    field: "repasword",
    error: "Nhập lại mật khẩu chưa đúng!"
}

/** BAO LOI EMAIL */

const notEmail = {
    code: 400,
    field: "email",
    error: "Uh email gì vậy! không có email này nhé"
}

/** BAO LOI CHUNG KHI DANG NHAP */
const loginFailed = {
    code: 400,
    field: "login",
    error: "Uh! email hoặc mật khẩu chưa đúng!"
}

/** BAO LOI KHI DANG KY TAI KHOAN */
const registerFailed = {
    code: 400,
    field: "register",
    error: "Uh! email này đã đăng ký tài khoản rồi!"
}

module.exports={
    fieldEmpty,
    lengthNotIn,
    usernamedNotFormat,
    passwordNotFormat,
    notDuplicate,
    loginFailed,
    registerFailed,
    notEmail,
    _200,
    _201,
    _202,
    _403,
    _422,
    _599,
}