const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    phone: {
        type: Number,
        // required: true
    },
    resume: {
        filename: {
            type: String,
            // required: true
        },
        path: {
            type: String,
            // required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model("Students", studentSchema);
