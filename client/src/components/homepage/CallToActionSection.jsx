import React from "react";
import Button from "../Button";
import callToActionImage from "../../assets/homepage/homepage-callToAction.jpg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CallToActionSection() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const isTopInView = useInView(topRef, { once: false, margin: "-100px" });
  const isBottomInView = useInView(bottomRef, {
    once: false,
    margin: "-100px",
  });

  // Animation configurations
  const leftToRightAnimation = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const rightToLeftAnimation = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const getAnimationWithDelay = (baseAnimation, delay) => ({
    ...baseAnimation,
    transition: { ...baseAnimation.transition, delay },
  });

  return (
    <section className="relative min-h-screen md:h-[120vh] full-width-section">
      <div className="absolute inset-0 w-full h-full">
        {/* Background image */}
        <img
          src={callToActionImage}
          alt="Microphone lighted by a spotlight"
          className="w-full h-full object-cover object-center brightness-[0.85]"
        />
        {/* Artist Call to Action */}
        <div
          ref={topRef}
          className="absolute top-0 left-0 mt-10 md:mt-40 w-full"
        >
          <motion.h2
            {...leftToRightAnimation}
            animate={
              isTopInView
                ? leftToRightAnimation.animate
                : leftToRightAnimation.exit
            }
            className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold px-8 xl:px-40"
          >
            Are you an <span className="text-green">artist</span>?
          </motion.h2>
          <motion.p
            {...getAnimationWithDelay(leftToRightAnimation, 0.2)}
            animate={
              isTopInView
                ? leftToRightAnimation.animate
                : leftToRightAnimation.exit
            }
            className="text-white text-base md:text-xl mt-4 md:mt-6 px-8 xl:px-40 max-w-3xl"
          >
            Share your talent with the world. Connect with venues that match
            your style and start performing where you belong.
          </motion.p>
          <motion.div
            {...getAnimationWithDelay(leftToRightAnimation, 0.4)}
            animate={
              isTopInView
                ? leftToRightAnimation.animate
                : leftToRightAnimation.exit
            }
            className="px-4 px-8 xl:px-40 mt-6 md:mt-8"
          >
            <Button variant="outlineWhite" to="/register">
              Create Artist Profile
            </Button>
          </motion.div>
        </div>

        {/* Venue Call to Action */}
        <div
          ref={bottomRef}
          className="absolute bottom-0 left-0 mb-10 md:mb-40 w-full text-right"
        >
          <motion.h2
            {...getAnimationWithDelay(rightToLeftAnimation, 0.3)}
            animate={
              isBottomInView
                ? rightToLeftAnimation.animate
                : rightToLeftAnimation.exit
            }
            className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold px-8 xl:px-40"
          >
            Do you have a <span className="text-green">stage</span>?
          </motion.h2>
          <motion.p
            {...getAnimationWithDelay(rightToLeftAnimation, 0.5)}
            animate={
              isBottomInView
                ? rightToLeftAnimation.animate
                : rightToLeftAnimation.exit
            }
            className="text-white text-base md:text-xl mt-4 md:mt-6 px-8 xl:px-40 ml-auto max-w-3xl"
          >
            Find the perfect performers for your venue. Browse through our list
            of talented artists and create unforgettable experiences for your
            audience.
          </motion.p>
          <motion.div
            {...getAnimationWithDelay(rightToLeftAnimation, 0.7)}
            animate={
              isBottomInView
                ? rightToLeftAnimation.animate
                : rightToLeftAnimation.exit
            }
            className="px-8 xl:px-40 mt-6 md:mt-8"
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
