import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api.js";

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
    <div>
      <h2 className="text-2xl font-bold mb-4">Update Car</h2>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={car.title}
            onChange={(e) => setCar({ ...car, title: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tags</label>
          <input
            type="text"
            value={car.tags}
            onChange={(e) => setCar({ ...car, tags: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        {/* Existing Images */}
        <div className="mb-4">
          <label className="block mb-1">Existing Images</label>
          <div className="flex flex-wrap gap-2">
            {existingImages.map((imageUrl, index) => (
              <div key={index} className="relative">
                <img src={imageUrl} alt="Existing" className="w-24 h-24 object-cover rounded border" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(imageUrl)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Image Upload */}
        <div className="mb-4">
          <label className="block mb-1">Upload New Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        {/* Preview New Images */}
        <div className="mb-4 flex flex-wrap gap-2">
          {newImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="New"
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeNewImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
