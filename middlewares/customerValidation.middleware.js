import { db } from "../db/dbConnection.js"
import throwError from "../utils/throwError.utils.js"

export async function validateUserSignUp(req, res, next) {
    try {
        const { username, email, password , phoneNumber} = req.body
        if (!username || !email || !password,!phoneNumber) {
            throw throwError("body must contain username, email, password and phoneNumber", 400)
        }
        const user = await db.collection('customer').findOne({ email: email })
        if (user !== null) {
            throw throwError("user already exist", 400)
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }

}


export async function validateLoginBody(req, res, next) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw throwError("body must contain email and password", 400)
        }
        next()

    } catch (error) {
        next(error)
    }

}