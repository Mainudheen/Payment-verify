const express = require("express");
const router = express.Router();

router.get('/test',(req,res)=>{
    res.send('students route working!');
});

module.exports = router;