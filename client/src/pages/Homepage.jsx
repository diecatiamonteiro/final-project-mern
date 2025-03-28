import React, { useState, useEffect } from "react";
import HeroSection from "../components/homepage/HeroSection";
import HowItWorksSection from "../components/homepage/HowItWorksSection";
import FaqsSection from "../components/homepage/FaqsSection";
import StatisticsSection from "../components/homepage/StatisticsSection";
import CallToActionSection from "../components/homepage/CallToActionSection";
import AboutUsSection from "../components/homepage/AboutUsSection";
import PopularCitiesSection from "../components/homepage/PopularCitiesSection";
import FeaturedArtistsAndVenues from "../components/homepage/FeaturedArtistsAndVenues";
import FinalSection from "../components/homepage/FinalSection";
import Button from "../components/Button";

export default function Homepage() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show button "To Top" after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <AboutUsSection />
      <CallToActionSection />
      <HowItWorksSection />
      <PopularCitiesSection />
      <FeaturedArtistsAndVenues />
      <FaqsSection />
      <FinalSection />
      {showScrollButton && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            variant="black"
            size="small"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            To Top
          </Button>
        </div>
      )}
    </div>
  );
}
