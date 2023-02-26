const User = require('./../models/user');
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const Scholarship = require('./../models/scholarship');
const Mentor = require('./../models/mentor');

module.exports.getUsers = async (req, res) => {

    try {

        const users = await User.find({});

        res.json({
            description: "Users list fetched",
            content: users
        });

    } catch(error) {

        res.status(500).json({
            description: 'Users could not be fetchef due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/admin/users',
                message: `Error processing request ${error.message}`
            }
        });

    }

}

module.exports.getScholarships = async (req, res) => {

    try {
        
        let scholarhipsFetched = await Scholarship.find({});

        let scholarships = [];

        scholarhipsFetched.forEach(scholarship => {
            scholarships.push({
                name: scholarship.name,
                description: scholarship.description,
                categories: scholarship.categories,
                _id: scholarship._id,
                gender: scholarship.gender,
                deadline: scholarship.deadline,
                income: scholarship.income,
                amount: scholarship.amount,
                noOfAppliedUsers: scholarship.applied_users.length,
                noOfAcceptedUsers: scholarship.accepted_users.length,
                noOfRejectedUsers: scholarship.rejected_users.length
            });
        });

        res.status(200).json({
            description: "Scholarships fetched Successfully !!!",
            content: scholarships
        });


    } catch (error) {
        
        res.status(500).json({
            description: 'Scholarships could not be fetchef due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/admin/scholarships',
                message: `Error processing request ${error.message}`
            }
        });

    }

}

module.exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;

        if(username !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWD) {
            return res.status(404).json({
                description: 'Login failed due to Invalid Credentials',
                content: {
                    type: 'Client Error',
                    code: '404',
                    path: '/admin/login',
                    message: 'Invalid credentials'
                }
            })
        }

        const token = jwt.sign({ username }, secret, { expiresIn: "1d" });

        res.status(200).json({ token, description: 'Logged in Successfully'});


    } catch (error) {
        res.status(500).json({
            description: "Login Failed due to some unexpected error",
            content: {
                type: 'System Error',
                code: '500',
                path: '/admin/login',
                message: `Error processing request ${error.message}`
            }
        })
    }

}

module.exports.getMentors = async (req, res) => {

    try {
        
        const mentors = await Mentor.find({});

        res.status(200).json({
            description: "Mentors Fetched Successfully!",
            content: mentors
        });

    } catch (error) {
        
        res.status(500).json({
            description: "Mentors could not be fetchef due to some unexpected error",
            content: {
                type: 'System Error',
                code: '500',
                path: '/admin/login',
                message: `Error processing request ${error.message}`
            }
        });

    }

}