const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    employeeNumber: {
        type: String,
        required: true,
        unique: true
    },
    surname: {
        type: String,
        required: true
    },
    otherNames: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    idPhoto: {
        type: String,
        default: ''
    },
    authCode: {
        type: String,
        required: true
    }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
