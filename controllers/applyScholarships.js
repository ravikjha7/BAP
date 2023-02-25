const User = require('./../models/user');
const Scholarship = require('../models/scholarship');
const UserScholarship = require('../models/userscholarship');

module.exports.applyScholarship = async (req, res) => {

    try {
        
        const { scholarship_id } = req.body;

        let scholarship = await Scholarship.findById(scholarship_id);

        if(!scholarship) {
            res.status(404).json({
                description: "Scholarship Not Found !!!",
                content: {
                    type: 'Client Error',
                    code: '404',
                    message: 'Scholarship not found'
                }
            });
        };

        let user = await UserScholarship.findOne({"_id": req.userId});

        if(!user) user = await UserScholarship.create({"_id": req.userId});

        user.applied_scholarships.push({
            id: scholarship._id,
            name: scholarship.name,
            amount: scholarship.amount,
            description: scholarship.description
        });

        user.all_scholarships.push({
            id: scholarship._id,
            name: scholarship.name,
            amount: scholarship.amount,
            description: scholarship.description
        });

        scholarship.applied_users.push(user._id);

        await user.save();
        await scholarship.save();

        user = await User.findById(user._id);

        user.noOfScholarships += 1;

        await user.save();

        res.status(200).json({
            description: 'Applied Successfully !!!',
            content: user
        });

    } catch (error) {
        res.status(500).json({
            description: 'Internal Server Error',
            content: {
                type: 'System error',
                code: '500',
                path: '/scholarship',
                message: `Error processing request ${error.message}`
            }
        });
    }

}