const User = require('./../models/userModel');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Get a user by email and show only their name
exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email}, { name: 1 });

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Update a user by email
exports.updateUserByEmail = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({email: req.params.email}, req.body, {
            new: true,
        });

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Delete a user by email
exports.deleteUserByEmail = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({email: req.params.email});

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Middleware to check if the user's age is 18 or older
exports.checkUserAge = (req, res, next) => {
    var age = req.body.age * 1;

    if (age < 18) {
        return res.status(404).json({
            status: 'fail',
            message: "User must be 18 years old or older!"
        });
    }
    next();
};

// Middleware to check if the user's email already exists
exports.checkUserEmail = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (user) {
        return res.status(404).json({
            status: 'fail',
            message: "User's email already exists!"
        });
    }
    next();
};