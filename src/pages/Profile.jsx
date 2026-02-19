// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/config";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUser(u);
        setName(u.name || "");
        setEnrollment(u.enrollment || "");
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadProfileStats() {
      setLoading(true);
      setErr(null);
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(`${API_BASE}/api/profile`, {
          method: "GET",
          headers,
          credentials: token ? undefined : "include",
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.message || `Failed to load profile (${res.status})`);
        }

        const data = await res.json();
        if (!mounted) return;

        setStats({
          lostCount: data.lostCount ?? 0,
          foundCount: data.foundCount ?? 0,
          returnedCount: data.returnedCount ?? 0,
          recentLost: data.recentLost ?? [],
          recentFound: data.recentFound ?? [],
        });
      } catch (error) {
        console.error("Profile load error:", error);
        if (mounted) setErr(error.message || "Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProfileStats();
    return () => { mounted = false; };
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/profile/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, enrollment }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setEditing(false);
        alert("Profile updated!");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      alert("Error updating profile");
    }
  };

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

  const totalLost = stats?.lostCount ?? user.totalLost ?? 0;
  const totalFound = stats?.foundCount ?? user.totalFound ?? 0;
  const totalReturned = stats?.returnedCount ?? user.totalReturned ?? 0;
  const lostPreview = stats?.recentLost ?? user.lastLostItems ?? [];
  const foundPreview = stats?.recentFound ?? user.lastFoundItems ?? [];

  return (
    <div className="p-4 sm:p-8 bg-themeCream flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl p-4 sm:p-10 shadow-lg space-y-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-themeGreen text-center">
          Your Profile
        </h1>

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow">
              <img
                src="/profile.jpg"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-gray-500">Default Avatar</p>
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              {editing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-3 py-1 w-full"
                />
              ) : (
                <p className="font-semibold text-base sm:text-lg">{user.name || "N/A"}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Enrollment</p>
              {editing ? (
                <input
                  value={enrollment}
                  onChange={(e) => setEnrollment(e.target.value)}
                  className="border rounded px-3 py-1 w-full"
                />
              ) : (
                <p className="font-semibold text-base sm:text-lg">{user.enrollment || "N/A"}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-base sm:text-lg break-all">{user.email}</p>
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="bg-themeGreen text-white px-4 py-2 rounded-lg w-full sm:w-fit"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleUpdateProfile}
                className="bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-fit"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="bg-themeCream p-4 sm:p-6 rounded-xl shadow">
            <p className="text-2xl sm:text-3xl font-bold">{totalLost}</p>
            <p className="mt-1 sm:mt-2 text-gray-600">Lost Items</p>
          </div>

          <div className="bg-themeCream p-4 sm:p-6 rounded-xl shadow">
            <p className="text-2xl sm:text-3xl font-bold">{totalFound}</p>
            <p className="mt-1 sm:mt-2 text-gray-600">Found Items</p>
          </div>

          <div className="bg-themeCream p-4 sm:p-6 rounded-xl shadow">
            <p className="text-2xl sm:text-3xl font-bold">{totalReturned}</p>
            <p className="mt-1 sm:mt-2 text-gray-600">Returned</p>
          </div>
        </div>

        {/* Previews */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Recently Reported Lost Items
            </h2>

            {loading ? (
              <div className="text-gray-600">Loading...</div>
            ) : err ? (
              <div className="text-red-500">Error: {err}</div>
            ) : lostPreview.length > 0 ? (
              <ul className="space-y-2">
                {lostPreview.map((item, idx) => (
                  <li
                    key={item._id ?? idx}
                    className="bg-gray-100 p-3 rounded-lg shadow text-sm flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{item.itemName || "Untitled"}</div>
                      <div className="text-xs text-gray-500">{item.location || ""}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {(item.status || "unknown").toUpperCase()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">No recent lost items.</p>
            )}
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Recently Found Items
            </h2>

            {loading ? (
              <div className="text-gray-600">Loading...</div>
            ) : err ? (
              <div className="text-red-500">Error: {err}</div>
            ) : foundPreview.length > 0 ? (
              <ul className="space-y-2">
                {foundPreview.map((item, idx) => (
                  <li
                    key={item._id ?? idx}
                    className="bg-gray-100 p-3 rounded-lg shadow text-sm flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{item.itemName || "Untitled"}</div>
                      <div className="text-xs text-gray-500">{item.location || ""}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {(item.status || "unknown").toUpperCase()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">No recent found items.</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/lost-items")}
            className="px-6 py-2 bg-themeGreen text-white font-semibold rounded-lg shadow-md hover:bg-green-700 w-full sm:w-auto"
          >
            View Lost Items
          </button>

          <button
            onClick={() => navigate("/found-items")}
            className="px-6 py-2 bg-themeGreen text-white font-semibold rounded-lg shadow-md hover:bg-green-700 w-full sm:w-auto"
          >
            View Found Items
          </button>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}