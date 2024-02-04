const serv_r = require('express').Router();
const cntrl = require('../controller/services');
const val = require('../middleVal/cat_val')

//SERVICE GETS
serv_r.get('/', cntrl.getCategories);
serv_r.get('/category/:id', cntrl.getCategory);
serv_r.get('/catid/:cat_id', cntrl.getCategory_ID);
serv_r.get('/services', cntrl.getServices);
serv_r.get('/service/:id', cntrl.getService);
serv_r.get('/servid/:s_id', cntrl.getService_ID);
serv_r.get('/catserv/:cat_id', cntrl.getCategoryServices)

//SERVICE POSTS
serv_r.post('/newCat', val.valCategory, cntrl.postCategory);
serv_r.post('/newServ', cntrl.postService)

//SERVICE PUTS
serv_r.put('/upserve/:id', cntrl.addService);
serv_r.put('/upcat/:id', cntrl.putCategory);

//SERVICE DELS
serv_r.delete('/:id', cntrl.deleteCategory);
serv_r.delete('/cat/:cat_id/:serviceId', cntrl.deleteService);

module.exports = serv_r;