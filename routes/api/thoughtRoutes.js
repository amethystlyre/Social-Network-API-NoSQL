const router = require('express').Router();
const {
  addThought,
  removeThought,
} = require('../../controllers/thoughtController');


// /api/Users/:UserId/thoughts
//router.route('/:UserId/thoughts').post(addThought);

// /api/Users/:UserId/thoughts/:ThoughtId
//router.route('/:UserId/thoughts/:ThoughtId').delete(removeThought);

module.exports = router;