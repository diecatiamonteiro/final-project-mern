import React, { useState } from "react";
import Logo from "./Logo";
import BtnHamburgerMobile from "./BtnHamburgerMobile";
import DropdownMenuMobile from "./DropdownMenuMobile";
import NavLinkFavourites from "./NavLinkFavourites";
import NavLinkDashboard from "./NavLinkDashboard";

export default function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNavigation = () => {
    setIsMenuOpen(false); // Close the menu after navigation
  };
  return (
    <div
      className={`sticky top-0 z-10 px-3 xl:hidden full-width-nav bg-midnightBlack transition-transform duration-300`}
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
