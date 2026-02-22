import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Wrench, Lightbulb, Paintbrush, Brush, Hammer, Car, Search, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const categories = [
    { name: "Plombier", icon: Wrench, emoji: "🔧" },
    { name: "Électricien", icon: Lightbulb, emoji: "💡" },
    { name: "Peintre", icon: Paintbrush, emoji: "🎨" },
    { name: "Nettoyeur", icon: Brush, emoji: "🧹" },
    { name: "Menuisier", icon: Hammer, emoji: "🔨" },
    { name: "Mécanicien", icon: Car, emoji: "🚗" },
  ];

  const featuredProviders = [
    {
      name: "Jean Dupont",
      service: "Plombier",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1604118600242-e7a6d23ec3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbHVtYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3NTk4Njc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "25€/h"
    },
    {
      name: "Marie Martin",
      service: "Électricien", 
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1593636583886-0bf6a98a8a36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTc0OTM3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "30€/h"
    },
    {
      name: "Ahmed Khan",
      service: "Peintre",
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1604118600242-e7a6d23ec3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbHVtYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3NTk4Njc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "20€/h"
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Rechercher",
      description: "Trouvez le service dont vous avez besoin auprès de nos prestataires de confiance"
    },
    {
      step: "2", 
      title: "Réserver",
      description: "Planifiez un rendez-vous à l'heure qui vous convient"
    },
    {
      step: "3",
      title: "Obtenir le Service",
      description: "Profitez d'un service de qualité par des professionnels vérifiés"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1644890550788-3ca4ee5c3bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjB3b3JraW5nJTIwc2VydmljZXMlMjBtYWludGVuYW5jZXxlbnwxfHx8fDE3NTc1OTg2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        ></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Trouvez des Prestataires de Confiance Près de Chez Vous
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Réservez des plombiers, électriciens, peintre et bien plus en quelques clics.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 shadow-lg">
            <div className="flex items-center">
              <Search className="text-gray-400 ml-4 h-6 w-6" />
              <Input
                placeholder="Rechercher un service (ex: Plombier, Peintre)"
                className="border-0 bg-transparent text-gray-900 text-lg flex-1 focus:ring-0"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md">
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Services Populaires
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.name}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-green-50 border-0"
                onClick={() => onNavigate('categories')}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.emoji}</div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Prestataires en Vedette
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <Card 
                key={provider.name}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-white border-0 shadow-md"
                onClick={() => onNavigate('service-detail')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <ImageWithFallback
                      src={provider.image}
                      alt={provider.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{provider.name}</h3>
                      <p className="text-blue-600">{provider.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-700">{provider.rating} ({provider.reviews} avis)</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {provider.price}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Comment Ça Marche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((stepItem, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {stepItem.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{stepItem.title}</h3>
                <p className="text-gray-600 text-lg">{stepItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à trouver votre prestataire idéal ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de clients satisfaits qui font confiance à Kamwala pour leurs besoins en services.
          </p>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            onClick={() => onNavigate('categories')}
          >
            Parcourir les Services
          </Button>
        </div>
      </section>
    </div>
  );
}
