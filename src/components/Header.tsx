import { Button } from "./ui/button";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <h1 className="text-2xl font-bold text-blue-600">Kamwala</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`${
                currentPage === 'home' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              } pb-1 transition-colors`}
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className={`${
                currentPage === 'categories' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              } pb-1 transition-colors`}
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`${
                currentPage === 'contact' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              } pb-1 transition-colors`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => onNavigate('login')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Connexion
            </Button>
            <Button
              onClick={() => onNavigate('dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Tableau de bord
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}