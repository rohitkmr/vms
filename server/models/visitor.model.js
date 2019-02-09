const mongoose = require('mongoose');
//const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const VisitorType = require('../constants/VisistorType');

const VisitorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    visitorType: {
        type: String,
        enum: VisitorType
    },
    vehicle: {
        type: Number,
        default: null
    },
    checkIn: {
        type: Date,
        default: Date.now,
    },
    checkOut: {
        type: Date,
        default: null,
    },
    form: {
        type: String,
        default: null,
    },
    visitingCardIssued: {
        type: Boolean,
        default: false,
    },
    visitingPurpose: {
        type: String
    },
    host: {
        type: Object
    },
    department: {
        type: String
    },
    site: {
        type: String
    },
    qrCode: {
        type: String
    }
}, {
    timestamps: true
});


VisitorSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.password;
    }
});

module.exports = mongoose.model('Visitor', VisitorSchema);