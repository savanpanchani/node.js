const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['Employee', 'Manager', 'Admin']

    },
    profileImage: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    mobileNo: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('managers', managerSchema);