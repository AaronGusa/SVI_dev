// @ts-ignore
const dotenv = require('dotenv');
// @ts-ignore
const MongoClient = require('mongodb').MongoClient;

let _db;

async function connect() {
    dotenv.config();
    const uri = process.env.MONGOURL;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        _db = client;
        console.log('MONGO CONGO McDONGO BRO!');
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

function getDb () {
    return _db;
}

module.exports = { connect, getDb };