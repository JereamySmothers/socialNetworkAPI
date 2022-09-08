const router = require('express').Router();

const {

    getOneThought,
    getThoughts,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,

} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought)
router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought)
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)

module.exports = router;