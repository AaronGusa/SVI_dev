const e = require('express');
const { response } = require('express');
const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const state = "utah";
const collection = "businesses";

// BUSINESSES GETS
const getBusinessess = async (req, res, next) => {
    /* 
    #swagger.tags = ['Businesses']
    #swagger.description = "Get all businesses"

    */
    try {
        const result = await mongo.getDb().db(state).collection(collection).find().toArray();
        //console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// BUSINESSES GETS BY ZIP
const getBusinessess_zip = async (req, res, next) => {
    /* 
    #swagger.tags = ['Businesses']
    #swagger.description = "Get all businesses"

    */
    try {
        const zip_search = req.params.zip;
        const result = await mongo.getDb().db(state).collection(collection).find({"b_zip": zip_search}).toArray();
        // console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getBusiness_ID = async (req, res, next) => {
    /* 
    #swagger.tags = ['Businesses']
    #swagger.description = "Get Business by _ID"

    */
    try {
        const o_Id = new ObjectId(req.params.oid);
        //console.log(typeof b_Id);
        const result = await mongo.getDb().db(state).collection(collection).findOne({ "_id": o_Id });

        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({message: 'Business could not be found using ID: ' + b_Id});
        };
    } catch (err) {
        res.status(400).json( { message: err });
    };

};

const getBusiness_Bus_ID = async (req, res, next) => {
     /* 
    #swagger.tags = ['Businesses']
    #swagger.description = "Get Business by Business ID"

    */
    try {
        const bus_Id = req.params.bus_id;
       // console.log(state);
        const result = await mongo.getDb().db(state).collection(collection).findOne({ "b_id": bus_Id });
       // console.log(result);
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({message: 'Business could not be found using Business ID: ' + b_Id});
        };
    } catch (err) {
        console.log('We entered error territory');
        res.status(400).json( { message: "Business NOT FOUND!"});
    };

};

// BUSINESS POST
const postBusiness = async (req, res, next) => {
        // #swagger.tags = ['Businesses']
        // #swagger.description = "Create a new business"
        // #swagger.method = 'post'
        /* #swagger.parameters['New Business'] = { 
                in: 'body', 
                '@schema': { 
                    "required": ["business"], 
                    "properties": {
                            "b_id": {
                                "type": "string",
                                "example": "23-0007"
                            },
                            "b_name": {
                                "type": "string",
                                "example": "TEST BUSINESS"
                            },
                            "b_discipline": {
                                "type": "string",
                                "example": "TEST DISCIPLINE"
                            },
                            "u_id": {
                                "type": "integer",
                                "example": 1009
                            },
                            "b_street": {
                                "type": "string",
                                "example": "9999 S 9999 W"
                            },
                            "b_city": {
                                "type": "string",
                                "example": "Salt Lake City"
                            },
                            "b_state": {
                                "type": "string",
                                "example": "UT"
                            },
                            "b_zip": {
                                "type": "string",
                                "example": "99999"
                            },
                            "b_phone": {
                                "type": "string",
                                "example": "555-555-5555"
                            },
                            "b_email": {
                                "type": "string",
                                "format": "email",
                                "example": "test@testMail.com"
                            },
                            "b_website": {
                                "type": "string",
                                "example": "www.TEST.test"
                            },
                            "b_rating": {
                                "type": "number",
                                "example": 2.5
                            },
                            "b_active": {
                                "type": "boolean",
                                "example": true
                            },
                            "b_services": {
                                "type": "array",
                                "example": [
                                    1, 2, 3
                                ]
                            },
                            "created": {
                                "type": "date",
                                "example": "2023-07-26T12:34:56.789Z"
                            },
                            "updated": {
                                type: "date",
                                "example": "2023-07-26T14:34:56.789Z"
                                
                            }
                        
                        }
                    } 
            } */    
    
        try {
        // Create ISODATE   
            const createISODate = new Date().toISOString();
           // console.log(createISODate);

        // Build Business ID number
            // Get last two digits from year for Bus_ID Part 1
            const bus_id_P1 = new Date().getFullYear() % 100;
            //console.log(bus_id_P1);
            
            // Build Bus_ID Part 2
            const businesses = await mongo.getDb().db(state).collection(collection).find().toArray();
            const busCount = businesses.length + 1;
            let bus_id_P2 = busCount;
            
            if ( busCount < 10 ) {
                bus_id_P2 = "000" + busCount.toString();
            } else if ( 10 <= busCount < 100 ) {
                bus_id_P2 = "00" + busCount.toString();
            } else if ( 100 <= busCount < 1000 ) {
                bus_id_P2 = "0" + busCount.toString();
            } else if (1000 <= busCount < 10000 ) {
                bus_id_P2 = busCount;
            } else {
                res.status(500).json({message: 'BIDs have reached their max. Contact Administrator.'});
            };
        
        // Compile P1 and P2
            const builtId = bus_id_P1.toString() + "-" + bus_id_P2;

            //console.log(builtId);

            const newBusiness = {
                    "b_id": builtId,
                    "b_name": req.body.b_name,
                    "b_discipline": req.body.b_discipline,
                    "b_street": req.body.b_street,
                    "b_city": req.body.b_city,
                    "b_state": req.body.b_state,
                    "b_zip": req.body.b_zip,
                    "b_phone": req.body.b_phone,
                    "b_email": req.body.b_email,
                    "b_website": req.body.b_website,
                    "b_services": req.body.b_services,
                    "b_rating": req.body.b_rating,
                    "b_active": req.body.b_active,
                    "u_id": req.body.u_id,
                    "created": createISODate
                }

            const result = await mongo.getDb().db(state).collection(collection).insertOne(newBusiness);
           // console.log(result);
                
            
            if (result.acknowledged) {
                res.status(200).json(result);
            } else {
                res.status(404).json(response.error || 'We seem to have a problem with your business submission.')
            };
        } catch (err) {
            res.status(500).json({message: 'Internal Business Server Error'});
        }
    
    
} 

//BUSINESSES PUTS
const putBusiness = async (req, res, next) => {
    /*
    #swagger.tags = ["Businesses"]
    #swagger.parameters['New Business'] = { 
                in: 'body', 
                '@schema': { 
                    "required": ["business"], 
                    "properties": {
                            "b_id": {
                                "type": "string",
                                "example": "23-0007"
                            },
                            "b_name": {
                                "type": "string",
                                "example": "TEST BUSINESS"
                            },
                            "b_discipline": {
                                "type": "string",
                                "example": "TEST DISCIPLINE"
                            },
                            "u_id": {
                                "type": "integer",
                                "example": 1009
                            },
                            "b_street": {
                                "type": "string",
                                "example": "9999 S 9999 W"
                            },
                            "b_city": {
                                "type": "string",
                                "example": "Salt Lake City"
                            },
                            "b_state": {
                                "type": "string",
                                "example": "UT"
                            },
                            "b_zip": {
                                "type": "string",
                                "example": "99999"
                            },
                            "b_phone": {
                                "type": "string",
                                "example": "555-555-5555"
                            },
                            "b_email": {
                                "type": "string",
                                "format": "email",
                                "example": "test@testMail.com"
                            },
                            "b_website": {
                                "type": "string",
                                "example": "www.TEST.test"
                            },
                            "b_rating": {
                                "type": "number",
                                "example": 2.5
                            },
                            "b_active": {
                                "type": "boolean",
                                "example": true
                            },
                            "b_services": {
                                "type": "array",
                                "example": [
                                    1, 2, 3
                                ]
                            },
                            "created": {
                                "type": "date",
                                "example": "2023-07-26T12:34:56.789Z"
                            },
                            "updated": {
                                type: "date"
                            }
                        
                        }
                    }        
            }
    */
   try {
        const isoDate = new Date().toISOString();
        //console.log(isoDate);
    
        const bus_Id = new ObjectId(req.params.id);
        
        const findBusiness = await mongo.getDb().db(state).collection(collection).findOne({_id: bus_Id});

        if (!findBusiness) {
            res.status(404).json({message: 'Business not found!'});
        };

        const updatedBusiness = {
            bus_id: req.body.bus_id,
            bus_name: req.body.bus_name,
            discipline: req.body.discipline,
            addressPers: req.body.addressPers,
            addressBus: req.body.addressBus,
            phone: req.body.phone,
            email: req.body.email,
            website: req.body.website,
            rating: req.body.rating,
            active: req.body.active,
            created: findBusiness.created,
            updated: isoDate
        }

        const updated = await mongo.getDb().db(state).collection(collection).updateOne({_id: bus_Id}, {$set: updatedBusiness});

        if (updated) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: 'Business ' + bus_Id + ' was not updated!'})
        };

   } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
   }
}

const deleteBusiness = async (req, res, next) => {
    /*
    #swagger.tags = ["Businesses"]
    */
    try {
        const bus_id = new ObjectId(req.params.id);

        const deleted = await mongo.getDb().db(state).collection(collection).deleteOne(bus_id);

        if (deleted.acknowledged) {
            res.status(200).json(deleted);
        } else {
            next(result.error || new Error('We seem to have a problem with your request. BUSDEL' + bus_id));
        };
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    };
}


module.exports = { getBusinessess,
                   getBusinessess_zip,
                   getBusiness_ID,
                   getBusiness_Bus_ID,
                   postBusiness,
                   putBusiness,
                   deleteBusiness
                 };