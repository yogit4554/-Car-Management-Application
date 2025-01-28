import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import {Car} from "../models/car.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse } from "../utils/apiResponse.js"
import mongoose from "mongoose";

const createCar = asyncHandler(async(req,res)=>{
    const {title,description,tags } =req.body;

    if([title,description,tags].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"title desription , tags are required");
    }



    try {
        const owner = await req.user._id;

        const imageUploadPromises = req.files.map((file) =>
            uploadOnCloudinary(file.path)
        );
        const uploadResponses = await Promise.all(imageUploadPromises);

        // Extract image URLs
        const imageUrls = uploadResponses.map((response) => response.url);

        // Remove temporary files
        req.files.forEach((file) => fs.unlinkSync(file.path));

        // Create the car in the database
        const newCar = await Car.create({
            title,
            description,
            tags: JSON.parse(tags), // Parse tags if sent as a stringified array
            images: imageUrls,
            owner,
        });

        return res.status(201).json(
            new ApiResponse(200,newCar,"Car Registered Succesfully")
        )
    } catch (error) {
        throw new ApiError(401,`error while creating car`)
    }
});


const updateCar = asyncHandler(async (req, res) => {
    const { title, description, tags } = req.body;
    const carId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
        throw new ApiError(400, "Invalid car ID");
    }

    // Find the car
    const car = await Car.findById(carId);
    if (!car) {
        throw new ApiError(404, "Car not found");
    }

    // Check ownership
    if (car.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this car");
    }

    try {
        let imageUrls = car.images;

        // If new images are uploaded, replace the existing ones
        if (req.files && req.files.length > 0) {
            // Upload new images to Cloudinary
            const imageUploadPromises = req.files.map((file) =>
                uploadOnCloudinary(file.path)
            );
            const uploadResponses = await Promise.all(imageUploadPromises);

            // Extract image URLs
            imageUrls = uploadResponses.map((response) => response.url);

            // Remove temporary files
            req.files.forEach((file) => fs.unlinkSync(file.path));
        }

        // Update the car in the database
        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            {
                title,
                description,
                tags: JSON.parse(tags), // Parse tags if sent as a stringified array
                images: imageUrls,
            },
            { new: true }
        );

        res.status(200).json(new ApiResponse(200, "Car updated successfully", updatedCar));
    } catch (error) {
        throw new ApiError(500, "Error while updating the car");
    }
});


const deleteCar = asyncHandler(async (req, res) => {
    const carId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
        throw new ApiError(400, "Invalid car ID");
    }

    // Find the car
    const car = await Car.findById(carId);
    if (!car) {
        throw new ApiError(404, "Car not found");
    }

    // Check ownership
    if (car.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this car");
    }

    try {
        await car.remove();
        res.status(200).json(new ApiResponse(200, "Car deleted successfully"));
    } catch (error) {
        throw new ApiError(500, "Error while deleting the car");
    }
});

const getMyCars = asyncHandler(async (req, res) => {
    const owner = req.user._id;

    try {
        const cars = await Car.find({ owner });
        res.status(200).json(new ApiResponse(200, "Cars retrieved successfully", cars));
    } catch (error) {
        throw new ApiError(500, "Error while retrieving cars");
    }
});

/*** Search cars globally by title, description, or tags*/
const searchCars = asyncHandler(async (req, res) => {
    const { keyword } = req.query;

    try {
        const cars = await Car.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { tags: { $regex: keyword, $options: "i" } },
            ],
        });

        res.status(200).json(new ApiResponse(200, "Cars retrieved successfully", cars));
    } catch (error) {
        throw new ApiError(500, "Error while searching cars");
    }
});

/*** Get details of a specific car*/
const getCarById = asyncHandler(async (req, res) => {
    const carId = req.params;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
        throw new ApiError(400, "Invalid car ID");
    }

    try {
        const car = await Car.findById(carId);
        if (!car) {
            throw new ApiError(404, "Car not found");
        }

        res.status(200).json(new ApiResponse(200, car,"Car retrieved successfully"));
    } catch (error) {
        throw new ApiError(500, "Error while retrieving the car");
    }
});
const getAllCars = asyncHandler(async (req, res) => {
    try {
        const cars = await Car.find(); // Fetch all car documents
        res.status(200).json(new ApiResponse(200, cars,"All cars retrieved successfully"));
    } catch (error) {
        throw new ApiError(500, "Error while retrieving all cars");
    }
});

export{
    createCar,
    updateCar,
    deleteCar,
    getMyCars,
    searchCars,
    getCarById,
    getAllCars
}