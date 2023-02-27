const UserScholarship = require('../models/userscholarship');
const Scholarship = require('./../models/scholarship');

module.exports.addScholarships = async (req, res) => {
    try {

        req.body.categories = req.body.categories.split(',');
        const scholarship = new Scholarship(req.body);
    
        await scholarship.save();
    
        res.json(scholarship);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
}

module.exports.getScholarships = async (req, res) => {

    try {

        const query = {};
        if(req.query.name) query.name = new RegExp(req.query.name, 'i');
        if(req.query.category) query.categories = { $in: req.query.category.split(',')};
        if(req.query.branch) query.branch = new RegExp(req.query.branch, 'i');
        if(req.query.course) query.course = new RegExp(req.query.course, 'i');
        if(req.query.income) query.income = {$gte: Number(req.query.income)};
        if(req.query.gender) query.gender = req.query.gender;
        query.deadline = {$gte: new Date().toISOString().substring(0, 10)}; 
            

        const scholarships = await Scholarship.find(query);

        const user = await UserScholarship.findOne({"_id": req.userId});

        if(!user) user = await UserScholarship.create({"_id": req.userId});

        const myScholarships = {
            applied: user.applied_scholarships,
            accepted: user.accepted_scholarships,
            rejected: user.rejected_scholarships,
            saved: user.saved_scholarships
        };

        console.log(user);

        res.status(200).json({
            description: "Scholarships List Fetched!",
            content: scholarships,
            myScholarships
        })
        
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

module.exports.getScholarship = async (req, res) => {

    try {
        const { id } = req.params;

        const scholarship = await Scholarship.findById(id);

        if(!scholarship) {
            res.status(404).found({
                description: "No Scholarship Found With Given ID",
                content: {
                    type: 'Client error',
                    code: 404,
                    path: '/scholarship',
                    message: 'No scholarship found with given ID'
                }
            })
        }

        res.status(200).json({
            description: "Scholarship Found",
            content: scholarship
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