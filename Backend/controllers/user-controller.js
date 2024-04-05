const asyncWrapper = require('../middleware/asyncWrapper');
const Students = require('../model/students');

const login = asyncWrapper((req,res) => {
   res.status(200).json(req.body)
})

const studentData = asyncWrapper(async(req,res)=>{
    const {filename,path} = req.file;
    const {email,name,phone} = req.body;
    const resp = await Students.create({email,name,phone,resume: {filename,path}});
    res.status(200).json({msg: "success",resp});
})


module.exports = {login,studentData}