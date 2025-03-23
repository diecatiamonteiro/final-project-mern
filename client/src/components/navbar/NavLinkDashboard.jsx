import React from "react";
import NavLink from "../NavLink";
import { FaRegCircleUser } from "react-icons/fa6";

export default function NavLinkDashboard({ onClick }) {
  return (
    <>
      <NavLink to="/dashboard" className="font-medium hidden lg:block">
        My Greenroom
      </NavLink>
      <NavLink
        to="/dashboard"
        className="block lg:hidden"
        onClick={onClick}
      >
        <FaRegCircleUser className="text-xl" />
      </NavLink>
    </>
  );
}
