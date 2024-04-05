const express = require('express');
//error handling middleware
const pageNotFound = require('./middleware/not-found-middleware');
const errorHandling = require("./middleware/error-handling-middleware");
//router
const userRouter = require('./router/userRouter');
//db
const connectDB = require('./db/connect')
//other 
const cors = require('cors');
require('dotenv').config();
//model
const Students = require('./model/students')
const user = require('./model/user')

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/api/v1/delStudent',async(req,res)=>{
    await Students.deleteMany();
    res.status(200).json({msg: 'delete student info successful'})}
    )
app.get('/api/v1/delUser',async(req,res)=>{
    await user.deleteMany();
    res.status(200).json({msg: 'delete users successful'})}
    )

app.use('/api/v1',userRouter);

app.use(pageNotFound);
app.use(errorHandling);

const Start = async() =>{
    try{
     await connectDB(process.env.MONGO_DB);
     console.log('connected to mongodb');
     app.listen(port,()=>{console.log(`running server on ${port}...`,)});
    }catch(error){
        console.log(error);
    }
}

Start();