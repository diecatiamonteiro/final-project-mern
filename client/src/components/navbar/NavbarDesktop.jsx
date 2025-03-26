import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../contexts/Context";
import Logo from "./Logo";
import NavLinkFindArtists from "./NavLinkFindArtists";
import NavLinkFindVenues from "./NavLinkFindVenues";
import NavLinkFavourites from "./NavLinkFavourites";
import NavLinkDashboard from "./NavLinkDashboard";
import BtnLoginSignup from "./BtnLoginSignup";
import BtnLogout from "./BtnLogout";

export default function NavbarDesktop() {
  const { usersState } = useContext(DataContext);
  const { isAuthenticated } = usersState;
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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
      className={`sticky top-0 z-50 px-6 hidden xl:block full-width-nav bg-midnightBlack transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex items-center justify-between py-5 max-width-content">
        {/* Left side: Logo & Navigation Links */}
        <div className="flex items-center">
          <Logo />
          <div className="flex flex-row gap-12 ml-24">
            <NavLinkFindArtists />
            <NavLinkFindVenues />
          </div>
        </div>

        {/* Right side: Login/Signup or Logout, Favourites & Dashboard */}
        <div className="flex flex-row gap-12 ml-32 items-center">
          {isAuthenticated ? (
            <>
              <NavLinkFavourites />
              <NavLinkDashboard />
              <BtnLogout />
            </>
          ) : (
            <>
              <BtnLoginSignup />
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
