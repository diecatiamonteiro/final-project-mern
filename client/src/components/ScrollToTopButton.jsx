import React, { useState, useEffect } from "react";
import Button from "./Button";
import { FaArrowUpLong } from "react-icons/fa6";

export default function ScrollToTopButton() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show button "To Top" after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    // Added scroll-behavior: smooth to index.css to ensure smooth scrolling
  };

  return showScrollButton ? (
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        variant="black"
        size="small"
        className="flex flex-row items-center gap-1"
        onClick={scrollToTop}
      >
        <FaArrowUpLong /> To Top
      </Button>
    </div>
  ) : null;
}
