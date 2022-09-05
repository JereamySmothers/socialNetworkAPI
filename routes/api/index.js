const router = require('express').Router();
const userRoute = require('./user');
const thoughtRoute = require('./thoughts')

router.use('/user', userRoute);
router.use('/thoughts', thoughtRoute);

module.exports = router;