import React, { useState, useEffect } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

//! Temporary mock data - will be replaced by data from UsersReducer later
const MOCK_PROFILES = {
  artists: [
    {
      id: 1,
      name: "Sarah Schmidt",
      type: "Artist",
      performanceType: "Music",
      genre: ["Jazz", "Soul"],
      imageUrl:
        "https://images.unsplash.com/photo-1522863602463-afebb8886ab2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "The Hamburg Quartet",
      type: "Artist",
      performanceType: "Music",
      genre: ["Classical"],
      imageUrl:
        "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "The Hamburg Quartet",
      type: "Artist",
      performanceType: "Music",
      genre: ["Classical"],
      imageUrl:
        "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  venues: [
    {
      id: 3,
      name: "Jazz Club Berlin",
      type: "Venue",
      venueType: "Jazz Club",
      city: "Berlin",
      revenueSplit: "80% Artist, 20% Venue",
      imageUrl:
        "https://images.unsplash.com/photo-1562049070-7e003d30a3d9?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Rockfabrik",
      type: "Venue",
      venueType: "Live Music Venue",
      city: "Hamburg",
      revenueSplit: "70% Artist, 30% Venue",
      imageUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Rockfabrik",
      type: "Venue",
      venueType: "Live Music Venue",
      city: "Hamburg",
      revenueSplit: "70% Artist, 30% Venue",
      imageUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
};

export default function FeaturedArtistsAndVenues() {
  const [profiles, setProfiles] = useState({ artists: [], venues: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        //! Later this will be replaced with:
        // 1. Get users from UsersReducer
        // 2. Filter by role (artist/venue)
        // 3. Sort by some criteria (e.g., booking count, rating)
        // 4. Take top 2 from each category
        setProfiles(MOCK_PROFILES);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (type, id) => {
    navigate(`/${type.toLowerCase()}s/${id}`);
  };

  //! Loading state => to add later the spinner and loading state
  if (loading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured on The Greenroom
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-24 my-24 lg:my-48 px-6 bg-white full-width-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-left mb-12 lg:mb-16">
          Featured on The Greenroom
        </h2>

        {/* Artists Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Featured Artists
            </h3>
            <Button
              to="/artists"
              variant="outlineGreen"
              size="medium"
              className="flex flex-row items-center gap-2"
            >
              View All Artists <FaArrowRightLong />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.artists.map((profile) => (
              <div
                key={profile.id}
                className="bg-offwhite border border-midnightBlack/10 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
                onClick={() => handleProfileClick(profile.type, profile.id)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl md:text-2xl mb-2">
                    {profile.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {profile.performanceType}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.genre.map((genre) => (
                      <span
                        key={genre}
                        className="bg-green/40 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venues Section */}
        <div>
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Featured Venues
            </h3>
            <Button
              to="/artists"
              variant="outlineGreen"
              className="flex flex-row items-center gap-2"
            >
              View All Venues <FaArrowRightLong />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.venues.map((profile) => (
              <div
                key={profile.id}
                className="bg-offwhite border border-midnightBlack/10 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
                onClick={() => handleProfileClick(profile.type, profile.id)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4 p-2 bg-offwhite rounded-lg shadow-lg">
                  <p className="text-sm font-semibold">
                    Split: {profile.revenueSplit}
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl md:text-2xl mb-2">
                    {profile.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{profile.venueType}</p>
                  <p className="text-gray-500 text-sm">
                    <span className="inline-block mr-2">
                      <IoLocationOutline />
                    </span>
                    {profile.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
