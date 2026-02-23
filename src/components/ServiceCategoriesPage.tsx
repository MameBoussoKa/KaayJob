import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Wrench, Lightbulb, Paintbrush, Brush, Hammer, Car, Home, Scissors, Settings, Shield } from "lucide-react";

interface ServiceCategoriesPageProps {
  onNavigate: (page: string) => void;
}

export function ServiceCategoriesPage({ onNavigate }: ServiceCategoriesPageProps) {
  const categories = [
    {
      name: "Plombier",
      icon: Wrench,
      description: "Réparation de fuites, installation de canalisations, nettoyage de drains et réparation de chauffes-eau",
      providers: 45,
      avgPrice: "25-40€/h",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Électricien", 
      icon: Lightbulb,
      description: "Réparations électriques, câblage, installation de prises et luminaires",
      providers: 38,
      avgPrice: "30-50€/h",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      name: "Peintre",
      icon: Paintbrush,
      description: "Peinture intérieure et extérieure, préparation des murs et conseil en couleurs",
      providers: 52,
      avgPrice: "20-35€/h",
      color: "bg-purple-100 text-purple-800"
    },
    {
      name: "Nettoyeur",
      icon: Brush,
      description: "Nettoyage de maison, nettoyage en profondeur, nettoyage de bureau et déménagement",
      providers: 67,
      avgPrice: "15-25€/h",
      color: "bg-green-100 text-green-800"
    },
    {
      name: "Menuisier",
      icon: Hammer,
      description: "Réparation de meubles, menuiserie sur mesure, installation de portes et placards",
      providers: 29,
      avgPrice: "25-45€/h",
      color: "bg-orange-100 text-orange-800"
    },
    {
      name: "Mécanicien",
      icon: Car,
      description: "Réparations automobiles, entretien, diagnostics et services de mécanicien mobile",
      providers: 34,
      avgPrice: "35-60€/h",
      color: "bg-red-100 text-red-800"
    },
    {
      name: "Spécialiste CVC",
      icon: Settings,
      description: "Installation et réparation de chauffage, ventilation et climatisation",
      providers: 23,
      avgPrice: "40-70€/h",
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      name: "Réparation Maison",
      icon: Home,
      description: "Services de bricoleur généraux, petites réparations et entretien de maison",
      providers: 41,
      avgPrice: "20-30€/h",
      color: "bg-teal-100 text-teal-800"
    },
    {
      name: "Serrurier",
      icon: Shield,
      description: "Installation de serrures, coupe de clés et services d'urgence ouverture de porte",
      providers: 18,
      avgPrice: "30-50€/h",
      color: "bg-gray-100 text-gray-800"
    },
    {
      name: "Coiffeur",
      icon: Scissors,
      description: "Coupes de cheveux, coiffure, coloration et soins esthétiques à domicile",
      providers: 31,
      avgPrice: "25-40€/h",
      color: "bg-pink-100 text-pink-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#000080] to-[#001a99] text-white py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Catégories de Services</h1>
          <p className="text-xl opacity-90">
            Choisissez parmi notre large gamme de services professionnels
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.name}
                  className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-[#000080]/10 shadow-lg bg-white hover:scale-105 hover:border-[#000080]/30 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => onNavigate('service-detail')}
                >
                  <CardHeader className="pb-4 bg-gradient-to-r from-[#FFF4EA] to-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="p-3 bg-gradient-to-br from-[#000080] to-[#001a99] rounded-lg mr-4">
                          <IconComponent className="w-8 h-8 text-[#FFF4EA]" />
                        </div>
                        <CardTitle className="text-xl text-[#000080]">{category.name}</CardTitle>
                      </div>
                      <Badge className="bg-[#000080] text-[#FFF4EA] hover:bg-[#001a99]">
                        {category.providers} prestataires
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-base leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span>À partir de</span>
                        <div className="font-semibold text-lg text-gray-900">
                          {category.avgPrice}
                        </div>
                      </div>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          onNavigate('service-detail');
                        }}
                      >
                        Voir les Prestataires
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Vous ne trouvez pas ce que vous recherchez ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous et nous vous aiderons à trouver le prestataire adapté à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              onClick={() => onNavigate('contact')}
            >
              Contacter le Support
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              onClick={() => onNavigate('login')}
            >
              Devenir Prestataire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
