const rev_r = require('express').Router();
const cntrl = require('../controller/reviews');

rev_r.get('/', cntrl.getReviews);
rev_r.get('/all', cntrl.getAllReviews);
rev_r.get('/id/:b_id', cntrl.getBusReviews);

rev_r.post('/newrev', cntrl.postBusReview);

rev_r.put('/putrev/:r_id', cntrl.putBusReview);
rev_r.put('/delete/:r_id', cntrl.deleteReview);
rev_r.put('/restore/:r_id', cntrl.restoreReview);

module.exports = rev_r;