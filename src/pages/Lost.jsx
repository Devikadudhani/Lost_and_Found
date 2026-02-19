import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function RequiredLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block font-medium">
      {children} <span className="text-red-500">*</span>
    </label>
  );
}

function ReportLost() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    pointOfContact: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.itemName ||
        !formData.description ||
        !formData.location ||
        !formData.pointOfContact
      ) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await fileToBase64(imageFile);
      }

      const payload = {
        itemName: formData.itemName,
        description: formData.description,
        location: formData.location,
        pointOfContact: formData.pointOfContact,
        imageUrl: imageUrl,
        reportType: "lost",
      };

      const response = await api.post("/items/report", payload);

      if (response.status === 201) {
        alert("Item reported successfully!");
        setFormData({
          itemName: "",
          description: "",
          location: "",
          pointOfContact: "",
        });
        setImage(null);
        setImageFile(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Error reporting item:", error);
      alert(
        error.response?.data?.message ||
          "Failed to report item. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10 px-4 flex items-center justify-center">
      <div className="flex flex-col w-full max-w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md p-6 sm:p-10">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-themeGreen mb-6 sm:mb-8">
          Report Lost Item
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Upload Section */}
          <div className="flex-1 order-1 md:order-2">
            <label htmlFor="upload" className="text-sm font-medium mb-1 block">
              Upload the image
            </label>
            <input
              type="file"
              id="upload"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2"
            />

            {image && (
              <div className="flex flex-col items-center md:items-start">
                <h3 className="mb-2">Preview:</h3>
                <img
                  src={image}
                  alt="preview"
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-lg shadow"
                />
              </div>
            )}
          </div>

          {/* Form Section */}
          <form
            className="flex-1 space-y-4 sm:space-y-5 order-2 md:order-1"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <RequiredLabel htmlFor="itemName">Item Name</RequiredLabel>
              <input
                type="text"
                id="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                placeholder="What is the name of the item?"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <RequiredLabel htmlFor="description">Description</RequiredLabel>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a brief description of the item"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <RequiredLabel htmlFor="location">Location</RequiredLabel>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Where you might lose it?"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <RequiredLabel htmlFor="pointOfContact">
                Point of Contact
              </RequiredLabel>
              <input
                type="text"
                id="pointOfContact"
                value={formData.pointOfContact}
                onChange={handleInputChange}
                placeholder="Enter your name or contact info"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div className="flex justify-center mt-6 sm:mt-10">
              <button
                type="submit"
                disabled={loading}
                className="px-8 bg-themeGreen text-themeCream font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Reporting..." : "Report"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportLost;