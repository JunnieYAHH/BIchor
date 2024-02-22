const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary');


const registerUser = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        //validation
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User already registered'
            })
        }
        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error
        })
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: `User ${req.body.email} not found`
            })
        }
        //Check Role
        if (user.role !== req.body.role) {
            return res.status(500).send({
                success: false,
                message: `Role Doesn't Match`
            })
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            token,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error
        })
    }
};

const currentUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        return res.status(200).send({
            success: true,
            message: 'User Load Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error Load User',
            error
        })
    }
}

const addDescriptionUser = async (req, res) => {
    const addDescriptionUser = async (req, res) => {
        try {
            // Extract user ID from the request body
            const userId = req.body.user;

            // Extract other description data
            const {
                sex,
                birthDate,
                bloodType,
                yearLevel,
                course,
                weight
            } = req.body;

            // Upload avatar image to Cloudinary and get public_id and url
            const avatarData = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                avatarData.push({ public_id: result.public_id, url: result.secure_url });
            }

            // Construct the new description object
            const newDescription = {
                sex,
                birthDate,
                bloodType,
                year: yearLevel, // Assuming 'yearLevel' corresponds to 'year' in the schema
                course,
                weight,
                avatar: avatarData // Array containing objects with public_id and url
            };

            // Update user with additional details by pushing the new description object into the array
            const updatedUser = await userModel.findByIdAndUpdate(userId, {
                $push: { description: newDescription }
            }, { new: true }); // { new: true } option returns the updated document

            res.status(200).json({ success: true, message: 'User description added successfully', description: updatedUser.description });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };
};



module.exports = { registerUser, loginUser, currentUser, addDescriptionUser }