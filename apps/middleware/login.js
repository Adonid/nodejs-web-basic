
/**
 * 
 * @param {]} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const adminLogin = (req, res, next) => {
    if(true){
        res.status(400).send({error: "Khong vuot qua duoc LOGIN"})
        return next('route')
    }
    else{
        return next()
    }
}

module.exports={
    adminLogin
}