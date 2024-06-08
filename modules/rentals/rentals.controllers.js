import { ObjectId } from 'mongodb';
import {db} from '../../db/dbConnection.js'

export const addRental = async (req, res, next) => {
    try {
        
        const { carId, customerId, rentalDate, returnDate } = req.body;
        const rentalsCollection = db.collection('rentals');
        const carsCollection = db.collection('cars');
        const dateOfRental = new Date(rentalDate)
        const dateOfReturn = new Date(returnDate)

        if(dateOfRental == "Invalid Date" || dateOfReturn == "Invalid Date"){
            return res.status(400).send('dates must be entered in this format MM-DD-YYYY.');
        }

        if (dateOfRental >= dateOfReturn) {
            return res.status(400).send('Rental date must be before the return date.');
        }

        const car = await carsCollection.findOne({ _id: new ObjectId(carId) });

        if (car.rentalStatus === 'rented') {
            return res.status(400).send('Car is already rented');
        }

        const newRental = { carId, customerId, rentalDate, returnDate };
        await rentalsCollection.insertOne(newRental);
        await carsCollection.updateOne(
            { _id: new ObjectId(carId) },
            { $set: { rentalStatus: 'rented' } }
        );

        res.status(201).send('Rental created successfully');
    } catch (error) {
        next(error)
    }
}

export const updatedRental = async (req, res, next) => {
    try {
        const { carId, customerId, rentalDate, returnDate } = req.body;
        const dateOfRental = new Date(rentalDate)
        const dateOfReturn = new Date(returnDate)

        if(dateOfRental == "Invalid Date" || dateOfReturn == "Invalid Date"){
            return res.status(400).send('dates must be entered in this format MM-DD-YYYY.');
        }

        if (dateOfRental >= dateOfReturn) {
            return res.status(400).send('Rental date must be before the return date.');
        }
        const updatedRental = await db.collection('rentals').findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: { carId, customerId, rentalDate, returnDate } }
        );
        res.json(updatedRental.value);
    } catch (error) {
        next(error)
    }
}

export const deleteRental = async (req, res, next) => {
    try {
        const rentalsCollection = db.collection('rentals');
        const rental = await rentalsCollection.findOne({ _id: new ObjectId(req.params.id) });

        await db.collection('cars').updateOne(
            { _id: new ObjectId(rental.carId) },
            { $set: { rentalStatus: 'available' } }
        );

        await rentalsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.send('Rental deleted successfully');
    } catch (error) {
        next(error)
    }
}

export const getAllRentals = async (req, res, next) => {
    try {

        const rentals = await db.collection('rentals').find().toArray();
        res.json(rentals);
    } catch (error) {
        next(error)
    }
}

export const getRental = async (req, res) => {
    try {

        const rentalsCollection = db.collection('rentals');
        const rental = await rentalsCollection.findOne({ _id: new require('mongodb').ObjectID(req.params.id) });
        res.json(rental);
    } catch (error) {
        next(error)

    }
}