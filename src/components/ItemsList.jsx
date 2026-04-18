import React, { useEffect, useState } from "react";
import { API_BASE } from "../utils/config";
import ItemCard from "./ItemCard";
import Fuse from "fuse.js";

export default function ItemsList({ fixedType }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [mineOnly, setMineOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const searchText = q.trim();

  useEffect(() => {
    const t = setTimeout(() => setPage(1), 250);
    return () => clearTimeout(t);
  }, [q, mineOnly, statusFilter]);

  const load = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (fixedType) params.set("type", fixedType);
      params.set("page", searchText ? "1" : page);
      params.set("limit", searchText ? "1000" : limit);

      let url = `${API_BASE}/api/items?${params}`;
      let opts = {};

      if (mineOnly) {
        url = `${API_BASE}/api/items/mine?${params}`;

        const token = localStorage.getItem("token");

        if (token) {
          opts.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
      }

      const res = await fetch(url, opts);
      const data = await res.json();

      let allItems = (data.items || []).map((it) => ({
        ...it,
        status: it.status || "reported",
      }));

      if (statusFilter) {
        allItems = allItems.filter(
          (it) => it.status === statusFilter
        );
      }

      let finalItems = allItems;

      if (searchText) {
        const fuse = new Fuse(allItems, {
          keys: [
            "itemName",
            "description",
            "location",
            "pointOfContact",
          ],
          threshold: 0.45,
          ignoreLocation: true,
        });

        finalItems = fuse.search(searchText).map(r => r.item);
      }

      if (page === 1 || searchText) {
        setItems(finalItems);
      } else {
        setItems(prev => [...prev, ...finalItems]);
      }

      setTotal(data.total || 0);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [fixedType, q, page, mineOnly, statusFilter]);

  const refresh = () => load();

  const handleLensSearch = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_BASE}/api/image-search`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      let found = data.items || [];

      if (fixedType) {
        found = found.filter(
          (it) => it.reportType === fixedType
        );
      }

      setItems(found);
      setTotal(found.length);

    } catch (err) {
      console.error(err);
      alert("Image search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      <div className="flex flex-wrap gap-2 mb-5">

        <button
          onClick={() => setMineOnly(!mineOnly)}
          className="border px-3 py-1 rounded"
        >
          {mineOnly ? "My Posts" : "Show My Posts"}
        </button>

        <button
          onClick={() => {
            setStatusFilter("");
            setMineOnly(false);
            setQ("");
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          Show All
        </button>

      </div>

      <div className="flex gap-2 mb-5">
        <input
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          placeholder="Search..."
          className="border rounded px-3 py-2 w-full"
        />

        <label className="border px-3 py-2 rounded cursor-pointer">
          📷
          <input
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={handleLensSearch}
          />
        </label>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && items.length === 0 && (
        <p>No items found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {items.map((it) => (
          <ItemCard
            key={it._id}
            item={it}
            onChange={refresh}
          />
        ))}

      </div>

      {!loading &&
        !searchText &&
        items.length < total && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage(p => p + 1)}
              className="text-themeGreen font-semibold"
            >
              Load More
            </button>
          </div>
        )}
    </div>
  );
}