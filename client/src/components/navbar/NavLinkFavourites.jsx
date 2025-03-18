import React from "react";
import NavLink from "../NavLink";

export default function NavLinkFavourites() {
  return (
    <NavLink to="/favourites" className="font-medium">
      My Favourites
    </NavLink>
  );
}

//! Heart with border only
// import { FaRegHeart } from "react-icons/fa";
// <FaRegHeart />

//! Heart with border and fill
// import { FaHeart } from "react-icons/fa";
// <FaHeart />