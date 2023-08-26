const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// API Route: /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// API Route: /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// API Route: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// API Route: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;