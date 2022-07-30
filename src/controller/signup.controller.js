const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../model/user.model');

router.get("/", async (req, res) => {
    try {
        const signups = await User.find();
        res.status(200).json(signups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post("/",
    [
        body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
        body('phone').isLength({ min: 10 }).withMessage('Phone must be at least 10 characters long'),
        body('email').isEmail().withMessage('Email must be a valid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('pincode').isLength({ min: 6 }).withMessage('Pincode must be at least 6 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { name, phone, email, password, pincode } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const signup = new User({ name, phone, email, password: hashedPassword, pincode });
            await signup.save();
            res.status(201).json(signup);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

module.exports = router;