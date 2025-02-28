import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-dark-gray text-white shadow-md py-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">

        {/* Logotyp */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          ProjectHub
        </Link>

        {/* Hamburgermeny-knapp */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigeringslänkar för desktop */}
        <nav className="hidden md:flex space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/projects"
                className="hover:text-light-pink transition duration-300"
              >
                Projekt
              </Link>
            </li>
            <li>
              <Link
                to="/projects/select-customer"
                className="hover:text-light-pink transition duration-300"
              >
                Skapa Projekt
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hamburgermeny som öppnas som en overlay */}
      <div
        className={`fixed inset-0 bg-dark-gray bg-opacity-95 flex flex-col items-center justify-center transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 md:hidden`}
      >
        <button
          className="absolute top-5 right-5 text-white text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          <FiX />
        </button>

        <nav className="text-center">
          <ul className="space-y-6 text-xl">
            <li>
              <Link
                to="/projects"
                className="text-white hover:text-light-pink transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Projekt
              </Link>
            </li>
            <li>
              <Link
                to="/projects/select-customer"
                className="text-white hover:text-light-pink transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Skapa Projekt
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
