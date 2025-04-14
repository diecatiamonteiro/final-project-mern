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
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function Homepage() {
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
      <ScrollToTopButton />
    </div>
  );
}
