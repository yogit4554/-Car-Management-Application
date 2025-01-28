import { Router } from 'express';
import {
    createCar,
    updateCar,
    deleteCar,
    getMyCars,
    searchCars,
    getCarById,
    getAllCars
} from "../controllers/car.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// Apply verifyJWT middleware to all routes
router.use(verifyJWT);

// Get all cars (global visibility)
router.route("/").get(getAllCars);

// Get all cars created by the logged-in user
router.route("/get-user-car").get(getMyCars);

// Register a new car
router.route("/car-register").post(
    upload.fields([
        {
            name: "carImage",
            maxCount: 10,
        },
    ]),
    createCar
);

// Update a car
router.route("/update/:carId").put(
    upload.fields([
        {
            name: "carImage",
            maxCount: 10,
        },
    ]),
    updateCar
);

// Search cars globally by keyword
router.route("/search").post(searchCars);

// Get or delete a car by ID
router
    .route("/:carId")
    .get(getCarById)
    .delete(deleteCar);

export default router;