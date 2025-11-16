// src/components/ItemsList.jsx
import React, { useEffect, useState } from "react";
import { API_BASE } from "../utils/config"; // import from step 1

export default function ItemsList({ fixedType }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // debounced effect for search -> resets page
  useEffect(() => {
    const t = setTimeout(() => setPage(1), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (fixedType) params.set("type", fixedType); // "lost" or "found"
        if (q?.trim()) params.set("q", q.trim());
        params.set("page", String(page));
        params.set("limit", String(limit));

        const res = await fetch(`${API_BASE}/api/items?${params.toString()}`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Fetch failed", res.status);
          setItems([]);
          setTotal(0);
          return;
        }
        const data = await res.json();
        if (!cancelled) {
          setItems(data.items || []);
          setTotal(data.total || 0);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setItems([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [fixedType, q, page, limit]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / limit));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${fixedType ?? "items"} (item name, description)...`}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {loading ? <p>Loading…</p> : null}
      {!loading && items.length === 0 && <p className="text-center py-8">No items found.</p>}

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <li key={it._id} className="border rounded p-3 bg-white">
            <div className="text-xs uppercase opacity-60 mb-1">{it.reportType}</div>
            <div className="font-medium text-lg">{it.itemName}</div>

            {/* image handling: supports empty, data URL, or remote URL */}
            {it.imageUrl ? (
              <img
                src={it.imageUrl}
                alt={it.itemName}
                className="mt-2 h-36 w-full object-cover rounded"
              />
            ) : (
              <div className="mt-2 h-36 w-full bg-gray-100 rounded flex items-center justify-center text-sm opacity-60">
                No image
              </div>
            )}

            {it.description && <p className="text-sm mt-2">{it.description}</p>}
            {it.location && <div className="text-xs mt-2">Location: {it.location}</div>}
            {it.pointOfContact && (
              <div className="mt-2 text-xs opacity-80">Contact: {it.pointOfContact}</div>
            )}
            {it.datePosted && (
              <div className="mt-2 text-xs text-gray-500">
                Posted: {new Date(it.datePosted).toLocaleString()}
              </div>
            )}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-6 justify-center">
          <button className="border rounded px-3 py-1" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
          <div>Page {page} of {totalPages}</div>
          <button className="border rounded px-3 py-1" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
