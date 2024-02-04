const validator = require('../routes/helpers/validator');

const valCategory = async (req, res, next) => {
        
    const catValRule = {
        'cat_id': "required|integer",
        'cat': "required|string",
    };


    await validator(req.body, catValRule, {}, (err, status) => {
        if(!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Category Validation Failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err));


}

const valService = async (req, res, next) => {

    const servValRule = {
        's_id': "required|number",
        's_name': "required|string",
        'cat_id': "required|number"
    };

    await validator(req.body, servValRule, {}, (err, status) => {
        if(!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Category Validation Failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err));
}

module.exports = {
    valCategory,
    valService
};