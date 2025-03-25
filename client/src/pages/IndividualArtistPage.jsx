import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import Button from "../components/Button";

export default function IndividualArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Artist not found");
        }
        const data = await response.json();
        setArtist(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Artist not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Profile Picture */}
        <div className="md:w-1/3">
          <img
            src={artist.profilePicture}
            alt={artist.name}
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Artist Info */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>
          <div className="flex gap-2 mb-4">
            {artist.type?.map((type) => (
              <span
                key={type}
                className="bg-green/10 text-green px-3 py-1 rounded-full text-sm"
              >
                {type}
              </span>
            ))}
            {artist.additionalInfo?.genre?.map((genre) => (
              <span
                key={genre}
                className="bg-midnightBlack/10 text-midnightBlack px-3 py-1 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-gray-600 mb-6">{artist.description}</p>
          <Button variant="green">Request Booking</Button>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Availability</h2>
        <AvailabilityCalendar
          selectedDates={artist.availability || []}
          onDateSelect={() => {}} // This will be handled differently for viewing vs booking
        />
      </div>

      {/* Media Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artist.media?.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-green">{item.platform}</p>
              <p className="truncate">{item.url}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artist.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${artist.name} performance ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Connect</h2>
        <div className="flex gap-4">
          {artist.socialLinks?.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green hover:text-greenHover"
            >
              Social Link {index + 1}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
