const router = require('express').Router();
const {login,studentData,getAllStudentData,downloadResumePdf} = require('../controllers/user-controller');
const upload = require('../middleware/upload-middleware');
const {authentication,authorizeRole} = require('../middleware/authentication-middleware');


router.post('/login',login);
router.post('/upload',upload.single('resume'),authentication,authorizeRole("student"),studentData);
router.get('/download/:id',[authentication,authorizeRole("staff")],downloadResumePdf);
router.get('/data',[authentication,authorizeRole("staff")],getAllStudentData);

module.exports = router;