const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    author: {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    questions: [
        {
        }
    ]
});

module.exports = mongoose.model('Quiz', quizSchema);
