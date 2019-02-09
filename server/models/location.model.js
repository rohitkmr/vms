const mongoose = require('mongoose');
const User = require('./user.model');
const Schema = mongoose.Schema;

const locationSchema = new Schema({

    name: { type: String, required: true },
    site: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    visitingPassRequired: { type: Boolean, default: true }
}, {
        timestamps: true
    });


module.exports = mongoose.model('location', locationSchema);