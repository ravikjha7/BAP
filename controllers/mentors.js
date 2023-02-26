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
                path: '/mentor/add',
                message: `Error processing request ${error.message}`
            }
        });
    };

};

module.exports.getMentors = async (req, res) => {
    try {
        
        const query = {};
        if(req.query.name) query.name = new RegExp(req.query.name, 'i');

        const mentors = await Mentor.find(query);

        res.status(200).json({
            description: "Mentors Fetched Successfully!",
            content: mentors
        });

    } catch (error) {
        res.status(500).json({
            description: 'Internal Server Error',
            content: {
                type: 'System error',
                code: '500',
                path: '/mentor',
                message: `Error processing request ${error.message}`
            }
        });
    }
}

module.exports.getMentor = async (req, res) => {

    try {
        
        const { id } = req.params;

        const mentor = await Mentor.findById(id);

        res.status(200).json({
            description: 'Mentor fetched successfully',
            content: mentor
        });

    } catch (error) {
        
        res.status(500).json({
            description: 'Fetching mentor failed due to some unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/mentor',
                message: `Error processing request ${error.message}`
            }
        });

    }    


}