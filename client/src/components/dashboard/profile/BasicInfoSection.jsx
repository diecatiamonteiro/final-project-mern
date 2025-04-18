import React from "react";

export default function BasicInfoSection({ formData, handleChange, user }) {
  return (
    <div className="flex-grow w-full">
      <h3 className="text-lg md:text-xl font-bold mb-4">
        Basic Information<span className="text-green">*</span>
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={user.role === "artist" ? "Artist Name" : "Venue Name"}
          className="w-full p-2 border rounded-lg"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded-lg h-32"
        />
      </div>
    </div>
  );
}
