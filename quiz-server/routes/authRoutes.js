// authRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Route for login (supports both admin and user)
router.post('/login', async (req, res) => {
    const { username, password, userType } = req.body;

    try {
        let user;
        user = await User.findOne({ username,userType });
        

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token ,userType});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
router.post('/register', async (req, res) => {
    const { username, email, password, userType } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({
            username,
            email,
            password,
            userType // Add userType to user document
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
