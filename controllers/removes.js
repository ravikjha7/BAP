const UserScholarship = require('./../models/userscholarship');
const UserSession = require('./../models/usersession');

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

        user.saved_scholarships = user.saved_scholarships.filter(scholarship => String(scholarship.id) !== String(scholarship_id));

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
                path: '/remove/scholarship',
                message: `Error processing request ${error.message}`
            }
        });

    }

}

module.exports.removeSession = async (req, res) => {

    try {

        const { _id } = req.body;

        let user = await UserSession.findById(req.userId);

        if(!user) {
            res.status(404).json({
                description: "User Never Bookmarked a Session !!!",
                content: {
                    type: 'Client Error',
                    code: '404',
                    message: 'User never bookmarked a Session'
                }
            });
        }

        user.saved_sessions = user.saved_sessions.filter(session => String(session.id) !== String(_id));

        await user.save();

        res.status(200).json({
            description: "Session Removed Successfully",
            content: user
        });

        
    } catch (error) {
        
        res.status(500).json({
            description: 'Internal Server Error',
            content: {
                type: 'System error',
                code: '500',
                path: '/remove/session',
                message: `Error processing request ${error.message}`
            }
        });

    }

}