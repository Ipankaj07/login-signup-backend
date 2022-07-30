const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../model/user.model');

router.post("/",
    [
        body('email').isEmail().withMessage('Email must be a valid email address')
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Please provide correct Email or Password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Please provide correct Email or Password' });
        }

        res.status(200).json({ message: 'Login Successful' });

    });

module.exports = router;

