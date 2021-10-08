
const alias = [
    {
        name: "name", 
        alias: "Username",
        empty: "Username không để trống nhé!",
        duplicate: "Username đã có người dùng rồi!",
        notFormat: "Username chứa 6-12 ký tự A-Za-z, 0-9",
    },
    {
        name: "email", 
        alias: "địa chỉ email",
        empty: "Địa chỉ email trống rồi kìa!",
        errorLogin: "Email hoặc mật khẩu không đúng",
        duplicate: "Email đã có người dùng rồi!",
        notFormat: "Email không đúng định dạng"

    },
    {
        name: "password", 
        alias: "mật khẩu",
        empty: "Mật khẩu không được trống!",
        errorLogin: "Email hoặc mật khẩu không đúng",
        notFormat: "Mật khẩu chứa ít nhất 8 ký tự A-Za-z, 0-9 và 1 ký tự đặc biệt"
    },
    {
        name: "appro", 
        alias: "Chấp nhận",
        empty: "Cần được chấp nhận!",
    },
    {
        name: "codeReset", 
        alias: "Mã xác minh",
        empty: "Hãy nhập mã xác minh!",
        notFormat: "Mã xác minh gồm 5 số gửi trong email đăng ký của bạn!"
    },
    {
        name: "fullName", 
        alias: "Tên đầy đủ",
        empty: "Hãy nhập tên đầy đủ!",
        notFormat: "Tên đầy đủ không chứa ký tự đặc biệt!",
        limited: "Tên đầy đủ tối thiểu 5 và tối đa 32 ký tự!"
    },
    {
        name: "phoneNumber", 
        alias: "Số điện thoại",
        empty: "Hãy nhập số điện thoại!",
        notFormat: "Số điện thoại không đúng!"
    },
    {
        name: "address", 
        alias: "Địa chỉ",
        empty: "Hãy nhập địa chỉ!",
        notFormat: "Địa chỉ chứa ký tự A-Zz-a 0-9!",
        limited: "Tối thiểu 5 và tối đa 32 ký tự!"
    },
    {
        name: "age", 
        alias: "Tuổi",
        empty: "Hãy nhập tuổi!",
        notFormat: "Tuổi yêu cầu là số 0-9!",
        limited: "Tuổi từ 16+ đến 100!",
    },
    {
        name: "bio", 
        alias: "Câu nói slugan",
        empty: "Hãy nhập slugan!",
        notFormat: "Slugan chỉ chứa ký tự A-Za-z 0-9!",
        limited: "Chứa tối thiểu 6 đến 256 ký tự!",
    },
    {
        name: "provinceId", 
        alias: "Tỉnh/Thành phố",
        empty: "Hãy chọn Tỉnh/Thành phố!",
    },
    {
        name: "districtId", 
        alias: "Quận/Huyện",
        empty: "Hãy chọn Quận/Huyện!",
    },
    {
        name: "communeId", 
        alias: "Phường/Xã",
        empty: "Hãy chọn Phường/Xã!",
    },
    {
        name: "genre", 
        alias: "Giới tính",
        empty: "Chọn giới tính của bạn!",
    },
    {
        name: "work", 
        alias: "Công việc",
        empty: "Hãy chọn công việc bạn đang làm!",
    },
]

module.exports=alias