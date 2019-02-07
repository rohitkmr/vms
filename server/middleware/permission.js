const User = require('../models/user.model');

module.exports = function permission(...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1;
    // return a middleware
    return async (req, res, next) => {
        var user = await User.findById(req.user._id).exec();
        if (req.user && isAllowed(user.role))
            next(); // role is allowed, so continue on the next middleware
        else {
            res.status(403).json({ message: "Forbidden" }); // user is forbidden
        }
    }
}