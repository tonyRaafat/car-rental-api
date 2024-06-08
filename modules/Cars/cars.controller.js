import { ObjectId } from "mongodb";
import { db } from "../../db/dbConnection.js";
import throwError from "../../utils/throwError.utils.js";

export const addCar = async (req, res, next) => {
    try {
        const { name, model } = req.body
        await db.collection('cars').insertOne({ name, model, rentalStatus: "available" });
        res.status(201).send('Car added successfully');
    } catch (error) {
        next(error)
    }
}

export const getCar = async (req, res, next) => {
    try {
        const car = await db.collection('cars').findOne({ _id: new ObjectId(req.params.id) });
        res.json(car);
    } catch (error) {
        next(error)
    }
}

export const getcars = async (req, res, next) => {
    try {
        const cars = await db.collection('cars').find().toArray();
        res.json(cars);
    } catch (error) {
        next(error)
    }
}

export const getCarByModel = async (req, res, next) => {
    try {
        const { model } = req.query;
        if(!model){
            throw throwError("you must add query of the models you want",400)
        }
        const models = model.split(',')
        const cars = await db.collection('cars').find({ model: { $in: models } }).toArray();
        res.json(cars);
    } catch (error) {
        next(error)
    }
}

export const getAvaliableCarsByModel = async (req, res,next) => {
    try {

        const model = req.params.model;
        const cars = await db.collection('cars').find({ model, rentalStatus: 'available' }).toArray();
        res.json(cars);
    } catch (error) {
        next(error)
    }
}

export const getEthierRentedOrModel = async (req, res, next) => {
    try {
        const model = req.params.model;
        const cars = await db.collection('cars').find({
            $or: [
                { rentalStatus: 'rented' },
                { model }
            ]
        }).toArray();
        res.json(cars);
    } catch (error) {
        next(error)
    }
}

export const getAvaliableModelOrRentedModel = async (req, res) => {
    const { availableModels, rentedModels } = req.query;
    let availableModelsArray;
    let rentedModelsArray;
    if(availableModels){
        availableModelsArray = availableModels.split(',');
    }
    if(rentedModels){
        rentedModelsArray = rentedModels.split(',')
    }
    const cars = await db.collection('cars').find({
        $or: [
            { model: { $in: availableModelsArray!=null?availableModelsArray:[] }, rentalStatus: 'available' },
            { model: { $in: rentedModelsArray!=null?rentedModelsArray:[]}, rentalStatus: 'rented' }
        ]
    }).toArray();
    res.json(cars);
}

export const updateCar = async (req, res, next) => {
    try {

        const { name, model } = req.body
        const updatedCar = await db.collection('cars').findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: { name, model } },
        );
        res.json(updatedCar.value);
    } catch (error) {
        next(error)
    }
}

export const deleteCar = async (req, res, next) => {
    try {
        await db.collection('cars').deleteOne({ _id: new ObjectId(req.params.id) });
        res.send('Car deleted successfully');
    } catch (error) {
        next(error)
    }
}