import React from "react";
import ItemsList from "../components/ItemsList";

export default function LostItemsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            Lost Items
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ItemsList fixedType="lost" />
        </div>
      </main>

    </div>
  );
}
