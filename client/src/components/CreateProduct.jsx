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
    <form onSubmit={handleCreate} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Create Product</h2>
      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Images</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full border rounded"
        />
      </div>

      {/* Display selected images */}
      <div className="mb-4 flex flex-wrap gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="w-24 h-24 object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Create
      </button>
    </form>
  );
};

export default CreateProduct;
