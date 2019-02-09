const mongoose = require('mongoose');
const Visitor = require('./visitor.model');
const Location = require('./location.model');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    visitor: { type: Schema.Types.ObjectId, ref: 'Visitor' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    status: {
        type: String,
        enum: ['pendding', 'completed'],
        default: 'pendding'
    },
}, {
        timestamps: true
    });

module.exports = mongoose.model('appointmentSchema', appointmentSchema);