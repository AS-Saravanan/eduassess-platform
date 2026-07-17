import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileSpreadsheet,
  Users,
  Settings,
  LogOut,
  Sparkles,
  X
} from "lucide-react";

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "library", label: "Academic Library", href: "/admin/library", icon: <BookOpen className="h-5 w-5" /> },
    { id: "patterns", label: "Exam Patterns", href: "#", icon: <FileSpreadsheet className="h-5 w-5" />, isPlaceholder: true },
    { id: "students", label: "Students", href: "#", icon: <Users className="h-5 w-5" />, isPlaceholder: true },
    { id: "settings", label: "Settings", href: "#", icon: <Settings className="h-5 w-5" />, isPlaceholder: true },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const isLinkActive = (item: typeof menuItems[0]) => {
    if (item.isPlaceholder) return false;
    return location.pathname === item.href;
  };

  const navList = (
    <nav className="space-y-1.5 flex-1 py-8">
      {menuItems.map((item) => {
        const active = isLinkActive(item);
        const content = (
          <span className="flex items-center gap-3">
            <span className={active ? "text-blue-600" : "text-slate-400"}>
              {item.icon}
            </span>
            <span>{item.label}</span>
            {item.isPlaceholder && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 ml-auto uppercase tracking-wide">
                Soon
              </span>
            )}
          </span>
        );

        if (item.isPlaceholder) {
          return (
            <div
              key={item.id}
              className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 cursor-not-allowed opacity-60"
            >
              {content}
            </div>
          );
        }

        return (
          <Link
            key={item.id}
            to={item.href}
            onClick={onCloseMobile}
            className={`
              w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              ${
                active
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-600 hover:bg-slate-50/80 hover:text-slate-950"
              }
            `}
          >
            <span className="w-full">{content}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* MOBILE DRAWER MENUS */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-slate-900/40" onClick={onCloseMobile} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-slate-100 p-6 shadow-2xl animate-[slide-in_0.2s_ease-out]">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-display font-bold text-slate-950">
                  EduAssess <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded ml-1 font-semibold uppercase tracking-wider">Admin</span>
                </span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none"
                aria-label="Close admin menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {navList}
            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Exit Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 h-screen sticky top-0 px-6 py-8 shadow-sm shrink-0">
        <div className="flex items-center gap-2.5 pb-8 border-b border-slate-100/80">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="font-display text-lg font-bold text-slate-950 tracking-tight">
              EduAssess<span className="text-blue-600 font-extrabold">.</span>
            </span>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">Admin Portal</p>
          </div>
        </div>
        {navList}
        <div className="pt-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50/80 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <LogOut className="h-5 w-5" />
            Exit Portal
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
