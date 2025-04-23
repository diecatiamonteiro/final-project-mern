import React from "react";
import Button from "../Button";
import callToActionImage from "../../assets/homepage/homepage-callToAction.jpg";
import { motion } from "framer-motion";

export default function CallToActionSection() {
  // Animation configurations
  const leftToRightAnimation = {
    initial: { x: -100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const rightToLeftAnimation = {
    initial: { x: 100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: false, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const getAnimationWithDelay = (baseAnimation, delay) => ({
    ...baseAnimation,
    transition: { ...baseAnimation.transition, delay },
  });

  return (
    <section className="relative min-h-[120vh] sm:min-h-screen md:h-[120vh] w-full overflow-x-hidden full-width-section">
      <div className="absolute inset-0 w-full h-full overflow-x-hidden">
        {/* Background image */}
        <img
          src={callToActionImage}
          alt="Microphone lighted by a spotlight"
          className="w-full h-full object-cover object-center brightness-[0.85]"
        />
        {/* Artist Call to Action */}
        <div className="absolute top-0 left-0 mt-10 lg:mt-28 2xl:mt-32 px-8 lg:px-28 2xl:px-32 w-full">
          <motion.h2
            {...leftToRightAnimation}
            className="text-white text-3xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl font-bold "
          >
            Are you an <span className="text-green">artist</span>?
          </motion.h2>
          <motion.p
            {...getAnimationWithDelay(leftToRightAnimation, 0.2)}
            className="text-white text-base md:text-xl mt-4 md:mt-6 max-w-xl lg:max-w-2xl"
          >
            Share your talent with the world. Connect with venues that match
            your style and start performing where you belong.
          </motion.p>
          <motion.div
            {...getAnimationWithDelay(leftToRightAnimation, 0.4)}
            className="mt-6 md:mt-8"
          >
            <Button variant="outlineWhite" to="/register">
              Create Artist Profile
            </Button>
          </motion.div>
        </div>

        {/* Venue Call to Action */}
        <div className="absolute bottom-0 right-0 mb-10 lg:mb-28 2xl:mb-32 px-8 lg:px-28 2xl:px-32 w-full text-right">
          <motion.h2
            {...getAnimationWithDelay(rightToLeftAnimation)}
            className="text-white text-3xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl font-bold"
          >
            Do you have a <span className="text-green">stage</span>?
          </motion.h2>
          <motion.p
            {...getAnimationWithDelay(rightToLeftAnimation, 0.2)}
            className="text-white text-base md:text-xl mt-4 md:mt-6 max-w-xl lg:max-w-2xl ml-auto"
          >
            Find the perfect performers for your venue and create unforgettable experiences for your
            audience.
          </motion.p>
          <motion.div
            {...getAnimationWithDelay(rightToLeftAnimation, 0.4)}
            className=" mt-6 md:mt-8"
          >
            <Button variant="outlineWhite" to="/register">
              Register Your Venue
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
