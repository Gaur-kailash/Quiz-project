// quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// Route for fetching all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find({}).populate('questions');
        res.json(quizzes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
// Route for creating a quiz (admin only)
router.post('/create', async(req, res) => {
    const { title, description } = req.body;

    try {
        // Create a new quiz
        const quiz = new Quiz({
            title,
            description
        });

        // Save the quiz to the database
        await quiz.save();

        res.status(201).json(quiz);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for editing a quiz (admin only)
router.put('/:id/edit', async(req, res) => {
    const quizId = req.query.id;
    const questions = await Question.find({quiz:quizId});
    req.body.questions = questions;
    const updatedQuiz = await Quiz.updateOne({_id:quizId},req.body);
    if (updatedQuiz.nModified === 0) {
        return res.status(404).json({ message: 'User not found or no changes applied' });
    }

    res.json({ message: 'User updated successfully' });
});

// Route for deleting a quiz (admin only)
router.delete('/:id/delete', (req, res) => {
    // Implementation for deleting a quiz
});

module.exports = router;
