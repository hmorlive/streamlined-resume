"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  const [openMenu, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!openMenu);
  };

  const closeMenuAndNavigate = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef]);

  return (
    <>
      <header
        ref={headerRef}
        className={`md:mx-auto w-full ${
          isScrolled ? "fixed bg-opacity-95" : null
        } flex justify-center items-center z-20 bg-white`}
      >
        <nav
          className={`md:container flex items-center w-full p-2 justify-between tracking-tighter`}
        >
          <div className={`flex items-center z-30`}>
            <span className="font-extrabold text-lg">
              <span className="text-sky-950">Streamlined</span>
              <span className="font-light">Resume</span>
            </span>
          </div>
          <Link
            href={"test"}
            className={`
              flex text-sm  m-2 text-center lg:hidden py-3 px-8 action rounded-md
            `}
          >
            About
          </Link>

          <button
            aria-label="navigation menu"
            onClick={toggleMenu}
            className="lg:hidden z-20"
          >
            <FontAwesomeIcon
              icon={openMenu ? faTimes : faBars}
              className={`text-black fa-lg pr-2`}
            />
          </button>
          <div
            className={`${
              openMenu
                ? `fixed top-0 right-0 h-screen w-full bg-gray-50`
                : "hidden bg-transparent"
            } lg:relative lg:flex lg:w-auto full text-[calc(12px+10vh)]`}
          >
            <ul
              className={`${
                openMenu
                  ? "p-4 items-center justify-center text-xl"
                  : "text-sm justify-start"
              } flex ml-0 list-none flex-col space-y-14 overflow-scroll lg:overflow-visible lg:justify-center items-center h-full lg:flex-row lg:space-x-6 lg:space-y-0`}
            >
              <Link href={"/"} className={`hover:opacity-80`}>
                Home
              </Link>
              <Link href={"about  "} className={`hover:opacity-80`}>
                About
              </Link>
              <Link
                href={"start"}
                className="py-2 bg-orange-700 hover:bg-orange-800 text-white rounded-full px-6 font-bold"
              >
                Get Started
              </Link>
            </ul>
          </div>
        </nav>
      </header>
      {isScrolled && <div style={{ height: `${headerHeight}px` }}></div>}
    </>
  );
}
