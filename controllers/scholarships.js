const Scholarship = require('./../models/scholarship');

module.exports.addScholarships = async (req, res) => {
    try {
        const scholarship = new Scholarship({
          name: req.body.name,
          course: req.body.course,
          branch: req.body.branch,
          category: req.body.category,
          gender: req.body.gender,
          income: req.body.income,
          deadline: req.body.deadline,
          amount: req.body.amount
        });
    
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
        if(req.query.category) query.category = new RegExp(req.query.category, 'i');
        if(req.query.branch) query.branch = new RegExp(req.query.branch, 'i');
        if(req.query.course) query.course = new RegExp(req.query.course, 'i');
        if(req.query.income) query.income = {$lte: parseInt(req.query.income)};
        if(req.query.gender) query.gender = req.query.gender;

        const scholarships = await Scholarship.find(query);

        res.status(200).json({
            description: "Scholarships List Fetched!",
            content: scholarships
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
        })
    }

}