const express = require('express');
const router = express.Router();

//Router dung cho test cac admin
router.post('/', (req, res) => {
    res.json({message: "Xu ly DANG NHAP cho admin"});
});

module.exports = router;