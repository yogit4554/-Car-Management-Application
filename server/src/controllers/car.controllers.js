import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import {Car} from "../models/car.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse } from "../utils/apiResponse.js"
import mongoose, {isValidObjectId} from "mongoose";
import fs from 'fs';

const createCar = asyncHandler(async (req, res) => {
    const { title, description, tags } = req.body;
    
    if ([title, description, tags].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "title, description, and tags are required");
    }

    try {
        const owner = req.user._id;
        console.log("Owner ID: ", owner);  // Debugging line
        
        // Ensure that car images are present in req.files["carImage"]
        const files = req.files["carImage"];
        console.log("Files uploaded: ", files);  // Debugging line
        if (!files || files.length === 0) {
            throw new ApiError(400, "At least one car image is required");
        }

        // Upload images to Cloudinary
        const imageUploadPromises = files.map((file) => uploadOnCloudinary(file.path));
        const uploadResponses = await Promise.all(imageUploadPromises);

        // Check the responses from Cloudinary
        console.log("Cloudinary upload responses: ", uploadResponses);  // Debugging line
        if (uploadResponses.some((response) => !response)) {
            throw new ApiError(500, "Failed to upload images to Cloudinary");
        }

        // Extract image URLs from the Cloudinary responses
        const imageUrls = uploadResponses.map((response) => response.url);
        console.log("Image URLs: ", imageUrls);  // Debugging line

        // Remove temporary files after upload
        files.forEach((file) => fs.unlinkSync(file.path));

        // Create the car document in the database
        const newCar = await Car.create({
            title,
            description,
            tags: JSON.parse(tags), // Parse tags if they are sent as a stringified array
            images: imageUrls,
            owner,
        });
        console.log("Car created successfully: ", newCar);  // Debugging line

        return res.status(201).json(new ApiResponse(200, newCar, "Car Registered Successfully"));
    } catch (error) {
        console.error("Error while creating the car: ", error);  // Debugging line
        throw new ApiError(401, "Error while creating the car");
    }
});

const updateCar = asyncHandler(async (req, res) => {
    const { title, description, tags } = req.body;
    const carId = req.params.carId; // Use correct param name

    if (!mongoose.Types.ObjectId.isValid(carId)) {
        throw new ApiError(400, "Invalid car ID");
    }

    const car = await Car.findById(carId);
    if (!car) {
        throw new ApiError(404, "Car not found");
    }

    if (car.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this car");
    }

    try {
        let imageUrls = car.images;

        if (req.files && req.files["carImage"] && req.files["carImage"].length > 0) {
            const files = req.files["carImage"];
            const imageUploadPromises = files.map((file) => uploadOnCloudinary(file.path));
            const uploadResponses = await Promise.all(imageUploadPromises);

            imageUrls = uploadResponses.map((response) => response.url);

            files.forEach((file) => fs.unlinkSync(file.path)); // Remove temporary files
        }

        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            {
                title,
                description,
                tags: JSON.parse(tags),
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
    const carId = req.params.carId;  // Correctly access carId from params
    console.log("Car ID:", carId);

    if (!mongoose.Types.ObjectId.isValid(carId)) {
        throw new ApiError(400, "Invalid car ID");
    }

    // Find the car
    const car = await Car.findById(carId);
    
    console.log("Car found:", car);  // Log the found car

    if (!car) {
        throw new ApiError(404, "Car not found");
    }

    // Check ownership
    if (car.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this car");
    }

    try {
        // Use findByIdAndDelete to delete the car
        await Car.findByIdAndDelete(carId);  // Correct method to delete the car
        console.log("Car deleted successfully");

        res.status(200).json(new ApiResponse(200, "Car deleted successfully"));
    } catch (error) {
        console.error("Error during deletion:", error);  // Log the error
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
    const { keyword } = req.body;  // Now using req.body instead of req.query

    if (!keyword) {
        throw new ApiError(400, "Keyword is required for search");
    }

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
    const carId = req.params.carId;

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