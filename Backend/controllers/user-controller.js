const asyncWrapper = require('../middleware/asyncWrapper');
const Students = require('../model/students');
const User = require('../model/user');
const customApiError = require('../errors');
const {generateToken} = require('../utils/jwt')
const fs = require('fs');

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Please provide both email and password.");
    }
    const user = await User.findOne({ email });
    if (!user && (await User.countDocuments() < 2)) {
        const userData = {
            email,
            password,
            role: (await User.countDocuments() === 0) ? "staff" : "student"
        };
        const newUser = await User.create(userData);
        return res.status(200).json({status: "success", msg: "New user created successfully"});
    }
    if (!user) {
        throw new customApiError.NotFoundError("User not registered.");
    }
    if (!(await user.matchPassword(password))) {
        throw new customApiError.UnAuthenticated("Wrong password.");
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.status(200).json({status: "success", msg: 'Login successfully', email: user.email, role: user.role, token });
});

const studentData = asyncWrapper(async(req,res)=>{
    const {filename,path} = req.file || {};
    const {email,name,phone} = req.body || {};
    if(!filename || !path || !email || !name || !phone){
        throw new customApiError.NotFoundError("Please enter valid data");
    }
    const result = await Students.create({email,name,phone,resume: {filename,path},user: req.user.id});
    res.status(200).json({status: "success",msg: "Upload Successfully"});
})

const getAllStudentData = asyncWrapper(async(req,res)=>{
   const studentsInfo = await Students.find({}).select("-user -resume.path").sort({ createdAt: -1 });
   res.status(200).json(studentsInfo);
})

const downloadResumePdf = asyncWrapper(async(req,res)=>{
      const {id} = req.params;
      if(!id){
        throw new customApiError.NotFoundError('Please enter valid data')
      }
      const studentInfo = await Students.findOne({_id: id});
      if(!studentInfo){
        throw new customApiError.NotFoundError('Wrong link download failed')
      }
      const {resume: {path,filename}} = studentInfo;
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', 'application/pdf');
    
      // Stream the file to the response
      const fileStream = fs.createReadStream(path);
      fileStream.pipe(res);
})


module.exports = {login,studentData,getAllStudentData,downloadResumePdf}