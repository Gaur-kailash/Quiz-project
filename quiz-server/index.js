const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
require('./config/config');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
}

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App backend!');
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quizzes',verifyToken,require('./routes/quizRoutes'));
app.use('/api/questions',verifyToken, require('./routes/questionRoutes'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
