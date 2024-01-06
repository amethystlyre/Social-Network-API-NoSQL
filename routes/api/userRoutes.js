const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/Users/:UserId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;