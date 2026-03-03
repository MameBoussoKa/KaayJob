import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones, Navigation, MapPinned, Car, User } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icon
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const providerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const officeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

// Map controller component
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

// Location search component
function LocationSearch({ onLocationSelect, placeholder, label }: { 
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  placeholder: string;
  label: string;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ lat: number; lng: number; display_name: string }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleSearch = async (value: string) => {
    setQuery(value);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.length < 3) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5&country=sn`
        );
        const data = await response.json();
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Error searching location:", error);
      }
    }, 500);
  };

  const handleSelect = (result: { lat: number; lng: number; display_name: string }) => {
    onLocationSelect(result.lat, result.lng, result.display_name);
    setQuery(result.display_name);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div className="relative mt-1">
        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        <MapPinned className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelect(result)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              {result.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // Map state
  const [activeTab, setActiveTab] = useState<'contact' | 'route'>('contact');
  const [officeLocation] = useState<[number, number]>([14.7167, -17.4677]); // Dakar, Senegal
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [providerLocation, setProviderLocation] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Impossible d'obtenir votre position. Veuillez la saisir manuellement.");
        }
      );
    }
  };

  // Calculate route between two points using OSRM
  const calculateRoute = async () => {
    if (!userLocation || !providerLocation) return;
    
    setIsCalculating(true);
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${providerLocation[1]},${providerLocation[0]}?overview=full&geometries=geojson`
      );
      const data = await response.json();
      
      if (data.routes && data.routes[0]) {
        const coords = data.routes[0].geometry.coordinates.map(
          (coord: number[]) => [coord[1], coord[0]] as [number, number]
        );
        setRouteCoords(coords);
      }
    } catch (error) {
      console.error("Error calculating route:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci pour votre message ! Nous vous répondrons dans les 24 heures.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleUserLocationSelect = (lat: number, lng: number, address: string) => {
    setUserLocation([lat, lng]);
  };

  const handleProviderLocationSelect = (lat: number, lng: number, address: string) => {
    setProviderLocation([lat, lng]);
  };

  // Calculate center for map
  const getMapCenter = (): [number, number] => {
    if (userLocation && providerLocation) {
      return [
        (userLocation[0] + providerLocation[0]) / 2,
        (userLocation[1] + providerLocation[1]) / 2
      ];
    }
    if (userLocation) return userLocation;
    if (providerLocation) return providerLocation;
    return officeLocation;
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Appelez-nous",
      details: "+221 33 123 45 67",
      subtitle: "Disponible 24/7 pour les urgences"
    },
    {
      icon: Mail,
      title: "Envoyez-nous un Email", 
      details: "support@kaayjob.com",
      subtitle: "Nous répondrons sous 24 heures"
    },
    {
      icon: MapPin,
      title: "Venez nous voir",
      details: "Point E, Avenue Cheikh Anta Diop, Dakar",
      subtitle: "Lundi - Samedi, 8h - 20h"
    },
    {
      icon: Clock,
      title: "Heures d'Ouverture",
      details: "Lun - Sam: 8h - 20h",
      subtitle: "Services d'urgence disponibles"
    }
  ];

  const faqs = [
    {
      question: "Comment réserver un service ?",
      answer: "Parcourez simplement nos catégories de services, sélectionnez un prestataire, choisissez votre créneau horaire et effectuez le paiement. C'est simple comme bonjour !"
    },
    {
      question: "Tous les prestataires sont-ils vérifiés ?",
      answer: "Oui, tous nos prestataires passent par un processus rigoureux de vérification des antécédents pour garantir qualité et sécurité."
    },
    {
      question: "Que faire si je dois annuler ma réservation ?",
      answer: "Vous pouvez annuler votre réservation jusqu'à 2 heures avant l'heure prévue. Les annulations effectuées plus tôt peuvent être éligibles à un remboursement intégral."
    },
    {
      question: "Comment effectuer les paiements ?",
      answer: "Nous acceptons les cartes de crédit/débit, Mobile Money et le paiement à la livraison. Tous les paiements en ligne sont sécurisés avec un cryptage de niveau industriel."
    },
    {
      question: "Que faire si je ne suis pas satisfait du service ?",
      answer: "Nous offrons une garantie de satisfaction à 100%. Si vous n'êtes pas heureux du service, contactez-nous dans les 24 heures et nous résoudrons le problème."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#000080] to-[#001a99] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
              <p className="text-xl opacity-90 mb-6">
                Besoin d'aide ? Nous sommes là pour répondre à vos questions et préoccupations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setActiveTab('contact')}
                  className={activeTab === 'contact' ? 'bg-white text-[#000080]' : 'bg-white/20 hover:bg-white/30'}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Nous Contacter
                </Button>
                <Button 
                  onClick={() => setActiveTab('route')}
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Calculer l'Itinéraire
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/10 rounded-2xl blur-2xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-white/80">Support d'urgence</p>
                      <p className="text-2xl font-bold">+221 77 123 45 67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-white/80">Email</p>
                      <p className="text-lg font-medium">support@kaayjob.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {activeTab === 'contact' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#000080] to-[#001a99] px-6 py-4">
                  <CardTitle className="text-xl text-white flex items-center">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Envoyez-nous un Message
                  </CardTitle>
                </div>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-base">Nom Complet *</Label>
                        <Input
                          id="name"
                          placeholder="Entrez votre nom complet"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-base">Adresse Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Entrez votre email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-base">Numéro de Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+221 77 XXX XX XX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-base">Sujet *</Label>
                        <Input
                          id="subject"
                          placeholder="Comment pouvons-nous vous aider ?"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-base">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Veuillez décrire votre question ou préoccupation en détail..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="mt-2 min-h-[120px]"
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-[#000080] hover:bg-[#001a99] text-white py-4"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Envoyer le Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Headphones className="w-5 h-5 mr-3 text-green-600" />
                    Informations de Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                          <p className="text-blue-600 font-medium">{info.details}</p>
                          <p className="text-sm text-gray-600">{info.subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Emergency Support */}
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardContent className="p-6 text-center">
                  <Phone className="w-10 h-10 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-red-900 mb-2">Support d'Urgence</h3>
                  <p className="text-red-700 mb-4 text-sm">
                    Besoin d'aide immédiate ? Notre ligne d'urgence est disponible 24/7.
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
                    Appeler la Ligne d'Urgence
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Route Planning Tab */
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Location Inputs */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Navigation className="w-5 h-5 mr-3 text-[#000080]" />
                      Calculer l'Itinéraire
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">Votre Position</span>
                      </div>
                      <LocationSearch
                        onLocationSelect={handleUserLocationSelect}
                        placeholder="Entrez votre adresse..."
                        label="Depuis"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 text-green-700 border-green-300 hover:bg-green-100"
                        onClick={getCurrentLocation}
                      >
                        <MapPinned className="w-4 h-4 mr-2" />
                        Utiliser ma position
                      </Button>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-8 h-8 bg-[#000080] rounded-full flex items-center justify-center">
                        <Car className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPinned className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Position du Prestataire</span>
                      </div>
                      <LocationSearch
                        onLocationSelect={handleProviderLocationSelect}
                        placeholder="Entrez l'adresse du prestataire..."
                        label="Vers"
                      />
                    </div>

                    <Button 
                      className="w-full bg-[#000080] hover:bg-[#001a99]"
                      onClick={calculateRoute}
                      disabled={!userLocation || !providerLocation || isCalculating}
                    >
                      {isCalculating ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Calcul en cours...
                        </>
                      ) : (
                        <>
                          <Navigation className="w-4 h-4 mr-2" />
                          Calculer l'Itinéraire
                        </>
                      )}
                    </Button>

                    {routeCoords.length > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="font-medium text-green-800 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Itinéraire calculé !
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          Distance: {(routeCoords.length * 0.01).toFixed(1)} km (approx.)
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Office Location Card */}
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Notre Bureau</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      <strong>KaayJob</strong><br />
                      Point E, Avenue Cheikh Anta Diop<br />
                      Dakar, Sénégal
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setProviderLocation(officeLocation);
                        setUserLocation(null);
                        setRouteCoords([]);
                      }}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Voir l'itinéraire vers nous
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <div className="lg:col-span-2">
                <Card className="bg-white border-0 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-lg flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-[#000080]" />
                      Carte Interactive
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[500px] w-full relative">
                      <MapContainer
                        center={getMapCenter()}
                        zoom={12}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <MapController center={getMapCenter()} />
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {/* Office Marker */}
                        <Marker position={officeLocation} icon={officeIcon}>
                          <Popup>
                            <div className="text-center">
                              <strong>KaayJob</strong><br />
                              Point E, Dakar<br />
                              <span className="text-sm text-gray-500">Notre bureau</span>
                            </div>
                          </Popup>
                        </Marker>

                        {/* User Marker */}
                        {userLocation && (
                          <Marker position={userLocation} icon={userIcon}>
                            <Popup>
                              <div className="text-center">
                                <strong>Votre Position</strong><br />
                                <span className="text-sm text-gray-500">Point de départ</span>
                              </div>
                            </Popup>
                          </Marker>
                        )}

                        {/* Provider Marker */}
                        {providerLocation && (
                          <Marker position={providerLocation} icon={providerIcon}>
                            <Popup>
                              <div className="text-center">
                                <strong>Prestataire</strong><br />
                                <span className="text-sm text-gray-500">Destination</span>
                              </div>
                            </Popup>
                          </Marker>
                        )}

                        {/* Route Line */}
                        {routeCoords.length > 0 && (
                          <Polyline
                            positions={routeCoords}
                            pathOptions={{ color: '#000080', weight: 4, opacity: 0.8 }}
                          />
                        )}
                      </MapContainer>

                      {/* Map Legend */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Légende</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>Votre position</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span>Prestataire</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span>Notre bureau</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Questions Fréquemment Posées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-[#000080] to-[#001a99] text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Prêt à Commencer ?</h2>
              <p className="text-xl opacity-90 mb-8">
                Trouvez des prestataires de confiance dans votre région et réservez votre service aujourd'hui.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-[#000080] hover:bg-gray-100 px-8 py-4"
                  onClick={() => onNavigate('categories')}
                >
                  Parcourir les Services
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#000080] px-8 py-4"
                  onClick={() => onNavigate('login')}
                >
                  S'inscrire Maintenant
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
