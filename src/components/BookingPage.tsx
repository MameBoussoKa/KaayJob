import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Clock, MapPin, User } from "lucide-react";

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export function BookingPage({ onNavigate }: BookingPageProps) {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    time: "",
    address: "",
    city: "",
    phone: "",
    notes: "",
    serviceType: "",
    duration: "1"
  });

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00"
  ];

  const serviceTypes = [
    "Installation de Canalisations",
    "Réparation de Fuites", 
    "Nettoyage de Drains",
    "Réparation de Chauffe-eau",
    "Service d'Urgence",
    "Plomberie Générale"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('checkout');
  };

  const calculateTotal = () => {
    const hours = parseInt(formData.duration);
    const hourlyRate = 25;
    return hours * hourlyRate;
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-[#000080] mb-2">Réservez Votre Service</h1>
          <p className="text-gray-600 text-lg">Planifiez un rendez-vous avec Ahmed Khan - Plombier Expert</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 animate-slide-up">
            <Card className="bg-white border-2 border-[#000080]/10 shadow-lg hover:border-[#000080]/30 transition-all">
              <CardHeader className="bg-gradient-to-r from-[#FFF4EA] to-white border-b border-[#000080]/10">
                <CardTitle className="text-2xl text-[#000080]">Détails du Service</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Type */}
                  <div>
                    <Label htmlFor="serviceType" className="text-base font-semibold text-[#000080]">Type de Service *</Label>
                    <Select onValueChange={(value) => handleInputChange('serviceType', value)}>
                      <SelectTrigger className="mt-2 text-base border-[#000080]/20 focus:border-[#000080]">
                        <SelectValue placeholder="Sélectionnez le type de service dont vous avez besoin" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service} className="text-base">
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <Label className="text-base">Date Préférée *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-2 text-base h-12"
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {date ? date.toLocaleDateString() : "Sélectionnez une date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <Label htmlFor="time" className="text-base">Heure Préférée *</Label>
                    <Select onValueChange={(value) => handleInputChange('time', value)}>
                      <SelectTrigger className="mt-2 text-base">
                        <SelectValue placeholder="Sélectionnez votre heure préférée" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="text-base">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div>
                    <Label htmlFor="duration" className="text-base">Durée Estimée *</Label>
                    <Select onValueChange={(value) => handleInputChange('duration', value)} defaultValue="1">
                      <SelectTrigger className="mt-2 text-base">
                        <SelectValue placeholder="Combien d'heures avez-vous besoin ?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1" className="text-base">1 heure - 25€</SelectItem>
                        <SelectItem value="2" className="text-base">2 heures - 50€</SelectItem>
                        <SelectItem value="3" className="text-base">3 heures - 75€</SelectItem>
                        <SelectItem value="4" className="text-base">4 heures - 100€</SelectItem>
                        <SelectItem value="5" className="text-base">5+ heures - Devis personnalisé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className="text-base">Adresse du Service *</Label>
                    <Input
                      id="address"
                      placeholder="Entrez votre adresse complète"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="mt-2 text-base"
                      required
                    />
                  </div>

                  {/* City */}
                  <div>
                    <Label htmlFor="city" className="text-base">Ville *</Label>
                    <Input
                      id="city"
                      placeholder="Entrez votre ville"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="mt-2 text-base"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-base">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Entrez votre numéro de téléphone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2 text-base"
                      required
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes" className="text-base">Détails Supplémentaires</Label>
                    <Textarea
                      id="notes"
                      placeholder="Entrez des détails supplémentaires sur vos besoins de service..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="mt-2 text-base min-h-[100px]"
                      rows={4}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="bg-white border-0 shadow-md sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl">Récapitulatif de Réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Provider Info */}
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ahmed Khan</h3>
                    <p className="text-sm text-gray-600">Plombier Expert</p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{date ? date.toLocaleDateString() : "Date non sélectionnée"}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{formData.time || "Heure non sélectionnée"}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{formData.address || "Adresse non fournie"}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Tarif Horaire</span>
                    <span>25€/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durée</span>
                    <span>{formData.duration} heure(s)</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-green-600">{calculateTotal()}€</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base"
                    disabled={!date || !formData.time || !formData.address || !formData.serviceType}
                  >
                    Continuer vers le Paiement
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('service-detail')}
                    className="w-full border-gray-300 text-gray-700 py-3 text-base"
                  >
                    Retour au Prestataire
                  </Button>
                </div>

                {/* Guarantee */}
                <div className="text-xs text-gray-600 text-center pt-4 border-t">
                  ✓ 100% Garantie de Satisfaction<br />
                  ✓ Annulation jusqu'à 2 heures avant<br />
                  ✓ Paiement sécurisé
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
