import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Star, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useState } from "react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

// Services with authentic African images
const categories = [
  { 
    name: "Plomberie", 
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&q=80&crop=smart",
    description: "Réparation et installation" 
  },
  { 
    name: "Électricien", 
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80&crop=smart",
    description: "Travaux électriques" 
  },
  { 
    name: "Peintre", 
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80&crop=smart",
    description: "Peinture intérieure" 
  },
  { 
    name: "Nettoyeur", 
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80&crop=smart",
    description: "Nettoyage professionnel" 
  },
  { 
    name: "Menuisier", 
    image: "https://images.unsplash.com/photo-1611486212355-d276af4581c0?w=400&q=80&crop=smart",
    description: "Menuiserie sur mesure" 
  },
  { 
    name: "Mécanicien", 
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80&crop=smart",
    description: "Réparation automobile" 
  },
];

// Featured providers with carousel - African professionals
const featuredProviders = [
  {
    name: "Kwame Osei",
    service: "Plombier",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&crop=faces&fit=crop",
    price: "25€/h"
  },
  {
    name: "Amina Diallo",
    service: "Électricien", 
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&crop=faces&fit=crop",
    price: "30€/h"
  },
  {
    name: "Ibrahim Sow",
    service: "Peintre",
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&crop=faces&fit=crop",
    price: "20€/h"
  },
  {
    name: "Fatoumata Ba",
    service: "Nettoyeur",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&crop=faces&fit=crop",
    price: "18€/h"
  },
  {
    name: "Kofi Mensah",
    service: "Menuisier",
    rating: 4.6,
    reviews: 121,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&crop=faces&fit=crop",
    price: "35€/h"
  },
];

// How it works steps
const steps = [
  {
    step: "1",
    title: "Rechercher",
    description: "Trouvez le service dont vous avez besoin auprès de nos prestataires"
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

export function HomePage({ onNavigate }: HomePageProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % featuredProviders.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleProviders = () => {
    const providers = [];
    for (let i = 0; i < 3; i++) {
      providers.push(featuredProviders[(carouselIndex + i) % featuredProviders.length]);
    }
    return providers;
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen bg-[#000080] text-white overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          {/* African-themed video background */}
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            src="https://videos.pexels.com/video-files/3035335/3035335-hd_1920_1080_30fps.mp4"
          />
          {/* Dark overlay with reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000080]/60 via-[#000080]/50 to-[#000080]/70" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          {/* Animated text */}
          <div className="text-center space-y-6 max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Trouvez les Meilleurs
              <span className="text-[#FFF4EA] block mt-2">Prestataires Près de Vous</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
              Connectez-vous avec des professionnels de confiance pour tous vos besoins
            </p>
          </div>

          {/* Modern Search Bar */}
          <div className="mt-12 w-full max-w-2xl px-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2 group hover:shadow-3xl transition-all duration-300">
              <Search className="w-6 h-6 text-[#000080] ml-4 group-hover:text-blue-700 transition-colors" />
              <Input
                type="text"
                placeholder="Plombier, électricien, nettoyage... Que cherchez-vous?"
                className="flex-1 border-0 focus:outline-none text-gray-800 placeholder-gray-400 text-lg py-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                onClick={() => onNavigate('categories')}
                className="bg-[#000080] hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mr-1"
              >
                Chercher
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-white rounded-full animate-scroll-down" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Images */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000080] mb-4">
              Nos Services
            </h2>
            <p className="text-lg text-gray-600">
              Une large gamme de services professionnels à votre portée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                style={{
                  animation: `scale-in 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-4">{category.description}</p>
                  <div className="flex items-center gap-2 text-[#FFF4EA] group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-semibold">Découvrir</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-[#000080]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers - Carousel */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000080] mb-4">
              Prestataires en Vedette
            </h2>
            <p className="text-lg text-gray-600">
              Les meilleurs professionnels avec les meilleures notes
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getVisibleProviders().map((provider, index) => (
                <div
                  key={index}
                  className="group animate-fade-in bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Provider Image */}
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#FFF4EA] px-3 py-1 rounded-full shadow-lg">
                      <span className="font-bold text-[#000080]">{provider.price}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#000080] mb-1">{provider.name}</h3>
                    <p className="text-gray-600 font-medium mb-4">{provider.service}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(provider.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-[#000080]">{provider.rating}</span>
                      <span className="text-gray-600 text-sm">({provider.reviews})</span>
                    </div>

                    <Button
                      onClick={() => onNavigate('booking')}
                      className="w-full bg-[#000080] hover:bg-blue-900 text-white font-bold py-2 rounded-lg transition-all duration-300 group-hover:translate-y-0"
                    >
                      Réserver
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center gap-2 mt-8">
              {featuredProviders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`h-3 transition-all duration-300 rounded-full ${
                    index === carouselIndex % featuredProviders.length
                      ? 'bg-[#000080] w-8'
                      : 'bg-gray-300 w-3 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#000080] to-blue-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Comment ça Fonctionne
            </h2>
            <p className="text-lg text-gray-200">
              Trois étapes simples pour trouver le service idéal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div
                key={index}
                className="relative group"
                style={{
                  animation: `slide-up 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-1 bg-gradient-to-r from-[#FFF4EA] to-transparent" />
                )}

                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:border-[#FFF4EA] hover:bg-white/20 transition-all duration-300 group-hover:shadow-2xl">
                  {/* Step number */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFF4EA] to-yellow-200 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold text-[#000080]">{item.step}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-200">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate('categories')}
              className="bg-[#FFF4EA] hover:bg-white text-[#000080] font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Commencer Maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000080] mb-4">
              Pourquoi Nous Choisir
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Professionnel Vérifiés", icon: "✓" },
              { title: "Prix Transparents", icon: "💰" },
              { title: "Garantie de Qualité", icon: "🛡️" },
              { title: "Support 24/7", icon: "📞" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#000080]">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative pt-20 pb-10 bg-[#000080] text-white overflow-hidden">
        {/* Background image with opacity */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000080]/90 via-[#000080]/85 to-[#000080]/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[
              {
                title: "À Propos",
                links: ["Qui sommes-nous", "Notre Mission", "Nos Valeurs"],
              },
              {
                title: "Services",
                links: ["Tous les Services", "Trouver un Prestataire", "Devenir Partenaire"],
              },
              {
                title: "Support",
                links: ["Aide", "Contact", "FAQ"],
              },
              {
                title: "Légal",
                links: ["Conditions", "Politique de Confidentialité", "Cookies"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg mb-4 text-[#FFF4EA]">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#FFF4EA] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="border-t border-white/20 pt-8 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-300 text-sm">
                © 2026 KaayJob. Tous droits réservés.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-300 hover:text-[#FFF4EA] transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
