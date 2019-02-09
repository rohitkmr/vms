/**
 * @api {get} /api/v1/profile 
 * @apiName GetUserProfile
 * @apiGroup User
 * @apiVersion 0.0.1
 * @apiHeader {String} Authorization Json web token
 * @apiPermission 
 *
 * @apiSuccess {String} _id 
 * @apiSuccess {String} username 
 *
 */

/**
 * @api {put} /api/v1/profile
 * @apiName UpdateUserProfile
 * @apiGroup User
 * @apiVersion 0.0.1
 * @apiHeader {String} Authorization Json web token
 * @apiPermission
 *
 * @apiParam {String} gender 
 * @apiParam {String} phone
 *
 * @apiSuccessExample
 *     HTTP/1.1 200 OK
 *
 */

/**
 * @api {put} /api/v1/avatar
 * @apiName UpdateUserAvatar
 * @apiGroup User
 * @apiVersion 0.0.1
 * @apiHeader {String} Authorization Json web token
 * @apiPermission 
 *
 * @apiParam {String} avatar
 *
 * @apiSuccessExample 
 *     HTTP/1.1 200 OK
 *
 *
 */

/**
* Get list of users
* restriction: 'admin'
*/

/**
* Creates a new user
* restriction: 'admin'
*/

/**
* Get a single user
* restriction: 'admin'
*/

/**
* Deletes a user
* restriction: 'admin'
*/

/**
* Change a users password
* restriction: 'admin'
*/

/**
* update user Additional Information
* restriction: 'admin'
*/

module.exports = function (app) {

}