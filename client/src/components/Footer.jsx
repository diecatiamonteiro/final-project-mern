import React from "react";
import { Link } from "react-router-dom";
import Logo from "./navbar/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-auto full-width-section bg-midnightBlack px-6 lg:px-6">
      <footer className="max-width-content py-12">
        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="text-offwhite/90 mt-4 text-sm">
              Connecting artists with venues across Germany.
            </p>
            <p className="text-offwhite/90 text-sm">Find your stage. </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-offwhite font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/artists"
                  className="text-offwhite/90 hover:text-offwhite text-sm"
                >
                  Find Artists
                </Link>
              </li>
              <li>
                <Link
                  to="/venues"
                  className="text-offwhite/90 hover:text-offwhite text-sm"
                >
                  Find Venues
                </Link>
              </li>
              <li>
                <Link
                  to="/favourites"
                  className="text-offwhite/90 hover:text-offwhite text-sm"
                >
                  My Favourites
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-offwhite/90 hover:text-offwhite text-sm"
                >
                  My Greenroom
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-offwhite font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-offwhite/90 hover:text-offwhite text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-offwhite/90 hover:text-offwhite text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-offwhite/90 hover:text-offwhite text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-offwhite/90 hover:text-offwhite text-sm"
                >
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-offwhite font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-offwhite/90 text-sm">Berlin, Germany</li>
              <li className="text-offwhite/90 text-sm">
                <a href="mailto:thegreenroom.notifications@gmail.com">
                  thegreenroom.notifications@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-offwhite/10">
          <p className="text-offwhite/70 text-sm text-center">
            © {currentYear} The Greenroom. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
