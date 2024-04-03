const express = require('express');

const app = express();
const port = 5000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({msg: "everthing working find"})
})

const Start = async() =>{
   app.listen(port,()=>{console.log(`running server on ${port}...`)});
}

Start();