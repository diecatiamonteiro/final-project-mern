import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchCityImage } from "../../utils/unsplashApi";
import Button from "../Button";
import { FaArrowRightLong } from "react-icons/fa6";
import LoadingSpinner from "../LoadingSpinner";
import { DataContext } from "../../contexts/Context";

export default function PopularCitiesSection() {
  const { usersDispatch, usersState } = useContext(DataContext);
  const { venues, isLoading } = usersState;
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const processCities = async () => {
      try {
        // Process venues to get cities with counts
        const cityCount = venues.reduce((acc, venue) => {
          const city = venue.additionalInfo?.address?.city;
          if (city) {
            acc[city] = (acc[city] || 0) + 1;
          }
          return acc;
        }, {});

        // Convert to array and sort by count
        const processedCities = Object.entries(cityCount)
          .map(([name, venueCount], index) => ({
            id: index + 1,
            name,
            venueCount,
          }))
          .sort((a, b) => b.venueCount - a.venueCount)
          .slice(0, 8);

        // Add images to cities
        const citiesWithImages = await Promise.all(
          processedCities.map(async (city) => {
            const imageUrl = await fetchCityImage(city.name);
            return { ...city, imageUrl };
          })
        );

        setCities(citiesWithImages);
      } catch (error) {
        console.error("Error processing cities:", error);
      }
    };

    if (venues.length > 0) {
      processCities();
    }
  }, [venues]);

  const handleCityClick = (cityName) => {
    window.scrollTo(0, 0);
    navigate(`/venues?city=${encodeURIComponent(cityName)}`);
  };

  if (isLoading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Cities
          </h2>
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 full-width-section bg-green/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-1 text-center lg:text-left flex flex-col justify-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Your Next Stage is Here
          </h2>
          <h3 className="text-xl md:text-2xl mb-8">
            Find where our registered venues are located and book a stage to
            perform.
          </h3>
          <Button
            to="/venues"
            variant="black"
            className="w-fit mx-auto lg:mx-0 lg:text-left flex flex-row items-center gap-2"
          >
            View all Stages <FaArrowRightLong />
          </Button>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-span-2 gap-6"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
