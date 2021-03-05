const express = require('express');
const router = express.Router();

//Router dung cho test cac admin
router.get('/', (req, res) => {
    res.json({message: "This is Admin page test"});
});

module.exports = router;