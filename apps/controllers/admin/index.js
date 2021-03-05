const express = require('express');
const router = express.Router();
const testadmin = require(__dirname + "/test");


// Dung router o cac phan khac
router.use('/test', testadmin);

//Router dung chung cho tat ca ADMIN
router.get('/', (req, res) => {
    res.json({message: "This is Admin page popular"});
});

module.exports = router;