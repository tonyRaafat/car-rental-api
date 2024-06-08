import { Router } from "express";
import { addRental, deleteRental, getAllRentals, updatedRental } from "./rentals.controllers.js";

const router = Router()

router.post('/', addRental);

router.put('/:id', updatedRental);

router.delete('/:id', deleteRental);

router.get('/', getAllRentals);

router.get('/:id',);

export default router