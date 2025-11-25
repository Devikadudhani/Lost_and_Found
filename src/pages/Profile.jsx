import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user data on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="my-20 text-center text-lg font-semibold">
        Please login to view your profile.
      </div>
    );
  }

  // ---- temp example fields (replace when backend integrated) ----
  const lostPreview = user.lastLostItems || [];
  const foundPreview = user.lastFoundItems || [];
  const totalLost = user.totalLost || 0;
  const totalFound = user.totalFound || 0;
  const totalReturned = user.totalReturned || 0;

  return (
    <div className="p-10 bg-themeCream flex justify-center">
      <div className="w-[900px] bg-white rounded-3xl p-10 shadow-lg space-y-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-themeGreen text-center">
          Your Profile
        </h1>

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row gap-20 px-8 items-center">
          {/* Profile Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 rounded-full overflow-hidden shadow">
              <img
                src="/profile.jpg"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-gray-500">Default Avatar</p>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-lg">{user.name || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-lg">{user.email}</p>
            </div>

            {/* <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-lg">
                {user.phone || "Not added"}
              </p>
            </div> */}

            {/* <div>
              <p className="text-sm text-gray-500">Registered On</p>
              <p className="font-semibold text-lg">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div> */}

            {/* <div>
              <p className="text-sm text-gray-500">Last Login</p>
              <p className="font-semibold text-lg">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString()
                  : "N/A"}
              </p>
            </div> */}

            {/* <div>
              <p className="text-sm text-gray-500">Verification Status</p>
              <p className="font-semibold text-lg">
                {user.isVerified ? "Verified" : "Not Verified"}
              </p>
            </div> */}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="bg-themeCream p-6 rounded-xl shadow">
            <p className="text-3xl font-bold">{totalLost}</p>
            <p className="mt-2 text-gray-600">Lost Items</p>
          </div>

          <div className="bg-themeCream p-6 rounded-xl shadow">
            <p className="text-3xl font-bold">{totalFound}</p>
            <p className="mt-2 text-gray-600">Found Items</p>
          </div>

          <div className="bg-themeCream p-6 rounded-xl shadow">
            <p className="text-3xl font-bold">{totalReturned}</p>
            <p className="mt-2 text-gray-600">Returned</p>
          </div>
        </div>

        {/* QUICK PREVIEW SECTION */}
        <div className="space-y-10">
          {/* Lost Items Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Recently Reported Lost Items
            </h2>

            {lostPreview.length > 0 ? (
              <ul className="space-y-2">
                {lostPreview.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 p-3 rounded-lg shadow text-sm flex justify-between"
                  >
                    <span>{item.title}</span>
                    <span className="text-gray-500">{item.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">No recent lost items.</p>
            )}
          </div>

          {/* Found Items Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Recently Found Items</h2>

            {foundPreview.length > 0 ? (
              <ul className="space-y-2">
                {foundPreview.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 p-3 rounded-lg shadow text-sm flex justify-between"
                  >
                    <span>{item.title}</span>
                    <span className="text-gray-500">{item.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">No recent found items.</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center flex-wrap gap-4">
          <button
            onClick={() => navigate("/lost-items")}
            className="px-6 py-2 bg-themeGreen text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
          >
            View Lost Items
          </button>

          <button
            onClick={() => navigate("/found-items")}
            className="px-6 py-2 bg-themeGreen text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
          >
            View Found Items
          </button>

          {/* <button
            onClick={() => navigate("/report-lost")}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Report Lost Item
          </button>

          <button
            onClick={() => navigate("/report-found")}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Report Found Item
          </button> */}

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
