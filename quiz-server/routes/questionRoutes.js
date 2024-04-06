// questionRoutes.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Route for adding a question to a quiz (admin only)
router.get('/',async(req,res)=>{
    const question = await Question.find({}).populate('quiz');
    res.send(question);
})
router.post('/:quizId/add', async(req, res) => {
    const { quizId } = req.params;
    const { type, text, options, correctAnswer } = req.body;

    try {
        // Create a new question
        const question = new Question({
            quiz: quizId,
            type,
            text,
            options,
            correctAnswer
        });

        // Save the question to the database
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for editing a question (admin only)
router.put('/:quizId/questions/:questionId/edit', (req, res) => {
    // Implementation for editing a question
});

// Route for deleting a question (admin only)
router.delete('/:quizId/questions/:questionId/delete', (req, res) => {
    // Implementation for deleting a question
});

module.exports = router;
