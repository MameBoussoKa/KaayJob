import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Award,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ServiceDetailPageProps {
  onNavigate: (page: string) => void;
}

// Mock data - à remplacer par un appel API
const providersData: Record<string, {
  name: string;
  title: string;
  rating: number;
  totalReviews: number;
  yearsExperience: number;
  image: string;
  hourlyRate: number;
  location: string;
  phone: string;
  specialties: string[];
  verified: boolean;
  responseTime: string;
  services: { name: string; price: string }[];
  reviews: { name: string; rating: number; date: string; comment: string }[];
}> = {
  "provider-1": {
    name: "Kwame Osei",
    title: "Plombier Expert",
    rating: 4.8,
    totalReviews: 156,
    yearsExperience: 8,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&crop=faces&fit=crop",
    hourlyRate: 25,
    location: "Dakar, Sénégal",
    phone: "+221 77 123 45 67",
    specialties: ["Installation de Canalisations", "Réparation de Fuites", "Nettoyage de Drains", "Réparation de Chauffe-eau"],
    verified: true,
    responseTime: "Répond généralement dans les 2 heures",
    services: [
      { name: "Installation de Canalisations", price: "À partir de 30€" },
      { name: "Réparation de Fuites", price: "À partir de 25€" },
      { name: "Nettoyage de Drains", price: "À partir de 20€" },
      { name: "Réparation de Chauffe-eau", price: "À partir de 40€" },
      { name: "Service d'Urgence", price: "À partir de 50€" },
    ],
    reviews: [
      { name: "Sarah Ahmed", rating: 5, date: "Il y a 2 jours", comment: "Excellent service ! Kwame a rapidement réparé notre fuite de cuisine." },
      { name: "Mohammad Ali", rating: 4, date: "Il y a 1 semaine", comment: "Bon travail sur la plomberie. Arrivé à l'heure." },
      { name: "Fatima Khan", rating: 5, date: "Il y a 2 semaines", comment: "Très compétent et honnête. Prix juste." },
    ],
  },
  "provider-2": {
    name: "Amina Diallo",
    title: "Électricienne Certifiée",
    rating: 4.9,
    totalReviews: 203,
    yearsExperience: 10,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&crop=faces&fit=crop",
    hourlyRate: 30,
    location: "Dakar, Sénégal",
    phone: "+221 76 234 56 78",
    specialties: ["Installation Électrique", "Réparation de Pannes", "Mise aux Normes", "Domotique"],
    verified: true,
    responseTime: "Répond généralement dans les 1 heure",
    services: [
      { name: "Installation Électrique", price: "À partir de 40€" },
      { name: "Réparation de Pannes", price: "À partir de 35€" },
      { name: "Mise aux Normes", price: "À partir de 80€" },
      { name: "Domotique", price: "À partir de 100€" },
      { name: "Service d'Urgence", price: "À partir de 60€" },
    ],
    reviews: [
      { name: "Aliou Diop", rating: 5, date: "Il y a 3 jours", comment: "Travail impeccable. Très professionnelle!" },
      { name: "Mariama Sow", rating: 5, date: "Il y a 1 semaine", comment: "Très satisfaite du travail effectué." },
      { name: "Cheikh Fall", rating: 4, date: "Il y a 2 semaines", comment: "Rapide et efficace." },
    ],
  },
  "provider-3": {
    name: "Ibrahim Sow",
    title: "Peintre Professionnel",
    rating: 4.7,
    totalReviews: 89,
    yearsExperience: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&crop=faces&fit=crop",
    hourlyRate: 20,
    location: "Dakar, Sénégal",
    phone: "+221 70 345 67 89",
    specialties: ["Peinture Intérieure", "Peinture Extérieure", "Décoration", "Rénovation"],
    verified: true,
    responseTime: "Répond généralement dans les 3 heures",
    services: [
      { name: "Peinture Intérieure", price: "À partir de 15€" },
      { name: "Peinture Extérieure", price: "À partir de 18€" },
      { name: "Décoration", price: "À partir de 25€" },
      { name: "Rénovation", price: "À partir de 30€" },
    ],
    reviews: [
      { name: "Moussa Ndiaye", rating: 5, date: "Il y a 5 jours", comment: "Super travail! Ma maison est magnifique." },
      { name: "Aïda Mbaye", rating: 4, date: "Il y a 2 semaines", comment: "Bon travail, bon rapport qualité-prix." },
    ],
  },
  "provider-4": {
    name: "Fatoumata Ba",
    title: "Nettoyeur Professionnel",
    rating: 4.9,
    totalReviews: 234,
    yearsExperience: 6,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&crop=faces&fit=crop",
    hourlyRate: 18,
    location: "Dakar, Sénégal",
    phone: "+221 78 456 78 90",
    specialties: ["Nettoyage Maison", "Nettoyage Bureau", "Nettoyage Fin de Chantier", "Pressing"],
    verified: true,
    responseTime: "Répond généralement dans les 30 minutes",
    services: [
      { name: "Nettoyage Maison", price: "À partir de 20€" },
      { name: "Nettoyage Bureau", price: "À partir de 25€" },
      { name: "Nettoyage Fin de Chantier", price: "À partir de 50€" },
      { name: "Pressing", price: "À partir de 10€" },
    ],
    reviews: [
      { name: "Pape Dieng", rating: 5, date: "Il y a 1 jour", comment: "Maison impeccable! Très satisfaite." },
      { name: "Ndeye Fatou", rating: 5, date: "Il y a 4 jours", comment: "Au top! Je recommande fortement." },
      { name: "Mamadou Barry", rating: 5, date: "Il y a 1 semaine", comment: "Ponctuelle et efficace." },
    ],
  },
  "provider-5": {
    name: "Kofi Mensah",
    title: "Menuisier Experimente",
    rating: 4.6,
    totalReviews: 121,
    yearsExperience: 12,
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80&crop=faces&fit=crop",
    hourlyRate: 35,
    location: "Dakar, Sénégal",
    phone: "+221 75 567 89 01",
    specialties: ["Meubles sur Mesure", "Rénovation Meubles", "Pose de Parquet", "Fabrication Porte"],
    verified: true,
    responseTime: "Répond généralement dans les 4 heures",
    services: [
      { name: "Meubles sur Mesure", price: "À partir de 100€" },
      { name: "Rénovation Meubles", price: "À partir de 50€" },
      { name: "Pose de Parquet", price: "À partir de 25€" },
      { name: "Fabrication Porte", price: "À partir de 80€" },
    ],
    reviews: [
      { name: "Seydou Konaté", rating: 5, date: "Il y a 1 semaine", comment: "Meuble magnifique, travail sehr gut!" },
      { name: "Khalilou Faye", rating: 4, date: "Il y a 3 semaines", comment: "Bon travail, délais respectés." },
    ],
  },
};

export function ServiceDetailPage({ onNavigate }: ServiceDetailPageProps) {
  const [providerId, setProviderId] = useState<string>("");
  const [provider, setProvider] = useState<typeof providersData["provider-1"] | null>(null);

  useEffect(() => {
    // Extraire l'ID du prestataire de l'URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "provider-1";
    setProviderId(id);
    
    // Charger les données du prestataire
    if (providersData[id]) {
      setProvider(providersData[id]);
    } else {
      // Par défaut, utiliser provider-1
      setProvider(providersData["provider-1"]);
    }
  }, []);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  const handleBookNow = () => {
    // Naviguer vers la page de réservation avec l'ID du prestataire
    onNavigate(`booking?provider=${providerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Header */}
            <Card className="bg-white border-2 border-[#000080]/10 shadow-lg hover:border-[#000080]/30 transition-all animate-slide-up">
              <CardContent className="p-8 bg-gradient-to-br from-white to-[#FFF4EA]/30">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <ImageWithFallback
                    src={provider.image}
                    alt={provider.name}
                    className="w-32 h-32 rounded-xl object-cover border-4 border-[#000080]/20 shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-[#000080]">
                        {provider.name}
                      </h1>
                      {provider.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Vérifié
                        </Badge>
                      )}
                    </div>
                    <p className="text-xl text-[#000080] font-semibold mb-3">
                      {provider.title}
                    </p>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(provider.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-lg font-semibold text-[#000080]">
                          {provider.rating} ({provider.totalReviews} avis)
                        </span>
                      </div>
                      <div className="flex items-center text-[#000080] font-semibold">
                        <Award className="w-5 h-5 mr-1" />
                        <span>{provider.yearsExperience} ans d'expérience</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-1" />
                        <span>{provider.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-1" />
                        <span>{provider.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services & Pricing */}
            <Card className="bg-white border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Services et Tarifs</h2>
                <div className="space-y-4">
                  {provider.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3"
                    >
                      <span className="text-lg">{service.name}</span>
                      <span className="font-semibold text-lg text-blue-600">
                        {service.price}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg">Tarif Horaire</p>
                    <p className="text-2xl font-bold text-green-600">
                      {provider.hourlyRate}€/h
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                    Réservation minimum 1 heure
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="bg-white border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Spécialités</h2>
                <div className="flex flex-wrap gap-3">
                  {provider.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-base px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-white border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Avis Clients</h2>
                <div className="space-y-6">
                  {provider.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">
                            {review.name}
                          </h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="bg-white border-0 shadow-md sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    {provider.hourlyRate}/h
                  </p>
                  <p className="text-gray-600">Tarif de départ</p>
                </div>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
                    onClick={handleBookNow}
                  >
                    Réserver Maintenant
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 py-4 text-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Message
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-4 text-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Appeler {provider.phone}
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="text-center text-sm text-gray-600">
                  <p>✓ Vérifié par historique</p>
                  <p>✓ Assuré et garanti</p>
                  <p>✓ 100% garantie de satisfaction</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-white border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Informations de Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-gray-500" />
                    <span>{provider.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-gray-500" />
                    <span>{provider.responseTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
