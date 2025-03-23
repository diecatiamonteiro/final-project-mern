import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavbarDesktop from '../components/navbar/NavbarDesktop'
import NavbarMobile from '../components/navbar/NavbarMobile'
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDesktop />
      <NavbarMobile />
      <main className="flex-grow pt-[90px]">
        {/* pt-90px so main content is not hidden behind the navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
