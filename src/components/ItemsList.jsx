// src/components/ItemsList.jsx
import React, { useEffect, useState } from "react";
import { API_BASE } from "../utils/config";
import ItemCard from "./ItemCard";

/**
 * Props:
 * - fixedType: optional "lost" or "found" to filter this list
 */
export default function ItemsList({ fixedType }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [mineOnly, setMineOnly] = useState(false);

  const [statusFilter, setStatusFilter] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUserId = currentUser?._id ?? currentUser?.id ?? null;

  useEffect(() => {
    const t = setTimeout(() => setPage(1), 250);
    return () => clearTimeout(t);
  }, [q, mineOnly, statusFilter]);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (fixedType) params.set("type", fixedType);
      if (q?.trim()) params.set("q", q.trim());
      params.set("page", String(page));
      params.set("limit", String(limit));

      let url = `${API_BASE}/api/items?${params.toString()}`;
      let opts = { credentials: "include" };

      if (mineOnly) {
        url = `${API_BASE}/api/items/mine?${params.toString()}`;
        const token = localStorage.getItem("token");
        if (token) {
          opts = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
        } else {
          opts = { credentials: "include" };
        }
      }

      const res = await fetch(url, opts);
      if (!res.ok) {
        if (res.status === 401) {
          alert("Please login to view.");
        } else {
          console.error("Fetch failed", res.status);
        }
        setItems([]);
        setTotal(0);
        setLoading(false);
        return;
      }

      const data = await res.json();

      const allItems = (data.items || []).map((it) => ({
        ...it,
        status: it.status || "reported",
      }));

      const filtered = statusFilter
        ? allItems.filter((it) => it.status === statusFilter)
        : allItems;

      setItems(filtered);
      setTotal(filtered.length);
    } catch (e) {
      console.error(e);
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixedType, q, page, limit, mineOnly, statusFilter]);

  const refresh = () => load();

  const totalPages = Math.max(1, Math.ceil((total || 0) / limit));

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">
          {fixedType === "lost"
            ? "Lost Items"
            : fixedType === "found"
            ? "Found Items"
            : "Items"}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={fixedType === "lost" ? "/lost" : "/found"}
            className="px-4 py-2 bg-themeGreen text-white rounded text-sm"
          >
            Report {fixedType === "lost" ? "Lost" : "Found"} Item
          </a>

          <button
            onClick={() => setMineOnly((m) => !m)}
            className={`px-3 py-1 border rounded text-sm ${
              mineOnly ? "bg-gray-100" : ""
            }`}
          >
            {mineOnly ? "Showing: My Posts" : "Show My Posts"}
          </button>

          {fixedType === "lost" && (
            <button
              onClick={() => {
                setStatusFilter((prev) => (prev === "found" ? "" : "found"));
                setPage(1);
              }}
              className={`px-3 py-1 border rounded text-sm ${
                statusFilter === "found" ? "bg-gray-100" : ""
              }`}
            >
              {statusFilter === "found" ? "Showing: Found" : "Items Found"}
            </button>
          )}

          {fixedType === "found" && (
            <button
              onClick={() => {
                setStatusFilter((prev) => (prev === "handed" ? "" : "handed"));
                setPage(1);
              }}
              className={`px-3 py-1 border rounded text-sm ${
                statusFilter === "handed" ? "bg-gray-100" : ""
              }`}
            >
              {statusFilter === "handed"
                ? "Showing: Handed"
                : "Items Handed"}
            </button>
          )}

          {fixedType && (
            <button
              onClick={() => {
                setStatusFilter("");
                setQ("");
                setMineOnly(false);
                setPage(1);
              }}
              className="px-3 py-1 border rounded text-sm"
              title={`Show all ${
                fixedType === "lost" ? "lost" : "found"
              } items`}
            >
              Show All
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${fixedType ?? "items"} (item name, description)...`}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {loading ? <p>Loading…</p> : null}
      {!loading && items.length === 0 && (
        <p className="text-center py-8">No items found.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <li key={it._id} className="p-1">
            <ItemCard item={it} onChange={refresh} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center gap-2 mt-6 justify-center">
          <button
            className="border rounded px-3 py-1"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <div>
            Page {page} of {totalPages}
          </div>
          <button
            className="border rounded px-3 py-1"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}