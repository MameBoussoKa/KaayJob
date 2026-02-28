import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";

interface ServiceCategoriesPageProps {
  onNavigate: (page: string) => void;
}

export function ServiceCategoriesPage({
  onNavigate,
}: ServiceCategoriesPageProps) {
  const categories = [
    {
      name: "Plombier",
      image:
        "https://i.pinimg.com/736x/4d/3d/a8/4d3da898a7f0383572935a16f1e6df3a.jpg",
      description:
        "Réparation de fuites, installation de canalisations, nettoyage de drains et réparation de chauffes-eau",
      providers: 45,
      avgPrice: "25-40€/h",
    },
    {
      name: "Électricien",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80",
      description:
        "Réparations électriques, câblage, installation de prises et luminaires",
      providers: 38,
      avgPrice: "30-50€/h",
    },
    {
      name: "Peintre",
      image:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80",
      description:
        "Peinture intérieure et extérieure, préparation des murs et conseil en couleurs",
      providers: 52,
      avgPrice: "20-35€/h",
    },
    {
      name: "Nettoyeur",
      image:
        "https://i.pinimg.com/736x/f5/91/96/f5919604d5cec192bbd064132a2f6d4b.jpg",
      description:
        "Nettoyage de maison, nettoyage en profondeur, nettoyage de bureau et déménagement",
      providers: 67,
      avgPrice: "15-25€/h",
    },
    {
      name: "Menuisier",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixid=M3w5MTY4fDB8MHxzZWFyY2h8Mnx8d29vZGNhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=80",
      description:
        "Réparation de meubles, menuiserie sur mesure, installation de portes et placards",
      providers: 29,
      avgPrice: "25-45€/h",
    },
    {
      name: "Mécanicien",
      image:
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixid=M3w5MTY4fDB8MHxzZWFyY2h8Mnx8bWVjaGFuaWN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=80",
      description:
        "Réparations automobiles, entretien, diagnostics et services de mécanicien mobile",
      providers: 34,
      avgPrice: "35-60€/h",
    },
    {
      name: "Spécialiste CVC",
      image:
        "https://i.pinimg.com/1200x/83/6a/cb/836acbc39fee599980bbbccef53e883a.jpg",
      description:
        "Installation et réparation de chauffage, ventilation et climatisation",
      providers: 23,
      avgPrice: "40-70€/h",
    },
    {
      name: "Réparation Maison",
      image:
        "https://i.pinimg.com/1200x/4a/59/ac/4a59acee44f649f434b51e9dab32d1a8.jpg",
      description:
        "Services de bricoleur généraux, petites réparations et entretien de maison",
      providers: 41,
      avgPrice: "20-30€/h",
    },
    {
      name: "Serrurier",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixid=M3w5MTY4fDB8MHxzZWFyY2h8Mnx8bG9ja3xlbnwwfHx8&auto=format&fit=crop&w=400&q=80",
      description:
        "Installation de serrures, coupe de clés et services d'urgence ouverture de porte",
      providers: 18,
      avgPrice: "30-50€/h",
    },
    {
      name: "Coiffeur",
      image:
        "https://i.pinimg.com/736x/77/67/00/7767003c2ae5097a6c24944c93c576b2.jpg",
      description:
        "Coupes de cheveux, coiffure, coloration et soins esthétiques à domicile",
      providers: 31,
      avgPrice: "25-40€/h",
    },
    {
      name: "Jardinier",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixid=M3w5MTY4fDB8MHxzZWFyY2h8Mnx8Z2FyZGVuJTIwc2VydmljZXxlbnwwfHx8&auto=format&fit=crop&w=400&q=80",
      description:
        "Entretien de jardin, taille de haies, tonte de pelouse et aménagement paysager.",
      providers: 22,
      avgPrice: "20-35€/h",
    },
    {
      name: "Informatique",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=M3w5MTY4fDB8MHxzZWFyY2h8Mnx8aXR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=80",
      description:
        "Assistance informatique, dépannage, installation de logiciels et maintenance de matériel.",
      providers: 27,
      avgPrice: "30-60€/h",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Dakar, Sénégal");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase()) ||
        cat.description.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredCategories(filtered);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock location - en production, utiliser API de géocodage
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (error) => console.log("Localisation refusée", error),
      );
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header Section */}
      <section
        className="text-white py-16 animate-fade-in"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/cc/35/ba/cc35baaadabca6dd0d5fceca0260363d.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 bg-black/40 rounded-2xl py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Catégories de Services
          </h1>
          <p className="text-xl opacity-90 text-center mb-8">
            Choisissez parmi notre large gamme de services professionnels
          </p>

          {/* Search and Location Bar */}
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
              <Search className="w-6 h-6 text-[#000080]" />
              <Input
                type="text"
                placeholder="Recherchez un service..."
                className="flex-1 border-0 focus:outline-none text-gray-800 text-base"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Location */}
            <div className="bg-white/10 backdrop-blur rounded-xl border border-white/20 p-3 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#FFF4EA]" />
              <span className="text-[#FFF4EA]">{location}</span>
              <Button
                onClick={getLocation}
                variant="ghost"
                className="ml-auto text-[#FFF4EA] hover:bg-white/20"
              >
                Localiser
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">
                Aucun service ne correspond à votre recherche.
              </p>
              <Button
                onClick={() => handleSearch("")}
                variant="outline"
                className="mt-4"
              >
                Réinitialiser la recherche
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredCategories.map((category, index) => (
                <div
                  key={category.name}
                  className="group relative rounded-3xl overflow-hidden shadow-xl bg-white hover:scale-[1.03] transition-transform duration-500 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                  onClick={() => onNavigate("service-providers")}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 rounded-full px-4 py-1 text-xs font-semibold text-[#000080] shadow">
                      {category.providers} prestataires
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <h3 className="text-2xl font-bold text-[#000080] mb-1 group-hover:text-blue-700 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-2 text-base leading-relaxed min-h-[56px]">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm text-gray-500">
                        <span>À partir de</span>
                        <div className="font-semibold text-lg text-gray-900">
                          {category.avgPrice}
                        </div>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-[#000080] to-[#001a99] hover:from-[#001a99] hover:to-[#000080] text-white shadow-lg px-5 py-2 rounded-xl text-base font-semibold transition-all duration-300"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          onNavigate("service-providers");
                        }}
                      >
                        Voir les Prestataires
                      </Button>
                    </div>
                  </div>
                  {/* Animation de halo moderne */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br from-blue-200 via-blue-100 to-transparent blur-2xl"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Ajout d'une section d'information */}
          <div>
            <p className="text-xl text-gray-600 mb-8">
              Contactez-nous et nous vous aiderons à trouver le prestataire
              adapté à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                onClick={() => onNavigate("contact")}
              >
                Contacter le Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                onClick={() => onNavigate("login-provider")}
              >
                Devenir Prestataire
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
