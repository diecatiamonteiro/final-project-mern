import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export default function PhotoGalleryModal({
  showAllPhotos,
  selectedPhoto,
  setShowAllPhotos,
  setSelectedPhoto,
  profilePicture,
  images,
  name
}) {
  const allPhotos = [profilePicture, ...(images || [])];

  const handleClose = () => {
    setShowAllPhotos(false);
    setSelectedPhoto(null);
  };

  return (
    showAllPhotos && (
      <div className="fixed inset-0 bg-black/90 z-50 overflow-hidden">
        {selectedPhoto !== null ? (
          // Carousel View
          <div className="fixed inset-0 flex items-center justify-center p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <FaTimes size={24} />
            </button>

            <button
              onClick={() =>
                setSelectedPhoto((prev) =>
                  prev > 0 ? prev - 1 : allPhotos.length - 1
                )
              }
              className="absolute left-4 text-white hover:text-gray-300"
            >
              <FaChevronLeft size={24} />
            </button>

            <img
              src={allPhotos[selectedPhoto]}
              alt={`Photo ${selectedPhoto + 1}`}
              className="max-h-[80vh] max-w-[80vw] object-contain"
            />

            <button
              onClick={() =>
                setSelectedPhoto((prev) =>
                  prev < allPhotos.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-4 text-white hover:text-gray-300"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        ) : (
          // Grid View
          <div className="p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-300"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 container mx-auto">
              {allPhotos.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPhoto(index)}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img
                    src={image}
                    alt={`${name} photo ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
}
