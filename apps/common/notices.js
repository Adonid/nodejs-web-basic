
/**
 * @params null
 * 
 * @return constans
 */

/** 2 ×× Thành công */

const _200 = {
    code: 200,
    error: false,
    msg: "Thành công!"
}

const _201 = (name, as=null) => {
    return {
        code: 201,
        error: false,
        msg: `${as||name} thành công!`
    }
}

const _202 = (name, as=null) => {
    return {
        code: 200,
        error: false,
        msg: `${as||name} đã được phê duyệt!`
    }
}

const loginSuccess = token => {
    return {
        code: 200,
        error: false,
        msg: "Đăng nhập thành công!",
        token
    }
}

const resetCodeSuccess = email => {
    return {
        code: 200,
        error: false,
        msg: "Mã xác minh đã được gửi vào email của bạn, vui lòng dùng mã để thay đổi mật khẩu!",
        email
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
const _500 = {
    code: 500,
    error: "Uh! đã xảy ra lỗi!"
}

const _599 = {
    code: 599,
    error: "Lỗi! hết thời gian chờ kết nối mạng"
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
        error: `Uh ${as||name} không để trống nhé!`
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
const userNotActive = {
    code: 401,
    field: "login",
    error: "Uh! tài khoản của bạn đang chờ admin kích hoạt nhé!"
}

/** BAO LOI KHI DANG KY TAI KHOAN */
const registerFailed = {
    code: 400,
    field: "register",
    error: "Uh! email này đã đăng ký tài khoản rồi!"
}

const duplicationAccount = {
    code: 401,
    field: "register",
    error: "Uh! Dùng email khác nhé, email này đã có người dùng rồi!"
}

/** LOI EMAIL CHUA DANG KY or KHONG TON TAI */
const notValidEmail = {
    code: 401,
    field: "email",
    error: "Uh! email này chưa đăng ký hoặc không thuộc về bạn!"
}

/** LOI DU LIEU XAC THUC CAP NHAT MAT KHAU KHONG DUNG */
const notDataResetPassword = {
    code: 401,
    field: "reset-password",
    error: "Uh! Mã xác minh chưa đúng hoặc không phải dành cho email này"
}


module.exports={
    fieldEmpty,
    lengthNotIn,
    usernamedNotFormat,
    passwordNotFormat,
    notDuplicate,
    loginFailed,
    userNotActive,
    registerFailed,
    duplicationAccount,
    notValidEmail,
    notDataResetPassword,
    notEmail,
    _200,
    _201,
    _202,
    loginSuccess,
    resetCodeSuccess,
    _403,
    _422,
    _500,
    _599,
}