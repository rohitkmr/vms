var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../libs/passport')(passport);
const userController = require('../controller/user.controller');
const hasRole = require('../middleware/hasRole');
const requireAuth = passport.authenticate('jwt', {
    session: false
});

/**
 * @api {post} /signup Signup
 * @apiDescription To Register New user
 * @apiGroup User
 * @apiPermission SuperAdmin(0)/SiteAdminAdmin(1)
 * @apiParam none
 * @apiSuccess {Object} User Object
 */
router.post('/signup', requireAuth, hasRole("ROLE_ADMIN"), userController.signup);
/**
 * @api {post} /signin Signin
 * @apiDescription To looged in into system
 * @apiPermission none
 * @apiGroup User
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiSuccess {Object} User Object
 */
router.post('/signin', userController.signin);

module.exports = router