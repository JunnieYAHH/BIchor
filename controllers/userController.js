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

const userCreate = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        // Validation
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already registered'
            });
        }
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const user = new userModel(req.body);
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error: error.message
        });
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
    try {
        // console.log('Request Body:', req.body);
        // console.log('Uploaded File:', req.file);
        const userId = req.body.user;
        const { sex, birthDate, bloodType, yearLevel, course, weight } = req.body;


        if (!req.file || req.file.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        // Handle multiple file uploads
        const avatarData = [];
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'Blood/avatars',
            width: 150,
            crop: "scale"
        })
        avatarData.push({ public_id: result.public_id, url: result.secure_url });

        const newDescription = {
            sex,
            birthDate,
            bloodType,
            avatar: avatarData
        };

        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            $push: { description: newDescription }
        }, { new: true });

        res.status(200).json({ success: true, message: 'User description added successfully', description: updatedUser.description });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        // console.log(users)

        return res.status(200).send({
            success: true,
            data: users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error retrieving users'
        });
    }
}

const getSingleUser = async (req, res) => {
    const userId = req.params._id;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'User found',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let userData = req.body;
        // console.log(req.file);

        if (typeof userData.description === 'string') {
            userData.description = JSON.parse(userData.description);
        }

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'Cleopatra/avatars',
                width: 150, 
                crop: "scale" 
            });

            const avatar = {
                public_id: result.public_id,
                url: result.secure_url
            };

            // console.log(avatar)

            if (userData.description && userData.description.length > 0) {
                userData.description.forEach(desc => {
                    desc.avatar = avatar;
                });
            } else {
                userData.description = [{ avatar }];
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, userData, { new: true });
        // console.log(updatedUser)

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = {
    registerUser, loginUser, currentUser,
    addDescriptionUser, getAllUsers, userCreate,
    getSingleUser, updateUser
};