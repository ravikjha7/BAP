const UserScholarship = require('./../models/userscholarship');

module.exports.getMyScholarships = async(req, res) => {

    try {

        const userscholarships = await UserScholarship.findById(req.userId);

        res.status(200).json({
            description: "Scholarships fetched",
            content: userscholarships
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