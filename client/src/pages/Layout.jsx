import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarDesktop from "../components/navbar/NavbarDesktop";
import NavbarMobile from "../components/navbar/NavbarMobile";
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDesktop />
      <NavbarMobile />
      <main className="flex-grow pt-[130px] lg:pt-[200px] px-4 lg:px-6 xl:px-0">
        {/* pt-[] so main content is not hidden behind the navbar; img from hero section has mt-[-110px] so it can touch border of navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
