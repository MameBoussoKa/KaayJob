import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { Menu, X, Bell, Home, Phone, User } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount] = useState(3);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-12œxl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              onNavigate("home");
              setIsMenuOpen(false);
            }}
          >
            <Logo />
            <span className="text-xl font-bold text-[#000080]">KaayJob</span>
          </div>

          {/* Desktop Menu - Center */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
            {/* Home Icon */}
            <button
              onClick={() => onNavigate("home")}
              className={`p-2 transition-all duration-300 rounded-lg ${
                currentPage === "home"
                  ? "text-[#000080] bg-[#FFF4EA]"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#000080]"
              }`}
              title="Accueil"
            >
              <Home size={20} />
            </button>

            {/* Services - Text */}
            <button
              onClick={() => onNavigate("categories")}
              className={`px-4 py-2 font-semibold text-sm transition-all duration-300 rounded-lg ${
                currentPage === "categories"
                  ? "text-[#000080] bg-[#FFF4EA]"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#000080]"
              }`}
            >
              Services
            </button>

            {/* Phone Icon */}
            <button
              onClick={() => onNavigate("contact")}
              className={`p-2 transition-all duration-300 rounded-lg ${
                currentPage === "contact"
                  ? "text-[#000080] bg-[#FFF4EA]"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#000080]"
              }`}
              title="Contact"
            >
              <Phone size={20} />
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 ml-4">
            {/* Admin */}
            <button
              onClick={() => onNavigate("admin-dashboard")}
              className="hidden lg:inline font-semibold text-gray-700 hover:text-[#000080] transition-colors text-sm px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              Admin
            </button>
            {/* Prestataire */}
            <button
              onClick={() => onNavigate("prestataire-dashboard")}
              className="hidden lg:inline font-semibold text-gray-700 hover:text-[#000080] transition-colors text-sm px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              Prestataire
            </button>
            {/* Connexion */}
            <button
              onClick={() => onNavigate("login")}
              className="hidden lg:inline font-semibold text-[#000080] hover:text-blue-700 transition-colors text-sm px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              Connexion
            </button>

            {/* User Icon - Client Space */}
            <button
              onClick={() => onNavigate("dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Espace Client"
            >
              <User size={20} className="text-gray-700" />
            </button>

            {/* Notification Bell - Right */}
            <button
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell size={20} className="text-gray-700" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X size={24} className="text-[#000080]" />
              ) : (
                <Menu size={24} className="text-[#000080]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <button
              onClick={() => {
                onNavigate("home");
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 font-semibold text-sm flex items-center gap-3 ${
                currentPage === "home"
                  ? "text-[#000080] bg-[#FFF4EA]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home size={20} />
              Accueil
            </button>
            <button
              onClick={() => {
                onNavigate("categories");
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 font-semibold text-sm ${
                currentPage === "categories"
                  ? "text-[#000080] bg-[#FFF4EA]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => {
                onNavigate("contact");
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 font-semibold text-sm flex items-center gap-3 ${
                currentPage === "contact"
                  ? "text-[#000080] bg-[#FFF4EA]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Phone size={20} />
              Contact
            </button>
            <div className="border-t border-gray-200 my-2" />
            <button
              onClick={() => {
                onNavigate("login");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 font-semibold text-sm text-[#000080] hover:bg-gray-100"
            >
              Connexion
            </button>
            <button
              onClick={() => {
                onNavigate("admin-dashboard");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 font-semibold text-sm text-[#000080] hover:bg-gray-100"
            >
              Administration
            </button>
            <button
              onClick={() => {
                onNavigate("prestataire-dashboard");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 font-semibold text-sm text-[#000080] hover:bg-gray-100"
            >
              Espace Prestataire
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
