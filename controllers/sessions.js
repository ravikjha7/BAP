const Session = require('./../models/session');
const Mentor = require('./../models/mentor');
const User = require('./../models/user');
const UserSession = require('./../models/usersession');
const SessionUser = require('./../models/sessionuser');

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

        let user = await UserSession.findById(req.userId);

        if(!user) user = await UserSession.create({"_id": req.userId});

        const mySessions = {
            applied: user.registered_sessions,
            saved: user.saved_sessions
        };


        res.status(200).json({
            description: 'Sessions list fetched',
            content: sessions,
            mySessions
        });

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
        };

        session.registered_users += 1;

        let user = await User.findById(req.userId);
        user.noOfMentors += 1;

        await session.save();
        await user.save();

        user = await UserSession.findOne({"_id": req.userId});
        
        if(!user) user = await UserSession.create({"_id": req.userId});
        
        user.registered_sessions.push({
            id: session._id,
            title: session.title,
            mentor_name: session.mentor_name,
            date: session.date,
            time: session.time
        });

        await user.save();

        session = await SessionUser.findOne({"_id": _id});
        if(!session) session = await SessionUser.create({"_id": _id});
        session.registered_users.push(req.userId);
        
        await session.save();

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