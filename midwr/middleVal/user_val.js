const validator = require('../routes/helpers/validator');

const userCategory = async (req, res, next) => {
        
    const userValRule = {
        "u_id": "integer",
        "u_phone": "required|string",
        "u_email": "required|email",
        "u_street": "required|string",
        "u_city": "required|string",
        "u_state": "required|string",
        "u_country": "required|string",
        "u_zip": "required|string",
        "u_username": "required|string",
        "u_fname": "required|string",
        "u_lname": "required|string",
        "u_priv": "integer",
        "u_pass": "required|string"
    };


    await validator(req.body, userValRule, {}, (err, status) => {
        if(!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'User Category Validation Failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err));


}


module.exports = {
    userCategory
};