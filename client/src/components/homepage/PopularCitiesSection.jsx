import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCityImage } from "../../utils/unsplashApi";

//! Temporary mock data - will be replaced by data from UsersReducer later
const MOCK_CITIES = [
  { id: 1, name: "Berlin", venueCount: 24 },
  { id: 2, name: "Hamburg", venueCount: 18 },
  { id: 3, name: "Munich", venueCount: 15 },
  { id: 4, name: "Cologne", venueCount: 12 },
  { id: 5, name: "Frankfurt", venueCount: 10 },
  { id: 6, name: "Stuttgart", venueCount: 8 },
  { id: 7, name: "Dresden", venueCount: 6 },
  { id: 8, name: "Leipzig", venueCount: 5 },
];

export default function PopularCitiesSection() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityImages = async () => {
      try {
        //! Later this will be replaced with:
        // 1. Get all venues from UsersReducer
        // 2. Group them by city and count
        // 3. Sort by count to get most popular
        // 4. Take top 8 cities
        const citiesWithImages = await Promise.all(
          MOCK_CITIES.map(async (city) => {
            const imageUrl = await fetchCityImage(city.name);
            return { ...city, imageUrl };
          })
        );
        setCities(citiesWithImages);
      } catch (error) {
        console.error("Error fetching city images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityImages();
  }, []);

  const handleCityClick = (cityName) => {
    //! This will work with the venues filter later
    navigate(`/venues?city=${encodeURIComponent(cityName)}`);
  };

  //! Add a loading state and spinner
  if (loading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Cities
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 full-width-section bg-green/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 text-center lg:text-left flex flex-col justify-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Your Next Stage is Here
          </h2>
          <h3 className="text-xl lg:text-2xl">
            Find where our registered venues are located and book a stage to
            perform.
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-span-2 gap-6">
          {cities.map((city) => (
            <div
              key={city.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleCityClick(city.name)}
            >
              <img
                src={city.imageUrl}
                alt={city.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                <h3 className="text-white text-xl font-semibold">
                  {city.name}
                </h3>
                <p className="text-white text-sm mt-2">
                  {city.venueCount} {city.venueCount === 1 ? "venue" : "venues"}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="text-xs text-gray-500 text-center mt-4">
          Photos by various photographers on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline">Unsplash</a>
        </div> */}
      </div>
    </section>
  );
}
