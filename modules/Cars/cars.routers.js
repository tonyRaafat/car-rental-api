import Router from "express"
import { addCar, deleteCar, getAvaliableCarsByModel, getAvaliableModelOrRentedModel, getCar, getCarByModel, getEthierRentedOrModel, getcars, updateCar } from "./cars.controller.js";

const router = Router()

router.post('/', addCar);
router.get('/:id', getCar);
router.get('/', getcars);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

router.get('/special/models', getCarByModel);
router.get('/special/available/:model',getAvaliableCarsByModel );
router.get('/special/either/:model', getEthierRentedOrModel);
router.get('/special/avaliable-or-rented',getAvaliableModelOrRentedModel );

export default router