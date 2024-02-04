const bus_r = require('express').Router();
const cntrl = require('../controller/bus_data');
const val = require('../middleVal/bus_val')


// BUSINESS GET ROUTES
bus_r.get('/', cntrl.getBusinessess);
bus_r.get('/zip/:zip', cntrl.getBusinessess_zip);
bus_r.get('/buso/:oid', cntrl.getBusiness_ID);
bus_r.get('/bus/:bus_id', cntrl.getBusiness_Bus_ID);

// BUSINESS POST - VALIDATE
bus_r.post('/', 
        val.valIncomingBusiness, 
        cntrl.postBusiness);

// BUSINESS PUTS
bus_r.put('/:id', cntrl.putBusiness);

// BUSINESS DELETE
bus_r.delete('/:id', cntrl.deleteBusiness);

module.exports = bus_r;