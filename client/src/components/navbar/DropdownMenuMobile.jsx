import React from "react";
import NavLinkFavourites from "./NavLinkFavourites";
import NavLinkFindArtists from "./NavLinkFindArtists";
import NavLinkFindVenues from "./NavLinkFindVenues";
import NavLinkDashboard from "./NavLinkDashboard";
import BtnLoginSignup from "./BtnLoginSignup";
import BtnLogout from "./BtnLogout";

export default function DropdownMenuMobile({ isMenuOpen, handleNavigation }) {
  return (
    <div
      className={`absolute top-full left-0 w-screen h-screen bg-midnightBlack text-offwhite transform transition-all duration-500 ease-in-out flex flex-col items-center justify-center gap-20 text-center ${
        isMenuOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col gap-4" onClick={handleNavigation}>
        <NavLinkFindArtists />
        <NavLinkFindVenues />
      </div>

      <div onClick={handleNavigation}>
        <BtnLoginSignup />
        <BtnLogout />
      </div>
    </div>
  );
}
