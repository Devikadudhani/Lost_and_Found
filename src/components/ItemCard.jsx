// src/components/ItemCard.jsx
import React, { useState, useEffect } from "react";
import { API_BASE } from "../utils/config";

export default function ItemCard({ item, onChange }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [originalItemSnapshot, setOriginalItemSnapshot] = useState(null);

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    location: "",
    pointOfContact: "",
    imageUrl: "",
    reportType: item.reportType || "lost",
    status: item.status || "open",
  });
  const [uploaderName, setUploaderName] = useState(null);
  const [previewFileName, setPreviewFileName] = useState(null);

  const getReportedById = (it) => {
    if (!it || it.reportedBy == null) return null;
    if (typeof it.reportedBy === "object") {
      if (it.reportedBy._id) return String(it.reportedBy._id);
      if (it.reportedBy.id) return String(it.reportedBy.id);
      return String(it.reportedBy);
    }
    return String(it.reportedBy);
  };

  useEffect(() => {
    setForm({
      itemName: item.itemName || "",
      description: item.description || "",
      location: item.location || "",
      pointOfContact: item.pointOfContact || "",
      imageUrl: item.imageUrl || "",
      reportType: item.reportType || "lost",
      status: item.status || "open",
    });

    setOriginalItemSnapshot({
      itemName: item.itemName || "",
      description: item.description || "",
      location: item.location || "",
      pointOfContact: item.pointOfContact || "",
      imageUrl: item.imageUrl || "",
      reportType: item.reportType || "lost",
      status: item.status || "open",
    });

    if (item.reportedBy && typeof item.reportedBy === "object") {
      setUploaderName(
        item.reportedBy.name ||
          item.reportedBy.fullName ||
          item.reportedBy.email ||
          null,
      );
    } else {
      const me = JSON.parse(localStorage.getItem("user") || "null");
      if (me && String(me._id || me.id) === String(item.reportedBy)) {
        setUploaderName(
          me.name || me.fullName || me.displayName || me.email || null,
        );
      } else {
        setUploaderName(null);
      }
    }

    setPreviewFileName(null);
  }, [item]);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUserId = currentUser?._id ?? currentUser?.id ?? null;

  const reportedById = getReportedById(item);
  const isOwner = Boolean(
    currentUserId &&
    reportedById &&
    String(currentUserId) === String(reportedById),
  );

  const authFetch = async (url, opts = {}) => {
    const token = localStorage.getItem("token");
    opts.headers = opts.headers || {};
    const bodyIsFormData = opts.body instanceof FormData;

    if (token) {
      if (!bodyIsFormData && !opts.headers["Content-Type"]) {
        opts.headers["Content-Type"] = "application/json";
      }
      opts.headers["Authorization"] = `Bearer ${token}`;
    } else {
      opts.credentials = opts.credentials ?? "include";
      if (
        !bodyIsFormData &&
        opts.body &&
        typeof opts.body === "object" &&
        !opts.headers["Content-Type"]
      ) {
        opts.headers["Content-Type"] = "application/json";
      }
    }

    if (
      opts.body &&
      typeof opts.body === "object" &&
      !bodyIsFormData &&
      opts.headers["Content-Type"] === "application/json"
    ) {
      opts.body = JSON.stringify(opts.body);
    }

    return fetch(url, opts);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const fileToDataUrl = (file) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });

  const handleFilePicked = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setForm((p) => ({ ...p, imageUrl: dataUrl }));
      setPreviewFileName(file.name);
    } catch (err) {
      console.error(err);
      alert("Failed to read file");
    }
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await authFetch(`${API_BASE}/api/items/${item._id}`, {
        method: "PATCH",
        body: {
          itemName: form.itemName,
          description: form.description,
          location: form.location,
          pointOfContact: form.pointOfContact,
          imageUrl: form.imageUrl,
          reportType: form.reportType,
          status: form.status,
        },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Failed to update" }));
        alert(err.message || "Failed to update");
        return;
      }

      onChange?.();
      setEditing(false);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async () => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await authFetch(`${API_BASE}/api/items/${item._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Delete failed" }));
        alert(err.message || "Delete failed");
        return;
      }
      onChange?.();
      setOpen(false);
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  const markAction = async (action) => {
    try {
      const res = await authFetch(`${API_BASE}/api/items/${item._id}/mark`, {
        method: "POST",
        body: { action },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Action failed" }));
        alert(err.message || "Action failed");
        return;
      }
      onChange?.();
    } catch (e) {
      console.error(e);
      alert("Action failed");
    }
  };

  const statusBadge = (s) => {
    const status = (s || "reported").toLowerCase();
    const map = {
      reported: { label: "Reported", cls: "bg-gray-200 text-gray-800" },
      found: { label: "Found", cls: "bg-green-200 text-green-800" },
      handed: { label: "Handed", cls: "bg-indigo-200 text-indigo-800" },
    };
    const meta = map[status] || map.reported;
    return (
      <span className={`text-xs px-2 py-1 rounded ${meta.cls}`}>
        {meta.label}
      </span>
    );
  };

  const cancelEdit = () => {
    if (originalItemSnapshot) {
      setForm({ ...originalItemSnapshot });
    }
    setPreviewFileName(null);
    setEditing(false);
  };

  return (
    <>
      {/* Compact card */}
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-64 cursor-pointer"
        onClick={() => {
          setOpen(true);
          setEditing(false);
          setForm({
            itemName: item.itemName || "",
            description: item.description || "",
            location: item.location || "",
            pointOfContact: item.pointOfContact || "",
            imageUrl: item.imageUrl || "",
            reportType: item.reportType || "lost",
            status: item.status || "open",
          });
        }}
      >
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.itemName} className="h-48 w-full object-cover" />
        ) : (
          <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
            No image
          </div>
        )}
        <div className="p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{item.itemName}</h3>
            {statusBadge(item.status)}
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setOpen(false);
              setEditing(false);
              cancelEdit();
            }}
          />

          <div className="relative z-10 w-full max-w-3xl bg-white rounded-lg shadow-lg flex flex-col max-h-[95vh]">
            <div className="p-4 sm:p-6 overflow-auto">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-semibold">{item.itemName}</h2>
                  <div className="mt-2">{statusBadge(item.status)}</div>
                  <p className="mt-3 text-sm text-gray-600">{item.description}</p>
                </div>

                <div className="w-full md:w-56 shrink-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.itemName} className="w-full h-56 object-contain rounded" />
                  ) : (
                    <div className="w-full h-56 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                      No image
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 border-t flex flex-col sm:flex-row gap-2 justify-between">
              <button
                onClick={() => {
                  setOpen(false);
                  setEditing(false);
                  cancelEdit();
                }}
                className="px-4 py-2 rounded border"
              >
                Close
              </button>

              {!editing && isOwner && (
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setEditing(true)} className="px-4 py-2 bg-yellow-400 rounded">
                    Edit
                  </button>
                  <button onClick={deleteItem} className="px-4 py-2 bg-red-500 text-white rounded">
                    Delete
                  </button>
                  {item.reportType === "lost" && item.status !== "found" && (
                    <button onClick={() => markAction("found")} className="px-4 py-2 bg-green-600 text-white rounded">
                      Mark Found
                    </button>
                  )}
                  {item.reportType === "found" && item.status !== "handed" && (
                    <button onClick={() => markAction("handed")} className="px-4 py-2 bg-indigo-600 text-white rounded">
                      Mark Handed
                    </button>
                  )}
                  {item.status !== "reported" && (
                    <button onClick={() => markAction("reported")} className="px-4 py-2 bg-gray-300 rounded">
                      Mark Reported
                    </button>
                  )}
                </div>
              )}

              {editing && (
                <div className="flex gap-2">
                  <button onClick={cancelEdit} className="px-4 py-2 border rounded">
                    Cancel
                  </button>
                  <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded">
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}