const validator = require('../routes/helpers/validator');

const valIncomingBusiness = async (req, res, next) => {
        
    const busValRule = {
        'b_id': "string",
        'b_name': "required|string",
        'b_email': "required|email",
        'b_phone': "required|string",
        'b_website': "string",
        'b_street': "required|string",
        'b_city': "required|string",
        'b_state': "required|string",
        'b_zip': "required|string",
        'b_active': "boolean",
        'b_services': "array",
        'b_discipline': "string",        
        'b_rating': "integer",
        'u_id': "required|integer",
        'created': "required|date",
        'updated': "date",
        'updated': "date"
        };


    await validator(req.body, busValRule, {}, (err, status) => {
        if(!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Business Validation Failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err));

}

module.exports = {
    valIncomingBusiness
};