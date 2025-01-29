import React, { useState } from "react";
import api from "../utils/api.js"; // Import the API instance

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    Array.from(images).forEach((image) => formData.append("carImage", image)); // Handle multiple images

    try {
      await api.post("/cars/car-register", formData); // Use the `api` instance
      alert("Car created successfully!");
    } catch (error) {
      console.error("Failed to create car", error.response?.data || error.message);
      alert("Failed to create product. Please try again.");
    }
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
          onChange={(e) => setImages(e.target.files)}
          className="w-full border rounded"
        />
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
