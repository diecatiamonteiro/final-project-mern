import React from "react";
import heroImage from "../../assets/homepage/homepage-heroImage.jpg";
import SearchBar from "../SearchBar";
import Button from "../Button";

export default function HeroSection() {
  return (
    <div className="relative h-screen mt-[-50px]">
      <div className="full-width-section">
        <img
          src={heroImage}
          alt="stage set for a gig"
          className="object-cover w-full h-screen brightness-75"
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-full px-4 lg:px-6 2xl:px-0">
        <div className="max-width-content h-full flex flex-col justify-center">
          {/* Intro Text & Buttons */}
          <div className="text-offwhite max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find the right{" "}
              <span className="text-emerald-400 leading-snug">stage</span>.
              Discover the right{" "}
              <span className="text-emerald-400">talent</span>.
            </h1>
            <h2 className="text-xl md:text-2xl font-medium mb-8 text-offwhite bg-midnightBlack/60 rounded-lg xl:bg-transparent">
              The Greenroom helps artists in Germany find the perfect venues to
              perform and gives venues access to incredible talent. Whether
              you're looking for your next gig or booking your next performer,
              start here.
            </h2>

            <div className="flex flex-wrap gap-4 mt-6 text-center">
              <Button to="/venues" variant="green">
                Find a Stage
              </Button>
              <Button to="/artists" variant="green">
                Discover Artists
              </Button>
              <Button to="/register" variant="outlineWhite">
                Join The Greenroom
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className="w-full mt-8">
            <SearchBar className="w-full" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
