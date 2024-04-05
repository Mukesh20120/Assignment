const customApiError = require('../errors');
const asyncWrapper = require('./asyncWrapper');
const {isTokenValid} = require('../utils/jwt');

const authentication = asyncWrapper((req,res,next) =>{
const authHeader = req.headers.authorization;
let token;
if(authHeader && authHeader.startsWith('Bearer')){
  token = authHeader.split(' ')[1];
}
if(!token){
    throw new customApiError.UnAuthenticated("token not found")
}
const payload = isTokenValid({token});

if(payload===undefined){
    throw new customApiError.UnAuthenticated("Authentication failed invalid token")
}
req.user = {id: payload.id,role: payload.role};
next();
})

const authorizeRole = (role)=>{
    return (req,res,next)=>{
      if(role!=req.user.role){
        throw new customApiError.UnAuthenticated("Unauthorize");
      }
      next();
    };
}
module.exports = {authentication,authorizeRole};