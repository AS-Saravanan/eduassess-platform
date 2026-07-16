import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, LogIn, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string; sectionId?: string }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links }) => {
  const location = useLocation();

  // Listen for escape key presses to close the mobile drawer
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string, sectionId?: string) => {
    onClose();
    if (sectionId && location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900 md:hidden"
          />

          {/* Menu Drawer */}
          <motion.div
            id="mobile-menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                EduAssess
              </span>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-lg text-slate-500 hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1 mb-8">
              {links.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => handleLinkClick(link.href, link.sectionId)}
                    className={`
                      px-4 py-3 rounded-lg text-base font-medium transition-all duration-150
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="mt-auto flex flex-col gap-3">
              <Link to="/login" onClick={onClose} className="w-full">
                <Button variant="outline" size="lg" className="w-full justify-center" leftIcon={<LogIn className="h-4 w-4" />}>
                  Log In
                </Button>
              </Link>
              <Link to="/register" onClick={onClose} className="w-full">
                <Button variant="primary" size="lg" className="w-full justify-center" leftIcon={<UserPlus className="h-4 w-4" />}>
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
