const express = require('express');
const router = express.Router();

router.get('/test',(req,res)=>{
    res.send('Payment Route is working');
});

module.exports = router;