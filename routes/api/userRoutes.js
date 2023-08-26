// Requiring Express and requiring User functions from userController.js
const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
} = require('../../controllers/userController');

// API Route: /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// API Route: /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// API Route: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend);

module.exports = router;