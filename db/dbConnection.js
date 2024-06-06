import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'car_rental';


client.connect().then(()=>{
    console.log("connection to database successfull");
}).catch(error=>console.error(error))

const db = client.db(dbName);

export {
    db
}