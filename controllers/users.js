const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const Mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const sendEmail = require("./../utils/email");

const secret = process.env.JWT_SECRET;

module.exports.setProfile = async (req, res) => {

    try {

        let user = req.body;

        const existingUser = await User.findOne({ "email": user.email });
        
        if(existingUser && existingUser.isVerified) return res.status(404).json({ 
            description: "User Already Exists !!!",
            content: {
                type: 'Application Error',
                code: '404',
                path: '/user/profile',
                message: 'User already exists'
            }
         });

         if(existingUser) {
            await User.deleteOne(existingUser);
         }

        user.password = await bcrypt.hash(user.password, 12);

        user = await User.create(user);

        user.password = "";

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1d" });

        try {

            console.log(user.name.split(" ")[0]);

            const message = `
            <html>
            <body>
            
            <p>Hello <strong>${user.name.split(" ")[0]}</strong>,</p>
            <p>Thank you  for signing up for Mentor Connect! We're excited to have you on board.</p> 

            <p>Before you can start using the app, we need to verify your account. To do this, please click on the link below:</p> 
            <p><a href="${process.env.BASE_URL}/user/verify/${token}">www.mentorconnect.com/verifyMyAccount</a><br></p>

            <p>Once you have verified your email, you can start using Mentor Connect to find job opportunities and connect with mentors.</p>

            <p>If you did not sign up for Mentor Connect, you can safely ignore this email.</p>

            <p>Thanks for Joining Mentor Connect! Hope you would get your dream job or scholarship soon !!!</p>
            
            <p>Thanks,<br>
            Mentor Connect</p>
            </body>
            </html>
            `;
            sendEmail(user.email, "Verification Email - Mentor Connect !!!", message);
        } catch (err) {

            console.log(err);

            return res.status(404).json({ 
                description: "Invalid Email !!!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile',
                    message: 'Invalid Email'
                }
             });
        }

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

        // console.log(req.userId);
        const { _id } = req.body;

        if(req.userId !== _id) {
            return res.status(404).json({
                description: "You can update your account only!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile',
                    message: 'You can update your account only'
                }
            })
        }


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

        // console.log(error.code);

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

        const user = await User.findById(req.userId);

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

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // console.log(user);

        if(!user) {
            return res.status(404).json({
                description: "User Does Not Exist !!!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile/login',
                    message: 'User does not exist'
                }
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(404).json({
                description: "Invalid Credentials !!!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile/login',
                    message: 'Invalid credentials'
                }
            });
        }

        if(!user.isVerified) {
            return res.status(404).json({
                description: "Verify Your Account !!!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile/login',
                    message: 'Verify Your Account'
                }
            });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "7d" });

        res.status(200).json({ content: user, token, description: 'Logged in Successfully'});

    } catch (error) {
        res.status(500).json({
            description: 'User could not be logged in due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/user/profile/login',
                message: `Error processing request ${error.message}`
            }
        });
    }

};

module.exports.verifyToken = async (req, res) => {

    const { token } = req.params;

    try {

        let decodedData = jwt.verify(token, secret);

        // console.log(decodedData);

        await User.findByIdAndUpdate(decodedData.id, { isVerified: true });

        return res.status(200).json({ message: "User Successfully Verified !!!" });

    } catch(error) {

        return res.status(500).json({ message: "Invalid Token or Token Expired !!!" });

    }

}