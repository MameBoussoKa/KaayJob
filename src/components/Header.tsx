import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Accueil" },
    { id: "categories", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-xl font-bold bg-gradient-to-r from-[#000080] to-blue-700 bg-clip-text text-transparent">
              KaayJob
            </span>
          </div>

          {/* Desktop Menu - Center */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 font-semibold text-sm transition-all duration-300 rounded-lg ${
                  currentPage === item.id
                    ? "text-[#000080] bg-[#FFF4EA]"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#000080]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("admin-dashboard")}
              className="hidden md:inline font-semibold text-gray-700 hover:text-[#000080] transition-colors text-sm"
            >
              Admin
            </button>
            <button
              onClick={() => onNavigate("prestataire-dashboard")}
              className="hidden md:inline font-semibold text-gray-700 hover:text-[#000080] transition-colors text-sm"
            >
              Prestataire
            </button>
            <button
              onClick={() => onNavigate("login")}
              className="hidden sm:inline font-semibold text-[#000080] hover:text-blue-700 transition-colors text-sm"
            >
              Connexion
            </button>
            <Button
              onClick={() => onNavigate("dashboard")}
              className="bg-[#000080] hover:bg-blue-900 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm h-10"
            >
              Espace Client
            </Button>

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
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 font-semibold text-sm transition-colors ${
                  currentPage === item.id
                    ? "text-[#000080] bg-[#FFF4EA]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
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
