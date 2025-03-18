import React, { useContext } from "react";
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

  return (
    <div className="sticky top-0 z-10 hidden lg:block full-width-nav bg-midnightBlack">
      <nav className="flex items-center justify-between py-5 max-width-content">
        {/* Left side: Logo & Navigation Links */}
        <div className="flex items-center">
          <Logo />
          <div className="flex flex-row gap-12 ml-24">
            <NavLinkFindArtists />
            <NavLinkFindVenues />
          </div>
        </div>

        {/* Right side: Login/Signup & Favourites, Dashboard, Logout */}
        <div className="flex flex-row gap-12 ml-32 items-center">
          <BtnLoginSignup />
          <NavLinkFavourites />
          <NavLinkDashboard />
          <BtnLogout />
        </div>
      </nav>
    </div>
  );
}
