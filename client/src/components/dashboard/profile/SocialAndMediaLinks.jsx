import React from "react";

const SocialMediaLinks = ({
  formData,
  setFormData,
  setHasUnsavedChanges,
  handleSocialLink,
  handleMediaLink,
  user,
}) => {
  return (
    <div className="space-y-8">
      {/* Social Links */}
      <div>
        <h3 className="text-lg md:text-xl font-bold mb-6">Social Links</h3>
        <div className="space-y-4">
          {formData.socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 relative"
            >
              <input
                type="url"
                value={link}
                onChange={(e) => handleSocialLink(e, index)}
                placeholder="Social media URL"
                className="w-full p-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    socialLinks: prev.socialLinks.filter((_, i) => i !== index),
                  }));
                  setHasUnsavedChanges(true);
                }}
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
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                socialLinks: [...prev.socialLinks, ""],
              }));
              setHasUnsavedChanges(true);
            }}
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
            Add Social Link
          </button>
        </div>
      </div>

      {/* Media Links */}
      <div>
        <h3 className="text-lg md:text-xl font-bold mb-6">Media Links</h3>
        <div className="space-y-4">
          {user.role === "artist"
            ? ["YouTube", "Spotify", "SoundCloud"].map((platform) => (
                <div
                  key={platform}
                  className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0"
                >
                  <div className="w-24 flex-shrink-0 text-gray-600">
                    {platform}:
                  </div>
                  <input
                    type="url"
                    value={
                      formData.media.find((m) => m.platform === platform)
                        ?.url || ""
                    }
                    onChange={(e) => handleMediaLink(e, platform)}
                    placeholder={`${platform} URL`}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              ))
            : ["YouTube"].map((platform) => (
                <div
                  key={platform}
                  className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0"
                >
                  <div className="w-24 flex-shrink-0 text-gray-600">
                    {platform}:
                  </div>
                  <input
                    type="url"
                    value={
                      formData.media.find((m) => m.platform === platform)
                        ?.url || ""
                    }
                    onChange={(e) => handleMediaLink(e, platform)}
                    placeholder={`${platform} URL`}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
