const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const Mongoose = require('mongoose');

module.exports.setProfile = async (req, res) => {

    try {

        let user = req.body;

        const existingUser = await User.findOne({ "email": user.email });
        
        if(existingUser) return res.status(404).json({ 
            description: "User Already Exists !!!",
            content: {
                type: 'Application Error',
                code: '404',
                path: '/user/profile',
                message: 'User already exists'
            }
         });

        user.password = await bcrypt.hash(user.password, 12);

        user = await User.create(user);

        user.password = "";

        res.status(200).json({ content: user, description: 'User profile is created'});

    } catch(error) {

        res.status(500).json({
            description: 'User profile could not be created due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/user/profile',
                message: `Error processing request ${error.message}`
            }
        });

    }
};

module.exports.updateProfile = async (req, res) => {

    try {

        const { _id } = req.body;

        const user = req.body;

        const isUser = await User.findById(_id);

        if(!Mongoose.Types.ObjectId.isValid(_id) || !isUser) return res.status(404).json({
            description: "User profile could not be updated",
            content: {
                type: 'Application Error',
                code: '404',
                path: '/user/profile',
                message: 'User profile could not be updated'
            }
        });

        const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

        res.status(200).json({ content: updatedUser, description: 'User profile is updated'});

    } catch(error) {

        res.status(500).json({
            description: 'User profile could not be updated due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/user/profile',
                message: `Error processing request ${error.message}`
            }
        });

    }
};

module.exports.getProfile = async(req, res) => {
    
    try {

        const { email } = req.params;

        const user = await User.find({ "email": email });

        if(!user) {
            return res.status(404).json({
                description: "User profile could not be retrieved",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile',
                    message: 'User profile could not be retrieved'
                }
            });
        }

        res.status(200).json({ content: user, description: 'User profile is retrieved'});

    } catch (error) {
        
        res.status(500).json({
            description: 'User profile could not be retrieved due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/user/profile',
                message: `Error processing request ${error.message}`
            }
        });

    };
};

module.exports.login = async (req, res) => {

    try {
        
        const { email } = req.params;

        const user = await User.find({ "email": email });

        if(!user) {
            return res.status(404).json({
                description: "Invalid Email",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile',
                    message: 'Invalid Email'
                }
            });
        }

        res.status(200).json({ content: user, description: 'User profile is retrieved'});

    } catch (error) {
        res.status(500).json({
            description: 'User could not be logged in due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/user/profile',
                message: `Error processing request ${error.message}`
            }
        });
    }

}