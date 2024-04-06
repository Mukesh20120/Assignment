const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['staff','student'],
        default: 'student'
    }
});

userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

module.exports = mongoose.model('User',userSchema);