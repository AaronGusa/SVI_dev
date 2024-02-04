const e = require('express');
const { response } = require('express');
const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const servicesDB = "services";
const serv = "services";
const cat = "categories";

// SERVICE GETS
const getCategories = async (req, res, next) => {
  // #swagger.tags = ['Service Categories']
  // #swagger.description = 'Get all Categories ordered by category ids' 
  try {
      const cat_result = await mongo.getDb().db(servicesDB).collection(cat).find().toArray();
      //const categories = await result.toArray();
          
      if (cat_result.length === 0) {
        res.status(404).json({ message: 'No services found' });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cat_result);
      }
  } catch (err) {
      res.status(500).json({ message: 'Internal server error: : CAT_GET001' });
  }
};

const getCategory = async (req, res, next) => {
    // #swagger.tags = ['Service Categories']
    // #swagger.description = 'Get category by Object id'
    try {
        const id = new ObjectId(req.params.id);
        const result = await mongo
            .getDb()
            .db(servicesDB)
            .collection(cat)
            .findOne({ "_id": id });

        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCategory_ID = async (req, res, next) => {
  // #swagger.tags = ['Service Categories']
  // #swagger.description = 'Get category by category ids'
  try {
      const cat_id = parseInt(req.params.cat_id);
      
      const result = await mongo.getDb().db(servicesDB).collection(cat).findOne({ "cat_id": cat_id });
      

      if (result) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
      } else {
          res.status(404).json({ message: 'Category not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const getServices = async (req, res, next) => {
  // #swagger.tags = ['Service Categories']
  // #swagger.description = 'Get all services ordered by category ids' 
  try {
      const result = mongo.getDb().db(servicesDB).collection(serv).find();
      const services = await result.toArray();
          
      if (services.length === 0) {
        res.status(404).json({ message: 'No services found' });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(services);
      }
  } catch (err) {
      res.status(500).json({ message: 'Internal server error: : Serv_GET001' });
  }
};

const getService = async (req, res, next) => {
  // #swagger.tags = ['Service Categories']
  // #swagger.description = 'Get all services ordered by category ids' 
  try {
    const serviceObjId = new ObjectId(req.params.id);
    console.log(serviceObjId);
    const result_serviceObjId = await mongo.getDb().db(servicesDB).collection(serv).findOne({ "_id": serviceObjId });

    if (result_serviceObjId) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result_serviceObjId);
    } else {
      res.status(400).json({ message: 'Service not found.' })
    };
  } catch (err) {
    res.status(500).json( { message: 'Internal Server Error'} )
  };

};

const getService_ID = async (req, res, next) => {
  // #swagger.tags = ['Service Categories']
  // #swagger.description = 'Get all services ordered by category ids' 
  try {
      const s_id = parseInt(req.params.s_id);
      const result = await mongo.getDb().db(servicesDB).collection(serv).findOne({ "s_id": s_id });
      
      if (result) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
      } else {
          res.status(404).json({ message: 'Category not found' });
      } 
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' })
  }

};

const getCategoryServices = async (req, res, next) => {
  // #swagger.tags = ['Service Categories']
  // #swagger.description = 'Get all services ordered by category ids' 
  
  try {
    const cat_id = parseInt(req.params.cat_id);

    const result_Cat_Serv = await mongo.getDb().db(servicesDB).collection(serv).find({"cat_id": cat_id}).toArray();

    if (result_Cat_Serv) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result_Cat_Serv);
    } else {
      res.status(400).json({ message: 'Service not found.' })
    };

  } catch (err) {
    res.status(500).json({ message: 'Internal Service Error' })
  }
}

// SERVICE POSTS
const postCategory = async (req, res, next) => {
    // #swagger.tags = ['Service Categories']
    // #swagger.method = 'post'
    /* #swagger.parameters['New Category'] = { 
            in: 'body', 
            '@schema': { 
                "required": ["category"], 
                "properties": { 
                    "cat_id": { 
                        "type": "number", 
                        "example": 999 
                    },
                    "cat": {
                      "type": "string",
                      "example": "Testing Category Placeholder"
                    }
                  }} 
        } */    

    try {
        const cat_get = await mongo.getDb().db(servicesDB).collection(cat).find().toArray();
            
        const cat_number = cat_get[cat_get.length - 1].cat_id + 1;
        // #swagger.IGNORE = true
        const newCategory = {
            cat_id: cat_number,
            cat: req.body.cat
        }
        const result = await mongo.getDb().db(servicesDB).collection(cat).insertOne(newCategory);
        
        if (result.acknowledged) {
            res.status(200).json(result);
        } else {
            res.status(404).json(response.error || 'We seem to have a problem with your submission.')
        };
    } catch (err) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const postService = async (req, res, next) => {
  // #swagger.tags = ['Service Categories']
  // #swagger.method = 'post'
  /* #swagger.parameters['New Service'] = { 
          in: 'body', 
          '@schema': { 
              "required": ["service"], 
              "properties": { 
                  "s_id": { 
                      "type": "number", 
                      "example": 999 
                  },
                  "s_name": {
                    "type": "string",
                    "example": "Testing Service Placeholder"
                  },
                  "cat_id": { 
                      "type": "number", 
                      "example": 999 
                  }
                }} 
      } */    

  try {
      const serv_get = await mongo.getDb().db(servicesDB).collection(serv).find().toArray();
          
      const s_number = serv_get[serv_get.length - 1].s_id + 1;
      // #swagger.IGNORE = true
      const newService = {
          s_id: s_number,
          s_name: req.body.s_name,
          cat_id: req.body.cat_id
      }
      const result = await mongo.getDb().db(servicesDB).collection(serv).insertOne(newService);
      
      if (result.acknowledged) {
          res.status(200).json(result);
      } else {
          res.status(404).json(response.error || 'We seem to have a problem with your submission.')
      };
  } catch (err) {
      res.status(500).json({message: 'Internal Server Error'});
  }
};


// SERVICES PUTS
const addService = async (req, res, next) => {
    // #swagger.tags = ['Service Categories']
    // #swagger.description = 'Update services of a selected category'
    // #swagger.parameters['id'] = { in: 'path', description: 'Category ID', required: true, type: 'string' }
    // #swagger.parameters['serviceToAdd'] = { in: 'query', description: 'Service to Add', required: true, type: 'array' }
    try {

        const categoryId = new ObjectId(req.params.id);
        const serviceAdd = req.query.serviceToAdd;
        
        if (!categoryId || !serviceAdd) {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }

        const result = await mongo
            .getDb()
            .db(servicesDB)
            .collection(serv)
            .findOne({ "_id": categoryId });

        //const updatedCategoryServices = (req, res, next) => {
        if (result) {
            const serviceArray = result.services;
            const serviceLength = serviceArray.length;
            const serviceAddArray = serviceAdd.split(',');
           
            for (let i = 0; i < serviceAddArray.length; i++) {
                const services = serviceAddArray[i].trim();
                const s_id = (result.cat_id * 1000) + (serviceLength + i + 1);
                const serviceToAdd = {
                    s_id: s_id,
                    s_name: services
                };
                serviceArray.push(serviceToAdd);
            };
            
            // Update service
            const updatedCategory = {
                cat_id: result.cat_id,
                cat: result.cat,
                services: serviceArray
            }
        
            const updated = await mongo
                .getDb()
                .db(servicesDB)
                .collection(serv)
                .updateOne({'_id': categoryId}, { $set: updatedCategory });

            if (updated) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Service not found' });
            };
        };

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const putCategory = async (req, res, next) => {
    // #swagger.tags = ['Service Categories']
    // #swagger.description = 'Update Category name of a selected category'
    // #swagger.parameters['id'] = { in: 'path', description: 'Category ID', required: true, type: 'string' }
    // #swagger.parameters['cat_name'] = { in: 'query', description: 'Service to Add', required: true, type: 'string' }
    try {
      const categoryId = new ObjectId(req.params.id);
      const cat_name = req.query.cat_name;

      
      if (!categoryId || !cat_name) {
        return res.status(400).json({ message: 'Invalid request parameters' });
      }
  
      const categoryCollection = mongo.getDb().db(servicesDB).collection(serv);
  
      const result = await categoryCollection.findOne({ _id: categoryId });
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const updatedCategory = {
        cat_id: result.cat_id,
        cat: cat_name
      };
  
      const updated = await categoryCollection.updateOne({ _id: categoryId }, { $set: updatedCategory });
  
      if (updated) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Service not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// SERVICE DELS
const deleteCategory = async (req, res, next) => {
    // #swagger.tags = ['Service Categories']
    // #swagger.description = 'Delete with Category _IDs'
    // #swagger.parameters['id'] = {in: 'path', description: '_ID for the Category', required: true, type: 'string'} 

    try {
      const id = {_id: new ObjectId(req.params.id)};

        const result = await mongo.getDb().db('services').collection('services').deleteOne(id);

        if (result.acknowledged) {
            res.status(200).json(result);
        } else {
          next(result.error || new Error('We seem to have a problem with your submission.'))
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    };
};

const deleteService = async (req, res, next) => {
    // #swagger.tags = ['Service Categories']
    // #swagger.description = 'Delete a specific service from a category id'
    // #swagger.parameters['cat_id'] = { in: 'path', description: 'Category ID', required: true, type: 'string' }
    // #swagger.parameters['serviceId'] = { in: 'path', description: 'Service ID', required: true, type: 'number' }

    try {
      const categoryId = new ObjectId(req.params.cat_id);
      const serviceId = parseInt(req.params.serviceId);
      console.log('Here we are: ' + serviceId);
  
      if (!categoryId || !serviceId) {
        console.log(categoryId);
        console.log(serviceId);
        return res.status(400).json({ message: 'Invalid request parameters' });
      }
  
      const categoryCollection = mongo.getDb().db('services').collection('services');
  
      const result = await categoryCollection.findOne({ _id: categoryId });
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
    

      console.log('Result:', result);

      
  
      let serviceIndex = -1;
      for (let i = 0; i < result.services.length; i++) {
        //console.log('Service Index:', serviceIndex);
        console.log('Index:', i);
        console.log(result.services[i].s_id);
        console.log(typeof serviceId);

        if (result.services[i].s_id === serviceId) {
          serviceIndex = i;
          break;
        }
      }

      // const serviceIndex = result.services.findIndex(services => services.s_id === serviceId);


      if (serviceIndex === -1) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      result.services.splice(serviceIndex, 1); // Remove the service from the array
  
      const updated = await categoryCollection.updateOne({ _id: categoryId }, { $set: result });
  
      if (updated) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: 'Failed to delete service' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Caught Internal server error' });
    }
  };
  
  module.exports = {
    getCategories,
    getCategory,
    getCategory_ID,
    getServices,
    getService,
    getService_ID,
    getCategoryServices,
    postCategory,
    postService,
    addService,
    putCategory,
    deleteCategory,
    deleteService
  };