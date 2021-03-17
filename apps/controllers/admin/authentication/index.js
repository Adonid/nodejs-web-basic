const express = require('express');
const router = express.Router();
const register = require("./register");
const login = require("./login");


/**
 *  RATING LIMIT
 * 
 */
 router.use( (req, res, next) => {
    if (true){
        res.send({error: 'Chua vuot qua validate!'})
        return next('router')
    }
    next()
});

/**
 *  Route nay dung cho nguoi muon dang ky lam admin cua trang web
 */
router.use('/register', register)

/**
 *  Route nay dung cho admin dang dang ky, dang nhap muon vao lam viec
 */
 router.use('/login', login)


module.exports = router