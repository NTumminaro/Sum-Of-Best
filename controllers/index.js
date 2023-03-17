const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const users = require('./userRoutes');

router.use('/', homeRoutes);
router.use('/signup', users);

module.exports = router;
