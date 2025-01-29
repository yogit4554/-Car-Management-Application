import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import Header from "../components/Header";

const UpdateCar = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate(); // Initialize navigate function
  const [car, setCar] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [existingImages, setExistingImages] = useState([]); // Store existing images
  const [newImages, setNewImages] = useState([]); // Store new images selected by user

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        if (response.data.success) {
          setCar(response.data.data);
          setExistingImages(response.data.data.images || []); // Fetch existing images
        }
      } catch (error) {
        console.error("Failed to fetch car details", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleImageChange = (e) => {
    setNewImages((prev) => [...prev, ...Array.from(e.target.files)]); // Append new images
  };

  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index)); // Remove selected new image
  };

  const removeExistingImage = (imageUrl) => {
    setExistingImages(existingImages.filter((img) => img !== imageUrl)); // Remove existing image
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", car.title);
    formData.append("description", car.description);
    formData.append("tags", car.tags);

    newImages.forEach((image) => formData.append("carImage", image)); // Append new images

    try {
      const response = await api.put(`/cars/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("Car updated successfully!");
        navigate("/get-user-car"); // Redirect to user cars
      }
    } catch (error) {
      console.error("Failed to update car", error);
      alert("Error updating car");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-600 text-white">
      <Header isLoggedIn={true} />
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full mx-auto mt-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Update Car</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-800 mb-2">Title</label>
          <input
            type="text"
            value={car.title}
            onChange={(e) => setCar({ ...car, title: e.target.value })}
            className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-800 mb-2">Description</label>
          <textarea
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-800 mb-2">Tags</label>
          <input
            type="text"
            value={car.tags}
            onChange={(e) => setCar({ ...car, tags: e.target.value })}
            className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Comma-separated tags"
          />
        </div>

        {/* Existing Images */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-800 mb-2">Existing Images</label>
          <div className="flex flex-wrap gap-2">
            {existingImages.map((imageUrl, index) => (
              <div key={index} className="relative">
                <img
                  src={imageUrl}
                  alt="Existing"
                  className="w-24 h-24 object-cover rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(imageUrl)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-800 mb-2">Upload New Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 cursor-pointer"
          />
        </div>

        {/* Preview New Images */}
        <div className="mb-4 flex flex-wrap gap-2">
          {newImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="New"
                className="w-24 h-24 object-cover rounded-md border border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeNewImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
