import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-64">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-xs text-gray-400 mt-1">Uploaded by: {item.userName}</p>
      </div>
    </div>
  );
};

export default ItemCard;
