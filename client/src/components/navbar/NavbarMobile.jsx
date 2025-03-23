import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import BtnHamburgerMobile from "./BtnHamburgerMobile";
import DropdownMenuMobile from "./DropdownMenuMobile";
import NavLinkFavourites from "./NavLinkFavourites";
import NavLinkDashboard from "./NavLinkDashboard";

export default function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleNavigation = () => {
    setIsMenuOpen(false); // Close the menu after navigation
  };

  // Hide navbar when scrolling down, show when scrolling up or at the top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos; // Determine if scrolling up or down
      setVisible(!isScrollingDown || currentScrollPos < 10); // Update visibility based on scroll direction
      setPrevScrollPos(currentScrollPos); // Save current position for next comparison
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`sticky top-0 z-50 px-4 lg:px-6 xl:hidden full-width-nav bg-midnightBlack transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex items-center justify-between py-5 max-width-content">
        <div className="w-full flex justify-between items-center">
          <div>
            <Logo onClick={handleNavigation} />
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <NavLinkFavourites onClick={handleNavigation} />
              <NavLinkDashboard onClick={handleNavigation} />
            </div>

            <BtnHamburgerMobile
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
            />
          </div>
        </div>
        <DropdownMenuMobile
          isMenuOpen={isMenuOpen}
          handleNavigation={handleNavigation}
        />
      </nav>
    </div>
  );
}
