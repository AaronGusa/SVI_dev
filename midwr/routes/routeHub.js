const indx_r = require('express').Router();

// indx_r.use('/', );

indx_r.use('/services', require('./service'));
indx_r.use('/businesses', require('./business'));
indx_r.use('/reviews', require('./review'));
indx_r.use('/users', require('./user'));


indx_r.use('/', 
  // require('../../front/new.html')
  (docData = (req, res) => {
    
  let docData = {
      "Quick Links": [
      { Swag: 'https://stellavibe.onrender.com/api-docs'},
      { Categories: 'https://stellavibe.onrender.com/services' },
      { Services: 'https://stellavibe.onrender.com/services/services' },
      { Businesses: 'https://stellavibe.onrender.com/businesses' },
      { Reviews: 'https://stellavibe.onrender.com/reviews' },
      { Users: 'https://stellavibe.onrender.com/users' }
      //Contact_JSON: 'https://ag341w05.onrender.com/contacts',
      ]
  };
  res.send(docData);
})
  
)

module.exports = indx_r;