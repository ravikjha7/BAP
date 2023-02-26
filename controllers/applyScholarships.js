const User = require('./../models/user');
const Scholarship = require('../models/scholarship');
const UserScholarship = require('../models/userscholarship');
const ScholarshipUser = require('./../models/scholarshipuser');

module.exports.applyScholarship = async (req, res) => {

    try {
        
        const { scholarship_id } = req.body;

        const { name, email, why_apply , aadhar_card, caste_certificate='', income_certificate='' } = req.body;

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

        let theUser = await User.findById(req.userId);

        let f1 = scholarship.gender && scholarship.gender !== theUser.gender;
        let f2 = scholarship.categories && !scholarship.categories.includes(theUser.category ? theUser.category : 'open');
        
        if(f1 || f2) {
            res.status(404).json({
                description: "You are not Eligible for the Scholarship !!!",
                content: {
                    type: 'Client Error',
                    code: '404',
                    message: 'You are not eligible for the Scholarship'
                }
            });
        }

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

        scholarship.applied_users += 1;

        await user.save();
        await scholarship.save();

        scholarship = await ScholarshipUser.findOne({ "_id": scholarship_id });

        if(!scholarship) scholarship = await ScholarshipUser.create({"_id": scholarship_id});

        scholarship.applied_users.push({
            id: req.userId,
            name,
            email,
            why_apply,
            aadhar_card,
            income_certificate,
            caste_certificate
        });
        
        theUser.noOfScholarships += 1;
        
        await theUser.save();
        await scholarship.save();

        res.status(200).json({
            description: 'Applied Successfully !!!',
            content: scholarship
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