import React from "react";
import { GalleryUpload } from "./UploadImage";

export default function GallerySection({
  formData,
  handleGalleryImage,
  handleRemoveImage,
}) {
  return (
    <div>
      <h3 className="text-lg md:text-xl font-bold mb-6">Gallery Images</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
          {formData.images.length < 10 && (
            <div className="flex items-center justify-center aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <GalleryUpload
                onImageUpload={handleGalleryImage}
                className="text-xs sm:text-base"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
