import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function FinalSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32 my-24 lg:my-48 px-6 bg-gradient-to-br from-green/30 to-green/90 text-midnightBlack rounded-3xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Ready to Find Your Next Gig?
        </h2>
        <p className="text-xl lg:text-2xl mb-12">
          Join The Greenroom community and connect with venues and artists
          across Germany. Whether you're looking to perform or host, your next
          opportunity awaits.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button to="/register" variant="black" size="large">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
