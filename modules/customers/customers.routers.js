import { Router } from "express";
import { addCustomer, deleteCustomer, readCustomers, updateCustomer, login } from "./customers.controllers.js";
import { validateUserSignUp } from "../../middlewares/customerValidation.middleware.js";

const router = Router();

router.post('/signup', validateUserSignUp, addCustomer)
router.get('/login',login)
router.get('/', readCustomers)
router.put('/:id', updateCustomer)
router.delete('/:id',deleteCustomer)


export default router