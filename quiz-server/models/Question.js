const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    type: {
        type: String,
        enum: ['MCQ', 'Yes/No', 'Custom Options'],
        default: 'MCQ'
    },
    text: {
        type: String,
        required: true
    },
    options: [String],
    correctAnswer: String
});

module.exports = mongoose.model('Question', questionSchema);
