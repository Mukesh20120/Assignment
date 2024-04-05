const jwt = require('jsonwebtoken');
require('dotenv').config();
//payload have _id and role
const generateToken = (payload) => {
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '30d'});
    return token;
}
const isTokenValid = ({token}) => {
    return jwt.verify(token,process.env.JWT_SECRET);
}
module.exports = {generateToken,isTokenValid};