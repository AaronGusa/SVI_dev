const user_r = require('express').Router();
const cntrl = require('../controller/users');
const val = require('../middleVal/user_val')


// USER GETS
user_r.get('/', cntrl.getUsers);
user_r.get('/:id', cntrl.getUser_Id);
user_r.get('/user/:u_id', cntrl.getU_Id);
user_r.get('/ufl/:u_fname/:u_lname', cntrl.getU_Names);
user_r.get('/uname/:u_username', cntrl.getU_Username);

// USER POSTS
user_r.post('/', val.userCategory, cntrl.postUser);

// USER PUTS
user_r.put('/userup/:id', val.userCategory, cntrl.putUser);

// USER DELETE
user_r.delete('/:id', cntrl.deleteUser)

// USER LOGIN
user_r.post('/login', cntrl.loginUser)


module.exports = user_r;