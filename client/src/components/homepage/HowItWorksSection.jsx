import React from "react";
import homepageHowItWorks from "../../assets/homepage/homepage-howItWorks.jpg";
import Button from "../Button";
import { motion } from "framer-motion";

function StepCard({ number, title, description }) {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-3 flex-shrink-0">
        {number}
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-base lg:text-lg text-gray-600">{description}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description:
        "Sign up as an artist or venue and build your profile. Upload media, photos, and set your availability.",
    },
    {
      number: 2,
      title: "Browse & Discover",
      description:
        "Explore venues or artists. Use filters to find the perfect match based on location and type.",
    },
    {
      number: 3,
      title: "Book a Gig",
      description:
        "Request a booking on available dates. Both artists and venues can initiate bookings.",
    },
    {
      number: 4,
      title: "Perform & Connect",
      description:
        "Once confirmed, connect with your match and manage all your gigs in your dashboard.",
    },
  ];

  return (
    <section className="py-24 mb-12 lg:my-24 flex flex-col lg:flex-row items-start justify-between gap-16 px-6">
      {/* Image */}
      <div className="lg:w-1/2 flex">
        <img
          src={homepageHowItWorks}
          alt="Booking gig in a laptop"
          className="rounded-lg shadow-lg w-full"
        />
      </div>

      {/* Text */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-8 items-center text-center lg:text-left">
        {/* Title & Intro */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            The Greenroom connects artists with stages in Germany for
            performances, jam sessions, and gigs. Follow these steps to get
            started:
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col w-full gap-4 pt-6 md:flex-row lg:flex-wrap justify-center lg:justify-start">
          <Button to="/venues" variant="green">
            Find a Stage
          </Button>
          <Button to="/artists" variant="green">
            Discover Artists
          </Button>
          <Button to="/register" variant="outlineGreen">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
