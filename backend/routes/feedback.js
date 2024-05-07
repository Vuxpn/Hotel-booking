const express = require('express');
const router = express.Router();

const feedbackController = require('../app/controllers/FeedbackController');


router.get('/:id', feedbackController.getFeedback);
router.post('/', feedbackController.postFeedback);

module.exports = router;
