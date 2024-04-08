// quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// Route for fetching all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find({}).populate('author');
        res.json(quizzes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
// Route for fetching quiz by author ID
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const quizzes = await Quiz.find({author:{['_id']:id}}).populate('author');
        res.json(quizzes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
// Route for creating a quiz (admin only)
router.post('/create', async(req, res) => {
    const { title, description ,author,questions} = req.body;

    try {
        // Create a new quiz
        const quiz = new Quiz({
            title,
            description,
            questions,
            author
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
    const quizId = req.params.id;
    const updatedQuiz = await Quiz.updateOne({_id:quizId},req.body);
    if (updatedQuiz.nModified === 0) {
        return res.status(404).json({ message: 'Quiz not found or no changes applied' });
    }

    res.json({ message: 'Quiz updated successfully' });
});

// Route for deleting a quiz (admin only)
router.delete('/:id/delete', async(req, res) => {
    const quizId = req.params.id ;
const deletedQuiz = await Quiz.deleteOne({_id:quizId});
if(deletedQuiz.deletedCount === 0){
    return res.status(500).json({message:"Not deleted"})
}
res.json({message:"deleted succesfully"})
});

module.exports = router;
