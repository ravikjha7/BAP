const UserSession = require('./../models/usersession');

module.exports.getMySessions = async(req, res) => {

    try {

        const usersessions = await UserSession.findById(req.userId);

        res.status(200).json({
            description: "Sessions fetched",
            content: usersessions
        });
        
    } catch (error) {
        
        res.status(500).json({
            description: 'Some problem occured while fetching Users sessions',
            content: {
                type: 'System error',
                code: '500',
                path: '/session',
                message: `Error processing request ${error.message}`
            }
        });

    }

}