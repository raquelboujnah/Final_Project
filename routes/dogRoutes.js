const express = require("express");
const router = express.Router();
const {userRegister, userLogin, updateWallet, getOneFunFact, updatePerf} = require('../controllers/dogControllers.js');
const {verifyAccessToken, verifyRefreshToken} = require('../middlewares/verifyToken.js')

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/wallet', updateWallet);
router.post('/performance', updatePerf);
router.get('/funfacts', getOneFunFact);


module.exports = router;