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
  const [images, setImages] = useState([]); // State to hold images
  const [imageFiles, setImageFiles] = useState([]); // To store the files selected by user

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        if (response.data.success) {
          setCar(response.data.data); // Set the fetched car details to state
        }
      } catch (error) {
        console.error("Failed to fetch car details", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleImageChange = (e) => {
    setImageFiles(e.target.files); // Set selected files to state
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", car.title);
    formData.append("description", car.description);
    formData.append("tags", car.tags);

    // Append images to FormData
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("carImage", imageFiles[i]);
    }

    try {
      const response = await api.put(`/cars/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file upload
        },
      });

      if (response.data.success) {
        alert("Car updated successfully!");
        navigate("/get-user-car"); // Redirect to /get-user-car after successful update
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
        <div className="mb-4">
          <label className="block mb-1">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange} // Handle image selection
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
