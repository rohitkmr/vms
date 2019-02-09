
const User = require('../../models/user.model');
const responsehandler = require('../../helpers/responseHandler');
function test() {
    return true;
}

/**
 * Create New User With User Information
 * /createUser
 * @method {POST}
 * @param {*} req 
 * @param {*} res 
 */
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({ "msg": "success", "data": result });
    } catch (error) {
        res.status().json({ "msg": "error", "data": error });
    }
};

/**
 * Get List Of Users
 * /getUsers
 * @method {GET}
 * @param {*} req
 * @param {*} res
 */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).exec();
        res.status(200).json({ "msg": "success", "data": users });
    } catch (error) {
        res.status(500).json({ "msg": "error", "data": error })
    }
};

/**
 * Get User By UserName
 * /getUser/:username
 * @param {*} req 
 * @param {*} res 
 * 
 */
exports.getUser = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.find({ username: username }).exec();
        res.status(200).json({ "msg": "success", "data": user });
    } catch (error) {
        res.status(500).json({ "msg": "error", "data": errpr })
    }
};

/**
 * Update User By Username
 * /updateUser/:username
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUser = async (req, res) => {
    let username = req.params.username;
    try {
        const user = await User.findByIdAndUpdate({
            username: username
        },
            req.body,
            { upsert: true }
        ).exec();

        res.status(200).json({ "msg": "success", "data": user });
    } catch (error) {
        res.status(500).json({ "msg": "error", "data": error });
    }
};

/**
 * Remove User by username
 * /deleteUser/:username
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteUser = async (req, res) => {
    let username = req.params.username;
    await User.findOneAndRemove({ username: username })
        .then((user) => {
            res.status(200).json({ "msg": "success", "data": user });
        })
        .catch((error) => {
            res.status(500).json({ "msg": "error", "data": error });
        });
};

/**
 * Disable a user by Username
 * /disableUser/:username
 * @param {*} req 
 * @param {*} res 
 */
exports.disableUser = async (req, res) => {
    await test();
}

/**
 * Change User Password by username
 * /changePassword/:username
 * @param {*} req 
 * @param {*} res 
 */
exports.changePassword = async (req, res) => {
    await test();
};

/**
 * Assign a Role to User
 * /assignRole/:username
 * @param {*} req 
 * @param {*} res 
 */
exports.assignRole = async (req, res) => {
    await test();
};

/**
 * Assign Location to user
 * /assignLocation/:username
 * @param {*} req 
 * @param {*} res 
 */
exports.assignLocation = async (req, res) => {
    await test();
};