import React, { useState } from "react";
import api from "../utils/api.js"; // Import the API instance

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]); // Store multiple images

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    
    images.forEach((image) => formData.append("carImage", image)); // Append all selected images

    try {
      await api.post("/cars/car-register", formData); // Use API instance
      alert("Car created successfully!");
    } catch (error) {
      console.error("Failed to create car", error.response?.data || error.message);
      alert("Failed to create product. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    setImages((prevImages) => [...prevImages, ...Array.from(e.target.files)]); // Append new images
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index)); // Remove selected image
  };

  return (
    <form onSubmit={handleCreate} className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Product</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-800 mb-2 ">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-800 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-800 mb-2">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Comma-separated tags with inverted comma"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-800 mb-2">Upload Images</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 cursor-pointer"
        />
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="mb-4 grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="w-28 h-28 object-cover rounded-md border border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition"
      >
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
