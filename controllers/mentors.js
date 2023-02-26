const Mentor = require('./../models/mentor');

module.exports.addMentor = async (req, res) => {

    try {
        
        const mentor = req.body;

        await Mentor.create(mentor);

        res.status(200).json({
            description: 'Mentor Added Successfully !!!',
            content: mentor
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
    };

};