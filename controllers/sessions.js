const Session = require('./../models/session');
const Mentor = require('./../models/mentor');
const User = require('./../models/user');

module.exports.createSession = async (req, res) => {

    try {
        
        const session = await Session.create(req.body);

        const mentor = await Mentor.findById(req.body.mentor_id);

        mentor.noOfMeetings += 1;

        await mentor.save();

        res.status(200).json({
            description: 'Session created Successfully',
            content: session
        });

    } catch (error) {
        
        res.status(500).json({
            description: 'Session could not be created due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/session',
                message: `Error processing request ${error.message}`
            }
        });

    }

}

module.exports.getSessions = async (req, res) => {

    try {
        
        const query = {};
        if(req.query.mentor_name) query.mentor_name = new RegExp(req.query.mentor_name, 'i');
        if(req.query.mentor_id) query.mentor_id = req.query.mentor_id;
        if(req.query.title) query.title = new RegExp(req.query.title, 'i');
        query.date = {$gte: new Date().toISOString().substring(0, 10)};

        const sessions = await Session.find(query);

        res.status(200).json({
            description: 'Sessions list fetched',
            content: sessions
        })

    } catch (error) {
        
        res.status(500).json({
            description: 'Sessions could not be fetched due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/session',
                message: `Error processing request ${error.message}`
            }
        });

    }

}

module.exports.getSession = async (req, res) => {

    try {
        
        const { id } = req.params;
        
        const session = await Session.findById(id);

        res.status(200).json({
            description: 'Session Fetched Successfully!',
            content: session
        });
        

    } catch (error) {
        
        res.status(500).json({
            description: 'Session could not be fetched due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/session',
                message: `Error processing request ${error.message}`
            }
        });

    }

}

module.exports.registerForSession = async (req, res) => {

    try {
        
        const { _id } = req.body;
        
        const session = await Session.findById(_id);
        session.registered_users.push(req.userId);

        const user = await User.findById(req.userId);
        user.noOfMentors += 1;

        await session.save();
        await user.save();

        res.status(200).json({
            description: 'Registration Successful for the Session',
            content: session
        });


    } catch (error) {
        
        res.status(500).json({
            description: 'Could not register for the session due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/session/register',
                message: `Error processing request ${error.message}`
            }
        });

    }

}