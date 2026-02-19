import React from "react";
import ItemsList from "../components/ItemsList";

export default function FoundItemsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
            Found Items
          </h1>
        </div>
      </header>

      <main className="py-4 sm:py-6 px-2 sm:px-4">
        <ItemsList fixedType="found" />
      </main>
    </div>
  );
}