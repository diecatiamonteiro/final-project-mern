import React from "react";
import { motion } from "framer-motion";
import homepageHowItWorks from "../../assets/homepage/homepage-howItWorks.jpg";
import Button from "../Button";

// Animation variants for reuse
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function StepCard({ number, title, description }) {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-3 flex-shrink-0">
        {number}
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
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
    <section className="py-24 my-24 flex flex-col lg:flex-row items-start justify-between gap-16 px-6">
      {/* Image */}
      <motion.div
        className="lg:w-1/2 flex"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={homepageHowItWorks}
          alt="Booking gig in a laptop"
          className="rounded-lg shadow-lg w-full"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col space-y-8 items-center text-center lg:text-left"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Title & Intro */}
        <div className="text-center lg:text-left">
          <h2 className="text-6xl font-bold mb-2">How It Works</h2>
          <p className="text-lg text-gray-600">
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
        <motion.div
          className="flex flex-col w-full gap-4 pt-6 md:flex-row lg:flex-wrap justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button to="/venues" variant="green">
            Find a Stage
          </Button>
          <Button to="/artists" variant="green">
            Discover Artists
          </Button>
          <Button to="/register" variant="outlineGreen">
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
