import { ObjectId } from "mongodb";
import { db } from "../../db/dbConnection.js";
import throwError from "../../utils/throwError.utils.js";

export async function addCustomer(req, res, next) {
    try {
        const { username, email, phoneNumber, password } = req.body;
        await db.collection('customer').insertOne({ username, email, phoneNumber, password });
        res.status(201).json({ message: "customer added successfully" })
    } catch (error) {
        next(error)
    }

}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body
        const customer = await db.collection('customer').findOne({ email: email })
        if (customer !== null) {
            return res.json({ message: "login Success", customer })
        } else {
            return res.status(404).send({ message: "User not Found" })
        }

    } catch (error) {
        next(error)
    }
}

export async function readCustomers(req, res, next) {
    try {
        const data = await db.collection('customer').find({}).toArray()
        res.json(data)
    } catch (error) {
        next(error)
    }
}

export async function updateCustomer(req, res, next) {
    try {
        const { username, email, phoneNumber, password } = req.body;
        const updatedCustomer = await db.collection('customer').updateOne({ _id: new ObjectId( req.params.id) }, { $set: { username, email, phoneNumber, password } })
        if(!updateCustomer){
            throw throwError("something went wrong")
        }
        res.status(200).json({ message: "customer updated successfully", updatedCustomer })
    } catch (error) {
        next(error)
    }

}

export async function deleteCustomer(req, res, next) {
    try {
        const deletedCustomer = await db.collection('customer').deleteOne({ _id: new ObjectId(req.params.id)})
        res.status(200).json({ message: "customer deleted successfully", deletedCustomer })
        
    } catch (error) {
        next(error)
    }
}