const e = require('express');
const { response } = require('express');
const mongo = require('../db/connect');
// const Obj_Id = require('mongodb').OnjectId;
const state = "utah";
const collection = "reviews";

// GETS =====================================================================================================
/*
TOC
> Get all reviews: getReviews
> Get specific businesses reviews: getBusReviews
> Get reviews for user: getUserReviews
> Get specific review: getReview
*/
const getReviews = async (req, res, next) => {
    /*
    #swagger.tags = ['Reviews']
    #swagger.description = 'Get all reviews'
    */ 
    try {
        const filter = { active_review: true };
        const result = await mongo.getDb().db(state).collection(collection).find(filter).toArray();
        //console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getAllReviews = async (req, res, next) => {
    /*
    #swagger.tags = ['Reviews']
    #swagger.description = 'Get all reviews'
    */ 
    try {
        const result = await mongo.getDb().db(state).collection(collection).find().toArray();
        //console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getBusReviews = async (req, res, next) => {
    /*
    #swagger.tags = ['Reviews']
    #swagger.description = 'Get a specific business's reviews'
    */ 
    try {
        const b_id = req.params.b_id;
        console.log(b_id);

        const result = await mongo.getDb().db('reviews').collection('reviewtest1').find({ "b_id": b_id }).toArray();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: "Looks like there was a bad request. Contact Admins." });
    }
};

// const getUserReviews = async (req, res, next) => {
//     try {
//         const zip = req.body.zip;
//         const u_id = req.body.u_id;
//     } catch (err) {
//         res.status(400).json({message: err});
//     };

// };

// const getReview = async (req, res, next) => {
//     try {
//         const reviewZip = req.body.zip;
//     } catch (err) {
//         res.status(400).json({message: err});

//     };

// };

// POSTS ====================================================================================================
const postBusReview = async (req, res, next) => {
    /*
    #swagger.tags = ['Reviews']
    #swagger.description = 'Post new review'
    #swagger.method = 'post'
    #swagger.parameters['New Review'] = {
        in: 'body',
        '@schema': {
            "required": ['review'],
            "properties": {
                "b_id": {
                    "type": "string",
                    "example": "23-0007"
                },
                "r_id": {
                    "type": "integer",
                    "example": "99999"
                },
                "u_id": {
                    "type": "integer",
                    "example": "1005"
                },
                "cat_id": {
                    "type": "string",
                    "example": "003"
                },
                "s_id": {
                    "type": "string",
                    "example": "003-001"
                },
                "revDate": {
                    "type": "date",
                    "example": "2023-05-21T09:15:00.000Z"
                },
                "rating": {
                    "type": "integer",
                    "example": "4"
                },
                "rev_content": {
                    "type": "string",
                    "example": "Great job! I would definitely come back!"
                },
                "active_review": {
                    "type": "boolean",
                    "example": "true"
                }
            }
        }
    }
    */ 

    try {
        // Get Review Count and get number
        const reviews = await mongo.getDb().db(state).collection(collection).find().toArray();
        const revCount = reviews.length + 1;
        // Get ISODate
        const revDate = new Date().toISOString();

        //build review
        const newRev = {
            "b_id": req.body.b_id,
            "r_id": revCount,
            "u_id": req.body.u_id,
            "cat_id": req.body.cat_id,
            "s_id": req.body.s_id,
            "revDate": revDate,
            "rating": req.body.rating,
            "rev_content": req.body.rev_content,
            "active_review": true
        }

        const result = await mongo.getDb().db(state).collection(collection).insertOne(newRev);
        res.status(200).json(result);
        console.log(result);
    } catch (err) {
        res.status(400).json({ message: err });
    };
};

// PUTS ====================================================================
const putBusReview = async (req, res, next) => {
    /*
    #swagger.tags = ['Reviews']
    #swagger.description = 'Update new review'
    #swagger.method = 'put'
    #swagger.parameters['Update Review'] = {
        in: 'body',
        '@schema': {
            "required": ['review'],
            "properties": {
                "b_id": {
                    "type": "string",
                    "example": "23-0007"
                },
                "u_id": {
                    "type": "integer",
                    "example": "1005"
                },
                "cat_id": {
                    "type": "string",
                    "example": "003"
                },
                "s_id": {
                    "type": "string",
                    "example": "003-001"
                },
                "revDate": {
                    "type": "date",
                    "example": "2023-05-21T09:15:00.000Z"
                },
                "rating": {
                    "type": "integer",
                    "example": "4"
                },
                "rev_content": {
                    "type": "string",
                    "example": "Great job! I would definitely come back!"
                },
                "active_review": {
                    "type": "boolean",
                    "example": "true"
                }
            }
        }
    }
    */ 

    try {
        // Find review id
        const reviewId =  parseInt(req.params.r_id, 10);
        console.log(reviewId);

        const rev_id = await mongo.getDb().db(state).collection(collection).findOne({ r_id: reviewId });
        console.log(rev_id);

        // Error handling if no review found
        if (!rev_id) {
            return res.status(404).json({ message: 'Review could not be found!' });
        }

        const r_id = rev_id.r_id;
        console.log(typeof r_id);

        // Get ISODate
        const revUpdate = new Date().toISOString();

        // Build review
        const upRev = {
            "b_id": req.body.b_id,
            "r_id": r_id,
            "u_id": req.body.u_id,
            "cat_id": req.body.cat_id,
            "s_id": req.body.s_id,
            "revDate": req.body.revDate,
            "revUpdate": revUpdate,
            "rating": req.body.rating,
            "rev_content": req.body.rev_content,
            "active_review": req.body.active_review
        };
        console.log(upRev);

        const filter = { r_id: reviewId }; // Update criteria: find the document with the specified r_id
        const update = { $set: upRev }; // Update operation: update the document with the values in upRev

        const result = await mongo.getDb().db(state).collection(collection).updateOne(filter, update);

    if (result.modifiedCount === 1) {
        return res.status(200).json(result.ops[0]);
    } else {
        return res.status(404).json({ message: 'Review not found or update had no effect.' });
    }
} catch (err) {
    // Log the error for debugging purposes
    console.error(err);

    // Return a robust error response
    return res.status(500).json({
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred. Please try again later.',
            details: err.message // Include the error message or additional context, if available
        }
    })
}};

// DELETE ==================================================================
const deleteReview = async (req, res, next) => {
    //To retain records this will toggle the review to be inactive,
    //This is not a delete function but a PUT
    /*
        #swagger.tags = ["Reviews"]
        #swagger.method = 'put'
        
        }
    
    */

    try {
        // Find review id
        const reviewId =  parseInt(req.params.r_id, 10);
        //console.log(reviewId);

        const rev_id = await mongo.getDb().db(state).collection(collection).findOne({ r_id: reviewId });
        
        // Error handling if no review found
        if (!rev_id) {
        return res.status(404).json({ message: 'Review could not be found!' });
        }

        const r_id = rev_id.r_id;
        //console.log(typeof r_id);

        // Get ISODate
        const revDelDate = new Date().toISOString();

        // Build review
        const delRev = {
        "b_id": rev_id.b_id,
        "r_id": r_id,
        "u_id": rev_id.u_id,
        "cat_id": rev_id.cat_id,
        "s_id": rev_id.s_id,
        "revDate": rev_id.revDate,
        "revUpdate": rev_id.revUpdate,
        "deleteDate": revDelDate,
        "rating": rev_id.rating,
        "rev_content": rev_id.rev_content,
        "active_review": false
        };
        //onsole.log(delRev);

        const filter = { r_id: reviewId }; // Update criteria: find the document with the specified r_id
        const update = { $set: delRev }; // Update operation: update the document with the values in delRev 

        const result = await mongo.getDb().db(state).collection(collection).updateOne(filter, update);

        if (result.modifiedCount === 1) {
            return res.status(200).json({ message: 'Review deleted successfully.' });
        } else {
            return res.status(404).json({ message: 'Review not found or update had no effect.' });
        };

    } catch (err) {
        // Log the error for debugging purposes
        //console.error(err);

        // Return a robust error response
        return res.status(500).json({
            error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred. Please try again later.',
            details: err.message // Include the error message or additional context, if available
            }
        });
    };
};

// RESTORE =================================================================
const restoreReview = async (req, res, next) => {
    //To retain records this will toggle the review to be inactive,
    //This is not a delete function but a PUT
    /*
        #swagger.tags = ["Reviews"]
        #swagger.method = 'put'
        
        }
    
    */

    try {
        // Find review id
        const reviewId =  parseInt(req.params.r_id, 10);
        //console.log(reviewId);

        const rev_id = await mongo.getDb().db(state).collection(collection).findOne({ r_id: reviewId });

        // Error handling if no review found
        if (!rev_id) {
        return res.status(404).json({ message: 'Review could not be found!' });
        }

        const r_id = rev_id.r_id;
        console.log(typeof r_id);

        // Get ISODate
        const revResDate = new Date().toISOString();

        // Build review
        const resRev = {
        "b_id": rev_id.b_id,
        "r_id": r_id,
        "u_id": rev_id.u_id,
        "cat_id": rev_id.cat_id,
        "s_id": rev_id.s_id,
        "revDate": rev_id.revDate,
        "revUpdate": rev_id.revUpdate,
        "deleteDate": revResDate,
        "rating": rev_id.rating,
        "rev_content": rev_id.rev_content,
        "active_review": true
        };
        console.log(resRev);

        const filter = { r_id: reviewId }; // Update criteria: find the document with the specified r_id
        const update = { $set: resRev }; // Update operation: update the document with the values in resRev 

        const result = await mongo.getDb().db(state).collection(collection).updateOne(filter, update);

        if (result.modifiedCount === 1) {
            return res.status(200).json({ message: 'Review restored successfully.' });
        } else {
            return res.status(404).json({ message: 'Review not found or update had no effect.' });
        };

    } catch (err) {
        // Log the error for debugging purposes
        console.error(err);

        // Return a robust error response
        return res.status(500).json({
            error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred. Please try again later.',
            details: err.message // Include the error message or additional context, if available
            }
        });
    };
};


module.exports = { 
    getReviews
    , getAllReviews
    , getBusReviews
    , postBusReview
    , putBusReview
    , deleteReview
    , restoreReview
};