import React from "react";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";

export default function Logo({ onClick }) {
  return (
    <Link
      to={"/"}
      className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
      onClick={onClick}
    >
      <img
        src={logo}
        alt="logo"
        className="
          w-full h-full object-contain 
          max-w-[40px] max-h-[40px] 
          lg:max-w-[50px] lg:max-h-[50px]
          transition-transform duration-200"
      />
      <span className="text-base text-xl lg:text-2xl font-bold text-offwhite transition-transform duration-200">
        The Greenroom
      </span>
    </Link>
  );
}
