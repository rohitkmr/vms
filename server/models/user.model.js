const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    plainPassword: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        required: false,
        unique: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        index: true
    },
    role: {
        type: String,
        enum: ['ROLE_ADMIN', 'ROLE_GATEMAN', 'ROLE_PA'],
        default: 'ROLE_ADMIN'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    settings: {
        receiveSMS: {
            type: Boolean,
            default: null,
        },
        receiveEmail: {
            type: Boolean,
            default: null,
        },
    },
    deviceId: {
        type: [String],
        default: null
    }
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.methods.isDeletedUser = function () {
    return this.isDeleted === true;
};

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.password;
    }
});

UserSchema.index({
    phoneNumber: 1,
    name: 1
});
module.exports = mongoose.model('user', UserSchema);