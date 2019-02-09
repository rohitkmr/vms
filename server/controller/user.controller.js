const passport = require('passport');
require('../libs/passport')(passport);
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");
const bcrypt = require('bcrypt-nodejs');


module.exports.signup = function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new User(req.body);
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: err });
            }
            res.json({ success: true, msg: 'Successful created new user.', data: newUser });
        });
    }
};

// module.exports.signin = function (req, res) {
//     console.log(req.body);
//     User.findOne({
//         username: req.body.username,
//         isDeleted: false
//     })
//         .exec(function (err, user) {

//             if (err) throw err;

//             if (!user) {
//                 res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
//             } else {
//                 // check if password matches
//                 user.comparePassword(req.body.password, function (err, isMatch) {
//                     if (isMatch && !err) {
//                         // if user is found and password is right create a token
//                         var token = jwt.sign({ data: user }, process.env.TOKEN_SECRET);
//                         // return the information including token as JSON 
//                         var result = {};
//                         result.user = user;
//                         result.token = "JWT " + token;
//                         res.json({ success: true, result });
//                     } else {
//                         res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
//                     }
//                 });
//             }
//         });
// };