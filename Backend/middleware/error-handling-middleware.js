const {StatusCodes} = require('http-status-codes');

const errorHandlingMiddleware = (err,req,res,next)=>{
  console.log(err);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:  err.message || "something went wrong try again later"
  }
  if(err.name == "ValidationError"){
    customError.msg = Object.values(err.errors).map((error)=>error.message).join(',');
    customError.statusCode = 400
  }
  if(err && err.code == 11000){
    customError.msg = `Duplicate value entered ${Object.keys(err.keyValue)} Enter different value`;
    customError.statusCode = 400
  }
  if(err && err.name == "CastError"){
    customError.msg = `No value find with id: ${err.value}`;
    customError.statusCode = 400
  }
  res.status(customError.statusCode).json({status: "fail",msg: customError.msg});
}

module.exports = errorHandlingMiddleware;