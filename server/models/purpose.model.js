const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purposeSchema = new Schema({

    name: { type: String, required: true },
    site: { type: String }
}, {
        timestamps: true
    });


module.exports = mongoose.model('location', purposeSchema);