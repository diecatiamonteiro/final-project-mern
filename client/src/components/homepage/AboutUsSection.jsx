import React from "react";
import { motion } from "framer-motion";
import homepageAboutUs from "../../assets/homepage/homepage-aboutUs.jpg";
import Button from "../Button";

// Animation variants for reuse
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutUsSection() {
  return (
    <section className="py-24 my-24 flex flex-col lg:flex-row items-center justify-between gap-24 px-6">
      {/* Text */}
      <div className="lg:w-1/2 flex flex-col space-y-8 items-center">
        {/* Title & Intro */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">The Greenroom</h2>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-midnightBlack/70">
            Where Artists Meet Their Stage
          </h2>
          {/* Are you an artist? && Are you a venue owner? */}
          <div className="flex flex-col gap-12 mt-12">
            {/* Are you an artist? */}
            <div className="flex flex-col gap-4 border border-midnightBlack/10 shadow-lg shadow-midnightBlack/30 p-6 rounded-lg hover:shadow-midnightBlack/50 transition-all duration-300">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                I'm an artist
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Are you a musician, comedian, poet, or performer? The Greenroom
                is your spot to find gigs across Germany. Create your profile,
                share your work, and connect with venues that match your style -
                from underground bars and art galleries to jazz clubs and
                cultural spaces. Set your available dates, agree on fair payment
                splits, and focus on what you do best: performing.
              </p>
              {/* Buttons */}
              <motion.div
                className="flex flex-wrap justify-end w-full gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  to="/venues"
                  variant="green"
                  className="w-full md:w-1/2 xl:w-1/3 text-center"
                >
                  Find Your Stage
                </Button>
              </motion.div>
            </div>

            {/* Are you a venue owner? */}
            <div className="flex flex-col gap-4 border border-midnightBlack/10 shadow-lg shadow-midnightBlack/30 p-6 rounded-lg hover:shadow-midnightBlack/50 transition-all duration-300">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                I'm a venue owner
              </h3>
              <p className="text-lg text-gray-600">
                Running a venue? Whether you own a bar, café, club, or
                alternative space, find the right artists to bring your stage to
                life. Browse through local and touring performers, check out
                their work, and book them directly through our platform. You set
                your venue's schedule and revenue split - we handle the booking
                details.
              </p>
              {/* Buttons */}
              <motion.div
                className="flex flex-wrap justify-end w-full gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  to="/artists"
                  variant="green"
                  className="w-full md:w-1/2 xl:w-1/3 text-center"
                >
                  Find Your Performer
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image */}
      <motion.div
        className="lg:w-1/2 flex"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={homepageAboutUs}
          alt="Booking gig in a laptop"
          className="rounded-lg shadow-lg w-full"
          style={{ filter: "grayscale(100%)" }}
        />
      </motion.div>
    </section>
  );
}
