import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones, Navigation, MapPinned, Car, User, Send } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { validateFormField } from "../../lib/validations";
import { toast } from "sonner";

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

  // États pour les erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Map state
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
          toast.error("Impossible d'obtenir votre position. Veuillez la saisir manuellement.");
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
      toast.error("Erreur lors du calcul de l'itinéraire");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validation en temps réel
    if (touched[field]) {
      validateFieldRealTime(field, value);
    }
  };

  // Validation en temps réel d'un champ
  const validateFieldRealTime = (field: string, value: string): boolean => {
    let error: string | null = null;

    switch (field) {
      case "email":
        error = validateFormField(value, "email", "Email");
        break;
      case "name":
        error = validateFormField(value, "name", "Nom");
        break;
      case "phone":
        if (value && value.trim() !== "") {
          error = validateFormField(value, "phone", "Téléphone");
        }
        break;
      case "subject":
        if (!value || value.trim().length < 5) {
          error = "Le sujet doit contenir au moins 5 caractères";
        }
        break;
      case "message":
        if (!value || value.trim().length < 10) {
          error = "Le message doit contenir au moins 10 caractères";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error || "" }));
    return !error;
  };

  // Gestion de la perte de focus
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateFieldRealTime(field, formData[field as keyof typeof formData]);
  };

  // Valider le formulaire complet
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validation du nom
    const nameError = validateFormField(formData.name, "name", "Nom");
    if (nameError) {
      newErrors.name = nameError;
      isValid = false;
    }

    // Validation de l'email
    const emailError = validateFormField(formData.email, "email", "Email");
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }

    // Validation du téléphone (optionnel mais si fourni, doit être valide)
    if (formData.phone && formData.phone.trim() !== "") {
      const phoneError = validateFormField(formData.phone, "phone", "Téléphone");
      if (phoneError) {
        newErrors.phone = phoneError;
        isValid = false;
      }
    }

    // Validation du sujet
    if (!formData.subject || formData.subject.trim().length < 5) {
      newErrors.subject = "Le sujet doit contenir au moins 5 caractères";
      isValid = false;
    }

    // Validation du message
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
      isValid = false;
    }

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation avant soumission
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    toast.success("Merci pour votre message ! Nous vous répondrons dans les 24 heures.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setErrors({});
    setTouched({});
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
      title: "Téléphone",
      details: "+221 77 123 45 67",
    },
    {
      icon: Mail,
      title: "Email", 
      details: "support@kaayjob.com",
    },
    {
      icon: MapPin,
      title: "Adresse",
      details: "Point E, Dakar, Sénégal",
    },
    {
      icon: Clock,
      title: "Horaires",
      details: "Lun - Sam: 8h - 20h",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#000080] to-[#001a99] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl opacity-90">
            Une question ? Nous sommes là pour vous aider
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 pb-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Card key={index} className="bg-white border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-[#000080] rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{info.title}</h3>
                  <p className="text-blue-600 text-sm font-medium">{info.details}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="w-full justify-center mb-8 bg-white p-1 rounded-lg shadow-lg">
            <TabsTrigger value="contact" className="flex items-center gap-2 px-8">
              <MessageCircle className="w-4 h-4" />
              Nous Contacter
            </TabsTrigger>
            <TabsTrigger value="route" className="flex items-center gap-2 px-8">
              <Navigation className="w-4 h-4" />
              Itinéraire
            </TabsTrigger>
          </TabsList>

          {/* Contact Form Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader className="border-b">
                    <CardTitle className="text-xl">Envoyez-nous un message</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nom Complet *</Label>
                          <Input
                            id="name"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            onBlur={() => handleBlur("name")}
                            className={errors.name && touched.name ? "border-red-500" : ""}
                          />
                          {errors.name && touched.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            onBlur={() => handleBlur("email")}
                            className={errors.email && touched.email ? "border-red-500" : ""}
                          />
                          {errors.email && touched.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+221 77 XXX XX XX"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            onBlur={() => handleBlur("phone")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Sujet *</Label>
                          <Input
                            id="subject"
                            placeholder="Sujet de votre message"
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            onBlur={() => handleBlur("subject")}
                            className={errors.subject && touched.subject ? "border-red-500" : ""}
                          />
                          {errors.subject && touched.subject && (
                            <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Décrivez votre demande..."
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          onBlur={() => handleBlur("message")}
                          className={`min-h-[150px] ${errors.message && touched.message ? "border-red-500" : ""}`}
                        />
                        {errors.message && touched.message && (
                          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                        )}
                      </div>

                      <Button 
                        type="submit"
                        className="w-full bg-[#000080] hover:bg-[#001a99]"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Emergency Card */}
                <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                  <CardContent className="p-6 text-center">
                    <Phone className="w-10 h-10 mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-2">Urgence 24/7</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Besoin d'aide immédiate ?
                    </p>
                    <Button className="w-full bg-white text-red-600 hover:bg-gray-100">
                      Appeler maintenant
                    </Button>
                  </CardContent>
                </Card>

                {/* Office Info */}
                <Card className="bg-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#000080]" />
                      Notre bureau
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p><strong>KaayJob</strong></p>
                      <p>Point E, Avenue Cheikh Anta Diop</p>
                      <p>Dakar, Sénégal</p>
                      <div className="pt-3 border-t">
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Lun - Sam: 8h - 20h
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Route Tab */}
          <TabsContent value="route">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Location Inputs */}
              <div className="lg:col-span-1 space-y-4">
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Calculer l'itinéraire</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* From */}
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Depuis</span>
                      </div>
                      <LocationSearch
                        onLocationSelect={handleUserLocationSelect}
                        placeholder="Votre adresse"
                        label=""
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-green-700 hover:text-green-900"
                        onClick={getCurrentLocation}
                      >
                        <MapPinned className="w-3 h-3 mr-1" />
                        Ma position
                      </Button>
                    </div>

                    {/* To */}
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Vers</span>
                      </div>
                      <LocationSearch
                        onLocationSelect={handleProviderLocationSelect}
                        placeholder="Adresse prestataire"
                        label=""
                      />
                    </div>

                    <Button 
                      className="w-full bg-[#000080]"
                      onClick={calculateRoute}
                      disabled={!userLocation || !providerLocation || isCalculating}
                    >
                      {isCalculating ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Calcul...
                        </>
                      ) : (
                        <>
                          <Navigation className="w-4 h-4 mr-2" />
                          Calculer
                        </>
                      )}
                    </Button>

                    {routeCoords.length > 0 && (
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <p className="text-green-800 font-medium">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {(routeCoords.length * 0.01).toFixed(1)} km
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Legend */}
                <Card className="bg-white border-0 shadow-lg">
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold mb-3">Légende</p>
                    <div className="space-y-2 text-sm">
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
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <div className="lg:col-span-3">
                <Card className="bg-white border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-[500px] w-full">
                      <MapContainer
                        center={getMapCenter()}
                        zoom={12}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <MapController center={getMapCenter()} />
                        <TileLayer
                          attribution='&copy; OpenStreetMap'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {/* Office Marker */}
                        <Marker position={officeLocation} icon={officeIcon}>
                          <Popup>
                            <div className="text-center">
                              <strong>KaayJob</strong><br />
                              Point E, Dakar
                            </div>
                          </Popup>
                        </Marker>

                        {/* User Marker */}
                        {userLocation && (
                          <Marker position={userLocation} icon={userIcon}>
                            <Popup>Votre position</Popup>
                          </Marker>
                        )}

                        {/* Provider Marker */}
                        {providerLocation && (
                          <Marker position={providerLocation} icon={providerIcon}>
                            <Popup>Prestataire</Popup>
                          </Marker>
                        )}

                        {/* Route Line */}
                        {routeCoords.length > 0 && (
                          <Polyline
                            positions={routeCoords}
                            pathOptions={{ color: '#000080', weight: 4 }}
                          />
                        )}
                      </MapContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
