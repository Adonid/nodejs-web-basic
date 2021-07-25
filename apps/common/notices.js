
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

const _203 = (name, datas) => {
    return {
        code: 201,
        error: false,
        msg: `${name} đã được cập nhật!`,
        datas
    }
}

const _204 = datas => {
    return {
        code: 200,
        error: false,
        msg: "Đã xóa!",
        datas
    }
}

const _205 = (name, datas) => {
    return {
        code: 205,
        error: false,
        msg: `${name} thành công!`,
        datas
    }
}

const loginSuccess = (token, myself, provinces) => {
    return {
        code: 200,
        error: false,
        msg: "Đăng nhập thành công!",
        token,
        myself, 
        provinces
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

const reqSuccess = datas => {
    return {
        code: 200,
        error: false,
        datas
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
        error: `Uh! ${as||name} không để trống nhé!`
    }
}

/** BAO LOI DINH DANG CUA TRUONG */
const fieldNotFormat = (filed, fieldName='') => {
    return {
        code: 411,
        field: filed,
        error: `${fieldName} không đúng định dạng!`
    }
}

/** BAO LOI TRUONG KHONG DUNG*/
const fieldNotTrue = (filed, fieldName) => {
    return {
        code: 411,
        field: filed,
        error: `${fieldName} không đúng!`
    }
}

/** BAO LOI TRUONG KHONG KHOP*/
const fieldNotMatch = (filed, fieldName) => {
    return {
        code: 411,
        field: filed,
        error: `${fieldName} không khớp!`
    }
}

/** TUY CHINH BAO LOI*/
const fieldError = (filed, fieldName) => {
    return {
        code: 411,
        field: filed,
        error: fieldName
    }
}

/** TUY CHINH BAO LOI REQ*/
const requestError = err => {
    return {
        code: 403,
        error: err
    }
}

/** TUY CHINH BAO LOI REQ*/
const formatError = err => {
    return {
        code: 401,
        error: err
    }
}

/** DU LIEU DA TON TAI - KHONG DUOC TAO RA TRUNG NHAU */
const fieldNotDuplicate = (filed, fieldName) => {
    return {
        code: 411,
        field: filed,
        error: `Uh! "${fieldName||filed}" đã tồn tại rồi`
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

/** KHONG TON TAI DOI TUONG MUON KIEM TRA HOAC THAO TAC */
const notFound = name => {
    return {
        code: 404,
        error: `Uh! Không tìm thấy ${name}`
    }
}

/** KHONG CO QUYEN THAO TAC NAY */
const notHavePermission = name => {
    return {
        code: 403,
        error: `Uh! Bạn không có quyền ${name}`
    }
}

/** THONG BAO CHUNG CHO LOI DINH DANG VALIDATE CAC FIELDs */
const errorField = (filed, err) => {
    return {
        code: 422,
        field: filed,
        error: err
    }
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
    fieldNotFormat,
    fieldNotTrue,
    fieldNotMatch,
    fieldError,
    fieldNotDuplicate,
    notValidEmail,
    notDataResetPassword,
    notEmail,
    _200,
    _201,
    _202,
    _203,
    _204,
    _205,
    loginSuccess,
    resetCodeSuccess,
    reqSuccess,
    requestError,
    formatError,
    notFound,
    _403,
    _422,
    _500,
    _599,
    notHavePermission,

    errorField
}