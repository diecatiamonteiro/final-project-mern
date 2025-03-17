import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavbarDesktop from '../components/navbar/NavbarDesktop'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDesktop />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
