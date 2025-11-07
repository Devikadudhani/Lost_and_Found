import React from "react";
import { useState } from "react";
function RequiredLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block font-medium">
      {children} <span className="text-red-500">*</span>
    </label>
  );
}

function ReportLost() {
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className="my-20 flex items-center justify-center">
  {/* Common Card */}
  <div className="flex flex-col w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md p-10">
    {/* Heading */}
    <h1 className="text-2xl font-bold text-center text-themeGreen mb-8">
      Report Lost Item
    </h1>

    {/* Form + Upload Section */}
    <div className="flex gap-10">
      {/* Left: Lost Items Info */}
      <form className="flex-1 space-y-5">
        <div className="flex flex-col">
          <RequiredLabel htmlFor="itemname" className="text-sm font-medium mb-1">
            Item Name
          </RequiredLabel>
          <input
            type="text"
            id="itemname"
            placeholder="What is the name of the item?"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <RequiredLabel htmlFor="description" className="text-sm font-medium mb-1">
            Description
          </RequiredLabel>
          <input
            type="text"
            id="description"
            placeholder="Provide a brief description of the item"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="text-sm font-medium mb-1 block text-base">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Where you might lose it??"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <RequiredLabel htmlFor="POC" className="text-sm font-medium mb-1">
            Point of Contact
          </RequiredLabel>
          <input
            type="text"
            id="POC"
            placeholder="Enter your name or contact info"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
        </div>
      </form>

      {/* Right: Upload Image */}
      <div className="flex-1">
        <label htmlFor="upload" className="text-sm font-medium mb-1 block text-base">
          Upload the image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2"
        />

        {image && (
          <div>
            <h3 className="mb-2">Preview:</h3>
            <img
              src={image}
              alt="preview"
              className="w-64 h-64 object-cover rounded-lg shadow"
            />
          </div>
        )}
      </div>
    </div>

    {/* Submit Button */}
    <div className="flex justify-center mt-10">
      <button
        type="submit"
        className="px-8 bg-themeGreen text-themeCream font-semibold py-3 rounded-lg shadow-md"
      >
        Report
      </button>
    </div>
  </div>
</div>
  );
}

export default RequiredLost;
