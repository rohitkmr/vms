const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitingPassSettingSchema = new Schema({
    nameEnable: { type: Boolean, default: true },
    inTime: { type: Boolean, default: true },
    image: { type: Boolean, default: true },
    qrcode: { type: Boolean, default: true },
    logo: { type: String },
    wifiInfo: { type: String, default: false }
}, {
        timestamps: true
    });

module.exports = mongoose.model('visitingPassSettingSchema', visitingPassSettingSchema);