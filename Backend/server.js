const express = require('express');
const pageNotFound = require('./middleware/not-found-middleware');
const userRouter = require('./router/userRouter');
const cors = require('cors');
const connectDB = require('./db/connect')
require('dotenv').config();

//model
const Students = require('./model/students')

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/api/v1/delete',async(req,res)=>{
    await Students.deleteMany();
    res.status(200).json({msg: 'delete data successful'})}
    )

app.use('/api/v1',userRouter);


app.use(pageNotFound);

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