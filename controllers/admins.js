const User = require('./../models/user');

module.exports.getUsers = async (req, res) => {

    try {

        const users = await User.find({});

        res.json({
            description: "Users list fetched",
            content: users
        });

    } catch(error) {

        res.status(500).json({
            description: 'Users could not be fetchef due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/admin/users',
                message: `Error processing request ${error.message}`
            }
        });

    }

}