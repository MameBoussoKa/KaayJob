import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, MapPin, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useEffect, useState } from "react";

interface ServiceProvidersListPageProps {
  onNavigate: (page: string) => void;
  serviceName?: string;
}

export function ServiceProvidersListPage({
  onNavigate,
  serviceName = "Plombier",
}: ServiceProvidersListPageProps) {
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    // Extraire le category ID de l'URL
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) {
      setCategoryId(category);
    }
  }, []);
  // Mock data - en production, cela viendrait d'une API
  const providers = [
    {
      id: 1,
      name: "Ahmed Khan",
      title: "Plombier Expert",
      rating: 4.8,
      reviews: 124,
      yearsExperience: 8,
      image:
        "https://images.unsplash.com/photo-1604118600242-e7a6d23ec3a9?w=200&q=80",
      location: "Dakar, Sénégal",
      hourlyRate: 25,
      responseTime: "2 heures",
      verified: true,
      specialties: [
        "Installation de Canalisations",
        "Réparation de Fuites",
        "Nettoyage de Drains",
      ],
    },
    {
      id: 2,
      name: "Mamadou Faye",
      title: "Plombier Professionnel",
      rating: 4.5,
      reviews: 89,
      yearsExperience: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      location: "Dakar, Sénégal",
      hourlyRate: 20,
      responseTime: "1 heure",
      verified: true,
      specialties: ["Réparation de Fuites", "Chauffe-eau", "Drains"],
    },
    {
      id: 3,
      name: "Boubacar Diop",
      title: "Spécialiste Canalisations",
      rating: 4.9,
      reviews: 67,
      yearsExperience: 12,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      location: "Pikine, Sénégal",
      hourlyRate: 30,
      responseTime: "3 heures",
      verified: true,
      specialties: ["Inspection Caméra", "Débouchage", "Réhabilitation"],
    },
    {
      id: 4,
      name: "Ousmane Sow",
      title: "Plombier Certifié",
      rating: 4.3,
      reviews: 45,
      yearsExperience: 3,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      location: "Guédiawaye, Sénégal",
      hourlyRate: 18,
      responseTime: "30 minutes",
      verified: false,
      specialties: ["Petites Réparations", "Entretien", "Installation"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-[#000080] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => onNavigate("categories")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux catégories
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Prestataires {serviceName}
          </h1>
          <p className="text-lg opacity-90">
            {providers.length} prestataires disponibles à Dakar
          </p>
        </div>
      </section>

      {/* Providers List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Card
                key={provider.id}
                className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onNavigate(`service-detail?id=${provider.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <ImageWithFallback
                      src={provider.image}
                      alt={provider.name}
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-xl font-bold text-[#000080]">
                          {provider.name}
                        </h3>
                        {provider.verified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Vérifié
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{provider.title}</p>

                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-semibold">
                            {provider.rating}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">
                            ({provider.reviews})
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {provider.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            {provider.hourlyRate}€
                          </span>
                          <span className="text-gray-500">/h</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            onNavigate(`service-detail?id=${provider.id}`);
                          }}
                        >
                          Voir le profil
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
