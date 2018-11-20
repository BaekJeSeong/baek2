const express = require('express');
// const 상수 변수?
const router = express.Router();
//express의 router() 기능이 공유하는거?
const nav = require('./nav');
//이건 뭔가 nav안의 내용을 요청하는 느낌 공유받는 느낌
router.use('/', nav);
// router.use('/', nav);
module.exports = router;
// module.exports = router;