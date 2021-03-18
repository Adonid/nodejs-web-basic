/**
 * KIEM TRA DINH DANH DU LIEU REQ 
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns next, res
 * 
 */
const loginValidation = (req, res, next) => {
    // Xu ly middleware DUNG
    if(false) return next()
    // Xu ly middleware SAI
    else {
        res.json({message: "Khong vao DANH NHAP duoc"});
        return next('router')
    }
}

module.exports={
    loginValidation
}