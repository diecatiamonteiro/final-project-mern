import React, { useState } from "react";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";

export default function TagSelector({
  title,
  tags,
  selectedTags,
  onToggle,
  defaultCategory = null,
}) {
  const isTagsArray = Array.isArray(tags);
  const [activeCategory, setActiveCategory] = useState(
    defaultCategory || (isTagsArray ? null : Object.keys(tags)[0])
  );

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {!isTagsArray && (
        <div className="space-y-4">
          {/* Category Selection Buttons - Make scrollable on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 sm:overflow-x-visible sm:mx-0 sm:px-0">
            <div className="flex space-x-8 border-b border-gray-200 min-w-max sm:min-w-0">
              {Object.keys(tags).map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`
                    py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                    ${
                      activeCategory === category
                        ? "border-green text-green"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tags for Selected Category - Ensure proper wrapping */}
          {activeCategory && (
            <div className="flex flex-wrap gap-2 mt-2 max-w-full">
              {tags[activeCategory].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => onToggle(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedTags?.includes(tag)
                      ? "bg-green text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Venue tags handling */}
      {isTagsArray && (
        <div className="flex flex-wrap gap-2 max-w-full">
          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => onToggle(tag)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedTags?.includes(tag)
                  ? "bg-green text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
