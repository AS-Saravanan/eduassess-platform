import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, LogIn, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/", sectionId: "hero" },
    { label: "Features", href: "/", sectionId: "features" },
    { label: "About", href: "/", sectionId: "about" },
    { label: "Contact", href: "/", sectionId: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
    if (sectionId && location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${
            isScrolled
              ? "bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm"
              : "bg-transparent border-b border-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="flex items-center">
              EduAssess
              <span className="text-blue-600 font-extrabold ml-0.5">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.sectionId)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-all"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <Button variant="ghost" size="sm" leftIcon={<LogIn className="h-4 w-4" />}>
                Log In
              </Button>
            </Link>
            <Link to="/login" className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100/80 active:bg-slate-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
};
