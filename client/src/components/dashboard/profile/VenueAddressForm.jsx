import React from "react";

const VenueAddressForm = ({ formData, handleAddressChange }) => {
  return (
    <div className="border border-midnightBlack/10 p-4 rounded-lg">
      <h4 className="text-md font-semibold mb-6">Address</h4>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Name<span className="text-green">*</span>
          </label>
          <input
            type="text"
            name="streetName"
            value={formData.additionalInfo.address.streetName}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number<span className="text-green">*</span>
          </label>
          <input
            type="text"
            name="number"
            value={formData.additionalInfo.address.number}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code<span className="text-green">*</span>
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.additionalInfo.address.zipCode}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City<span className="text-green">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.additionalInfo.address.city}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueAddressForm;
