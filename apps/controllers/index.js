const express = require('express');
const router = express.Router();
const admin = require(__dirname + "/admin")

// Dung router o cac phan khac

// admin
router.use('/admin', admin);



//Router dung chung cho ca ung dung
router.get('/', (req, res) => {
    // res.json({message: "This is Home Page"});
    res.render('test');
});

module.exports = router;