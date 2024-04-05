const router = require('express').Router();
const {login,studentData} = require('../controllers/user-controller');
const upload = require('../middleware/upload-middleware')

router.post('/login',login);
router.post('/upload',upload.single('resume'),studentData);

module.exports = router;