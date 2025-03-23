import React from "react";
import NavLink from "../NavLink";
import { FaRegHeart } from "react-icons/fa";

export default function NavLinkFavourites({ onClick }) {
  return (
    <>
      <NavLink to="/favourites" className="font-medium hidden lg:block">
        My Favourites
      </NavLink>
      <NavLink
        to="/favourites"
        className="block lg:hidden"
        onClick={onClick}
      >
        <FaRegHeart className="text-xl" />
      </NavLink>
    </>
  );
}

//! Heart with border only
// import { FaRegHeart } from "react-icons/fa";
// <FaRegHeart />

//! Heart with border and fill
// import { FaHeart } from "react-icons/fa";
// <FaHeart />