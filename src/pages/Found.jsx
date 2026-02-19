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

function ReportFound() {
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
        !formData.pointOfContact ||
        !imageFile
      ) {
        alert("Please fill in all required fields and upload an image");
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
        reportType: "found",
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
    <div className="my-12 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-themeCream rounded-3xl shadow-md p-6 md:p-10">
        <h1 className="text-2xl font-bold text-center text-themeGreen mb-8">
          Report Found Item
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Upload Section */}
          <div className="flex-1 order-1 md:order-2">
            <RequiredLabel htmlFor="upload">Upload Image</RequiredLabel>
            <input
              type="file"
              id="upload"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-4"
              required
            />

            {image && (
              <div className="flex flex-col items-center">
                <p className="mb-2 font-medium">Preview:</p>
                <img
                  src={image}
                  alt="preview"
                  className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl shadow"
                />
              </div>
            )}
          </div>

          {/* Form Section */}
          <form
            className="flex-1 space-y-4 order-2 md:order-1"
            onSubmit={handleSubmit}
          >
            <div>
              <RequiredLabel htmlFor="itemName">Item Name</RequiredLabel>
              <input
                type="text"
                id="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                placeholder="What is the name of the item?"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                required
              />
            </div>

            <div>
              <RequiredLabel htmlFor="description">Description</RequiredLabel>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a brief description"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                required
              />
            </div>

            <div>
              <RequiredLabel htmlFor="location">Location</RequiredLabel>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Where did you find this?"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                required
              />
            </div>

            <div>
              <RequiredLabel htmlFor="pointOfContact">
                Point of Contact
              </RequiredLabel>
              <input
                type="text"
                id="pointOfContact"
                value={formData.pointOfContact}
                onChange={handleInputChange}
                placeholder="Whom should the owner contact?"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-10 py-3 bg-themeGreen text-themeCream font-semibold rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
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

export default ReportFound;
