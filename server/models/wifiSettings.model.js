const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wifiSettingSchema = new Schema({
    sid: { type: String },
    password: { type: Boolean }
}, {
        timestamps: true
    });

module.exports = mongoose.model('wifiSettingSchema', wifiSettingSchema);