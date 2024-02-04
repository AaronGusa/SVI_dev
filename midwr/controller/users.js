const e = require('express');
const { response } = require('express');
const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const userCountStart = 1000;
const defaultUPriv = 3;
const state = "utah";
const collection = "users";
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

// GETS ============================================================================================

const getUsers = async (req, res, next) => {
    /*
    // #swagger.tags = ['Users']
    // #swagger.description = 'Get all users.'
    */
    try {
        const result = await mongo.getDb().db(state).collection(collection).find().toArray();
        // console.log(result);
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
    } else {
        res.status(400).json({ message: 'Users could not be found. Sorry.' })
    };

    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getUser_Id = async (req, res, next) => {
    /*
    // #swagger.tags = ['Users']
    // #swagger.description = 'Get a user by ObjectId.'
    */
   try {
        const user_id = new ObjectId(req.params.id); 
        const result = await mongo.getDb().db(state).collection(collection).findOne({ "_id": user_id });
        
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(400).json({ message: 'User could not be found. Sorry.' })
        }

   } catch (err) {
        res.status(500).json({ message: 'Internal Failure' });
   }
};

const getU_Id = async (req, res, next) => {
    /*
    // #swagger.tags = ['Users']
    // #swagger.description = 'Get user by user id.'
    */
    

   try {
        const user_id = parseInt(req.params.u_id); 
        
        const result = await mongo.getDb().db(state).collection(collection).findOne({ "u_id": user_id });

        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(400).json({ message: 'User ' + user_id + ' could not be found. Sorry.' })
        }

   } catch (err) {
        res.status(500).json({ message: err });
   }
};

const getU_Names = async (req, res, next) => {
    /*
    // #swagger.tags = ['Users']
    // #swagger.description = 'Get user by user name.'
    */
    
   try {
        const user_fname = req.params.u_fname; 
        const user_lname = req.params.u_lname;
        
        const result = await mongo.getDb().db(state).collection(collection).find({ "u_fname": user_fname, "u_lname": user_lname }).toArray();
        
        //console.log(result.length);
        
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(400).json({ message: 'User ' + user_lname + ', ' + user_fname  + ' could not be found. Sorry.' })
        }

   } catch (err) {
        res.status(500).json({ message: err });
   }
};

const getU_Username = async (req, res, next) => {
    /*
    // #swagger.tags = ['Users']
    // #swagger.description = 'Get user by username.'
    */
    
   try {
        const user_username = req.params.u_username;
        
        const result = await mongo.getDb().db(state).collection(collection).find({ "u_username": user_username }).toArray();
        
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(400).json({ message: user_username  + ' could not be found. Sorry.' })
        }

   } catch (err) {
        res.status(500).json({ message: err });
   }
};

// POSTS =======================================================================================================

const postUser = async (req, res, next) => {
    /*
        #swagger.tags = ['Users']
        #swagger.description = 'Add a user to the DB.'
        #swagger.parameters['New User'] = { 
                in: 'body', 
                '@schema': {
                    "required": ["user"],
                    "properties": {
                        "u_id": {
                            "type": "string",
                            "example": "9999"
                        },
                        "u_phone": {
                            "type": "string",
                            "example": "234-567-8901"
                        },
                        "u_email": {
                            "type": "string",
                            "format": "email",
                            "example": "jane.doe@example.com"
                        },
                        "u_street": {
                            "type": "string",
                            "example": "456 Oak St"
                        },
                        "u_city": {
                            "type": "string",
                            "example": "Anytown"
                        },
                        "u_state": {
                            "type": "string",
                            "example": "Utah"
                        },
                        "u_country": {
                            "type": "string",
                            "example": "USA"
                        },
                        "u_zip": {
                            "type": "string",
                            "example": "12345"
                        },
                        "u_username": {
                            "type": "string",
                            "example": "janedoe"
                        },
                        "u_fname": {
                            "type": "string",
                            "example": "Jane"
                        },
                        "u_lname": {
                            "type": "string",
                            "example": "Doe"
                        },
                        "u_priv": {
                            "type": "integer",
                            "example": 1
                        },
                        "hashedPassword": {
                            "type": "string",
                            "example": "$2b$10$7amvPbc/8kUss3bkoKpFb.E5iC68v34lP5Fe0l7zX2gr/kLEiIq92"
                        }
                    }
                }
            }
    */

    try {
        //Build the u_id
        const userArray = await mongo.getDb().db(state).collection(collection).find().toArray();
        const userCount = userArray.length;
        const userId = userCountStart + userCount + 1;

        console.log('User POST:')
        console.log(req.body);
        //hash the password
        // const hashedPassword = await bcrypt.genSalt(saltRounds, function(err,salt) {
        //     bcrypt.hash(req.body.u_pass, salt, function(err, hash) {
        //         console.log('Hashing ERROR: ', err);
        //         return hash;
        //     } )
        // });

         const hashedPassword = await bcrypt.hashSync(req.body.u_pass, saltRounds);

        console.log(hashedPassword);

        //Get POST info
        const newUser = {
            "u_id": userId,
            "u_phone": req.body.u_phone,
            "u_email": req.body.u_email,
            "u_street": req.body.u_street,
            "u_city": req.body.u_city,
            "u_state": req.body.u_state,
            "u_state": req.body.u_state,
            "u_country": req.body.u_country,
            "u_zip": req.body.u_zip,
            "u_username": req.body.u_username,
            "u_fname": req.body.u_fname,
            "u_lname": req.body.u_lname,
            "u_priv": defaultUPriv,
            "u_pass": hashedPassword
        }

        const u_post_result = await mongo.getDb().db(state).collection(collection).insertOne(newUser);

        if (u_post_result) {
            res.status(200).json(u_post_result);
        } else {
            res.status(400).json(response.error || 'New User was not added. Contact admin.')
        };
    } catch (err) {
        res.status(500).json({message: 'Internal User Server Error'});
    };
};

// PUTS ========================================================================================================

const putUser = async (req, res, next) => {
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Update user by _id. Example _id: 647e47575b7c06e663694215'
     #swagger.parameters['New User'] = { 
                in: 'body', 
                '@schema': {
                    "required": ["user"],
                    "properties": {
                        "u_id": {
                            "type": "integer",
                            "example": "1001"
                        },
                        "u_phone": {
                            "type": "string",
                            "example": "123-456-7890"
                        },
                        "u_email": {
                            "type": "string",
                            "format": "email",
                            "example": "john.doe@example.com"
                        },
                        "u_street": {
                            "type": "string",
                            "example": "123 Main St"
                        },
                        "u_city": {
                            "type": "string",
                            "example": "Towntown"
                        },
                        "u_state": {
                            "type": "string",
                            "example": "Utah"
                        },
                        "u_country": {
                            "type": "string",
                            "example": "USA"
                        },
                        "u_zip": {
                            "type": "string",
                            "example": "12345"
                        },
                        "u_username": {
                            "type": "string",
                            "example": "johndoe"
                        },
                        "u_fname": {
                            "type": "string",
                            "example": "John"
                        },
                        "u_lname": {
                            "type": "string",
                            "example": "Doe"
                        },
                        "u_priv": {
                            "type": "integer",
                            "example": "3" 
                        },
                        "hashedPassword": {
                            "type": "string",
                            "example": "$2b$10$7amvPbc/8kUss3bkoKpFb.E5iC68v34lP5Fe0l7zX2gr/kLEiIq92"
                        }
                    }
                }
            }    
    */

    try {
        const userPut_Id = new ObjectId(req.params.id);

        const foundUser = await mongo.getDb().db(state).collection(collection).findOne({_id: userPut_Id});
        
        if (!foundUser) {
            res.status(400).json({message: 'User not found.'})
        };

        //compare the passwords
        const passwordMatch = await bcrypt.compare(req.body.u_pass, foundUser.hashedPassword);
        if (passwordMatch) {
            matchedHashed = req.body.u_pass;
        } else {
            newHash = await bcrypt.genSalt(saltRounds, function(err,salt) {
                bcrypt.hash(req.body.u_pass, salt, function(err, hash) {
                    console.log(err);
                    return hash;
                } )
            });
        }


        const updatedUser = {
            "u_id": foundUser.u_id,
            "u_phone": req.body.u_phone,
            "u_email": req.body.u_email,
            "u_street": req.body.u_street,
            "u_city": req.body.u_city,
            "u_state": req.body.u_state,
            "u_country": req.body.u_country,
            "u_zip": req.body.u_zip,
            "u_username": req.body.u_username,
            "u_fname": req.body.u_fname,
            "u_lname": req.body.u_lname,
            "u_priv": foundUser.u_priv,
            "hashedPassword": req.body.u_pass
        }

        
        const userPut_result = await mongo.getDb().db(state).collection(collection).updateOne({_id: userPut_Id}, {$set: updatedUser});
        if (userPut_result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(userPut_result);
        } else {
            res.status(404).json({ message: 'Business ' + userPut_Id + ' was not updated!'})
        };

    } catch (err) {
        res.status(500).json({ message: 'Internal User Server Error' });
        console.log(err);
    }
};


// DELETE ======================================================================================================

const deleteUser = async (req, res, next) => {
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Delete user by _id'
    */
    try {
    const userDel_Id = new ObjectId(req.params.id); 

    const user_deleted = await mongo.getDb().db(state).collection(collection).deleteOne({'_id': userDel_Id});

    if (user_deleted.acknowledged) {
        res.status(200).json(user_deleted);
    } else {
        next(user_deleted.error || new Error('We seem to have a problem with your request. USEDEL: ' + userDelete));
    };
    } catch (err) {
    res.status(500).json({ message: 'Internal User Server Error (IUSE USEDEL)' });
    };
};

// VALIDATION ==================================================================================================
const loginUser = async (req, res, next) => {
    try {
        const user_email = req.params.email;
        const user_password = req.params.password;
        
        const result = await mongo.getDb().db(state).collection(collection).find({ "u_email": user_email }).toArray();
        
        if (!result) {
           res.status(400).json({ message: user_email  + ' could not be found. Sorry.' })


            // res.setHeader('Content-Type', 'application/json');
            // res.status(200).json(result);
        } 
        return  bcrypt.compare(user_password, result.hashedPassword);


        




   } catch (err) {
        res.status(500).json({ message: err });
   }




};

module.exports = { 
    getUsers,
    getUser_Id,
    getU_Id,
    getU_Names,
    getU_Username,
    postUser,
    putUser,
    deleteUser,
    loginUser
};