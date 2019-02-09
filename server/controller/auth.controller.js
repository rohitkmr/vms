const passport = require('passport');
require('../libs/passport')(passport);
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");
const bcrypt = require('bcrypt-nodejs');


module.exports.auth = function (req, res) {
    User.findOne({
        username: req.body.username,
        isDeleted: false
    })
        .exec(function (err, user) {

            if (err) throw err;

            if (!user) {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign({ data: user }, process.env.TOKEN_SECRET);
                        // return the information including token as JSON 
                        var result = {};
                        result.user = user;
                        result.token = "JWT " + token;
                        res.json({ success: true, result });
                    } else {
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
};