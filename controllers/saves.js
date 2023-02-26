const Scholarship = require('./../models/scholarship');
const UserScholarship = require('./../models/userscholarship');

const Session = require('./../models/session');
const UserSession = require('./../models/usersession');

module.exports.saveScholarship = async(req, res) => {

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
        }

        let user = await UserScholarship.findById(req.userId);

        if(!user) user = await UserScholarship.create({"_id": req.userId});

        user.saved_scholarships.push({
            id: scholarship._id,
            name: scholarship.name,
            amount: scholarship.amount,
            description: scholarship.description
        });

        await user.save();

        res.status(200).json({
            description: 'Scholarship Saved Successfully !!!',
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

module.exports.saveSession = async(req, res) => {

    try {

        const { _id } = req.body;
        
        let session = await Session.findById(_id);

        if(!session) {
            res.status(404).json({
                description: "Session Not Found !!!",
                content: {
                    type: 'Client Error',
                    code: '404',
                    message: 'Session not found'
                }
            });
        }

        let user = await UserSession.findById(req.userId);

        if(!user) user = await UserSession.create({"_id": req.userId});

        user.saved_sessions.push({
            id: session._id,
            title: session.title,
            mentor_name: session.mentor_name,
            date: session.date,
            time: session.time
        });

        await user.save();

        res.status(200).json({
            description: 'Scholarship Saved Successfully !!!',
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