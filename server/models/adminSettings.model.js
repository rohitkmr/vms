const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSettingSchema = new Schema({
    blockVisitor: { type: Boolean },
    blockVehicle: { type: Boolean },
    exportData: { type: Boolean }
}, {
        timestamps: true
    });

module.exports = mongoose.model('adminSettingSchema', adminSettingSchema);