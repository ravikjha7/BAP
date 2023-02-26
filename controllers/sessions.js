const Session = require('./../models/session');
const Mentor = require('./../models/mentor');

module.exports.createSession = async (req, res) => {

    try {
        
        const session = await Session.create(req.body);

        const mentor = await Mentor.findById(req.body._id);

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