const UserScholarship = require('./../models/userscholarship');

module.exports.removeScholarship = async (req, res) => {

    try {

        const { scholarship_id } = req.body;

        let user = await UserScholarship.findById(req.userId);

        if(!user) {
            res.status(404).json({
                description: "User Never Bookmarked a Scholarship !!!",
                content: {
                    type: 'Client Error',
                    code: '404',
                    message: 'User never bookmarked a Scholarship'
                }
            });
        }

        user.saved_scholarships = user.saved_scholarships.filter(scholarship => scholarship._id !== scholarship_id);

        await user.save();

        res.status(200).json({
            description: "Scholarship Removed Successfully",
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