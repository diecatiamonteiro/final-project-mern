import React from "react";
import { REVENUE_SPLIT_OPTIONS } from "../../../constants";

const VenueOperationsForm = ({
  formData,
  setFormData,
  setHasUnsavedChanges,
  handleTimeArrayChange,
  handleAddTime,
  handleRemoveTime,
}) => {
  return (
    <div className="space-y-6">
      {/* Revenue Split */}
      <div className="border border-midnightBlack/10 p-4 rounded-lg">
        <h4 className="font-semibold mb-6">Venue Operations</h4>
        <div className="space-y-3">
          <div className="border border-midnightBlack/10 p-4 rounded-lg">
            <label className="block font-bold text-gray-700 mb-1">
              Revenue Split<span className="text-green">*</span>
            </label>
            <select
              name="revenueSplit"
              value={formData.additionalInfo.revenueSplit}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  additionalInfo: {
                    ...prev.additionalInfo,
                    revenueSplit: e.target.value,
                  },
                }));
                setHasUnsavedChanges(true);
              }}
              className="w-full p-2 border rounded-lg bg-white"
            >
              <option value="">Select a revenue split</option>
              {REVENUE_SPLIT_OPTIONS.map((split) => (
                <option key={split} value={split}>
                  {split.split("/")[0] || "Not Set "}% artist /{" "}
                  {split.split("/")[1] || "Not Set "}% venue
                </option>
              ))}
            </select>
          </div>

          {/* Times Arrays */}
          <div className="grid md:grid-cols-2 gap-4">
            {["openingTimes", "performingTimes"].map((timeType) => (
              <div
                key={timeType}
                className="border border-midnightBlack/10 p-4 rounded-lg"
              >
                <label className="block font-bold text-gray-700 mb-1">
                  {timeType === "openingTimes" ? (
                    <>
                      Opening Times<span className="text-green">*</span>
                    </>
                  ) : (
                    <>
                      Performance Times<span className="text-green">*</span>
                    </>
                  )}
                </label>
                {formData.additionalInfo[timeType].some(
                  (time) => time.trim() === ""
                ) && (
                  <p className="text-red-500 text-sm mb-2">
                    Please type in a time
                  </p>
                )}
                <div className="space-y-2">
                  {formData.additionalInfo[timeType].map((time, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={time}
                        onChange={(e) =>
                          handleTimeArrayChange(timeType, index, e.target.value)
                        }
                        className="w-full p-2 border rounded-lg"
                        placeholder={`E.g. ${
                          timeType === "openingTimes"
                            ? "19:00 - 23:00"
                            : "20:00 - 22:00"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTime(timeType, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
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
                  <button
                    type="button"
                    onClick={() => handleAddTime(timeType)}
                    className="text-green hover:text-greenHover flex items-center gap-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add{" "}
                    {timeType === "openingTimes" ? "Opening" : "Performance"}{" "}
                    Time
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueOperationsForm;
