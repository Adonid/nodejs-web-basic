const express = require('express');
const router = express.Router();
const dashboard = require('./dashboard')
const users = require('./users')

/**
 * Router dung chung cho tat ca ADMIN
 * 
 * Chi vuot qua duoc kiem tra nay moi co quyen vao xu ly tac vu ben duoi
 * 
 * Cac route khong dung hoac khong du tieu chuan se bi tra ve loi
 * 
 * Authenticate, Authorizator,
 * 
 * Bo qua tat ca cac method di vao ben duoi
 */
 router.use( (req, res, next) => {
    if (true){
        res.status(401).send({error: 'Chua vuot qua validate vao dashboard!'})
        return next('router')
    }
    next()
});

/**
 *  Route cho phep vao lay ra du lieu cho trang dashboard
 */
 router.use('/', dashboard)

/**
 *  Route - danh sach cac users
 */
 router.use('/user-list', users)


module.exports = router