import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Clock, MapPin, User } from "lucide-react";
import { validateFormField } from "../../lib/validations";
import { toast } from "sonner";

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export function BookingPage({ onNavigate }: BookingPageProps) {
  const [date, setDate] = useState<Date>();
  const [viewDate, setViewDate] = useState(() => new Date());
  const [formData, setFormData] = useState({
    time: "",
    address: "",
    city: "",
    phone: "",
    notes: "",
    serviceType: "",
    duration: "1",
  });

  // États pour les erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculer les dates valides pour le calendrier
  const minDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);

  const maxDate = useMemo(() => {
    const max = new Date();
    max.setMonth(max.getMonth() + 2);
    return max;
  }, []);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const serviceTypes = [
    "Installation de Canalisations",
    "Réparation de Fuites",
    "Nettoyage de Drains",
    "Réparation de Chauffe-eau",
    "Service d'Urgence",
    "Plomberie Générale",
  ];

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
      case "phone":
        error = validateFormField(value, "phone", "Téléphone");
        break;
      case "address":
        error = validateFormField(value, "address", "Adresse");
        break;
      case "city":
        error = validateFormField(value, "city", "Ville");
        break;
      case "serviceType":
        if (!value || value.trim() === "") {
          error = "Le type de service est requis";
        }
        break;
      case "time":
        if (!value || value.trim() === "") {
          error = "L'heure est requise";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error || "" }));
    return !error;
  };

  // Gestion de la perte de focus
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = formData[field as keyof typeof formData];
    if (value !== undefined) {
      validateFieldRealTime(field, value);
    }
  };

  // Valider le formulaire complet
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validation du type de service
    if (!formData.serviceType || formData.serviceType.trim() === "") {
      newErrors.serviceType = "Le type de service est requis";
      isValid = false;
    }

    // Validation de la date
    if (!date) {
      newErrors.date = "La date est requise";
      isValid = false;
    }

    // Validation de l'heure
    if (!formData.time || formData.time.trim() === "") {
      newErrors.time = "L'heure est requise";
      isValid = false;
    }

    // Validation de l'adresse
    const addressError = validateFormField(
      formData.address,
      "address",
      "Adresse",
    );
    if (addressError) {
      newErrors.address = addressError;
      isValid = false;
    }

    // Validation de la ville
    const cityError = validateFormField(formData.city, "city", "Ville");
    if (cityError) {
      newErrors.city = cityError;
      isValid = false;
    }

    // Validation du téléphone
    const phoneError = validateFormField(formData.phone, "phone", "Téléphone");
    if (phoneError) {
      newErrors.phone = phoneError;
      isValid = false;
    }

    setErrors(newErrors);
    setTouched({
      serviceType: true,
      date: true,
      time: true,
      address: true,
      city: true,
      phone: true,
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation avant soumission
    if (!validateForm()) {
      return;
    }

    // Afficher l'animation de chargement
    setIsSubmitting(true);
    setShowSuccess(false);

    // Simuler l'envoi de la réservation (2 secondes)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Afficher l'animation de succès
    setIsSubmitting(false);
    setShowSuccess(true);

    // Après 2 secondes de plus, naviguer vers la page des services
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate("categories");
    }, 2000);
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#000080] mb-2">
            Réservez Votre Service
          </h1>
          <p className="text-gray-600 text-lg">
            Planifiez un rendez-vous avec Ahmed Khan - Plombier Expert
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 animate-slide-up">
            <Card className="bg-white border-2 border-[#000080]/10 shadow-lg hover:border-[#000080]/30 transition-all">
              <CardHeader className="bg-gradient-to-r from-[#FFF4EA] to-white border-b border-[#000080]/10">
                <CardTitle className="text-2xl text-[#000080]">
                  Détails du Service
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Type */}
                  <div>
                    <Label
                      htmlFor="serviceType"
                      className="text-base font-semibold text-[#000080]"
                    >
                      Type de Service *
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        handleInputChange("serviceType", value);
                        setTouched((prev) => ({ ...prev, serviceType: true }));
                        if (value) validateFieldRealTime("serviceType", value);
                      }}
                    >
                      <SelectTrigger
                        className={`mt-2 text-base border-[#000080]/20 focus:border-[#000080] ${errors.serviceType && touched.serviceType ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Sélectionnez le type de service dont vous avez besoin" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem
                            key={service}
                            value={service}
                            className="text-base"
                          >
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceType && touched.serviceType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.serviceType}
                      </p>
                    )}
                  </div>

                  {/* Date Picker - Modern Calendar version */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-[#000080]">
                      Date Préférée *
                    </Label>
                    
                    {/* Sélection mois et année */}
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-t-lg border border-b-0 border-gray-200">
                      <select
                        title="Mois"
                        value={viewDate.getMonth()}
                        onChange={(e) => {
                          const newDate = new Date(viewDate);
                          newDate.setMonth(parseInt(e.target.value));
                          setViewDate(newDate);
                          if (newDate >= minDate && newDate <= maxDate) {
                            setDate(newDate);
                          }
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded-md text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#000080]"
                      >
                        {["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"].map((month, idx) => (
                          <option key={month} value={idx}>{month}</option>
                        ))}
                      </select>
                      <select
                        title="Année"
                        value={viewDate.getFullYear()}
                        onChange={(e) => {
                          const newDate = new Date(viewDate);
                          newDate.setFullYear(parseInt(e.target.value));
                          setViewDate(newDate);
                          if (newDate >= minDate && newDate <= maxDate) {
                            setDate(newDate);
                          }
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded-md text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#000080]"
                      >
                        {[2024, 2025, 2026, 2027].map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Calendrier */}
                    <div className="border border-gray-200 rounded-b-lg bg-white p-2">
                      {/* En-tête jours */}
                      <div className="grid grid-cols-7 gap-1 mb-1">
                        {["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"].map((day, idx) => (
                          <div key={day} className={`text-center text-xs font-semibold py-1 ${idx === 0 ? "text-red-500" : "text-gray-500"}`}>
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Grille de jours */}
                      <div className="grid grid-cols-7 gap-1">
                        {(() => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const currentDate = new Date(viewDate);
                          currentDate.setHours(0, 0, 0, 0);
                          const year = currentDate.getFullYear();
                          const month = currentDate.getMonth();
                          const firstDay = new Date(year, month, 1).getDay();
                          const daysInMonth = new Date(year, month + 1, 0).getDate();
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          const days: any[] = [];
                          
                          // Jours vides au début
                          for (let i = 0; i < firstDay; i++) {
                            days.push(<div key={`empty-${i}`} className="h-8"></div>);
                          }
                          
                          // Jours du mois
                          for (let day = 1; day <= daysInMonth; day++) {
                            const dayDate = new Date(year, month, day);
                            dayDate.setHours(0, 0, 0, 0);
                            const isPast = dayDate < today;
                            const isFuture = dayDate > maxDate;
                            const isDisabled = isPast || isFuture;
                            const isSelected = date && dayDate.getTime() === new Date(date).setHours(0,0,0,0);
                            const isToday = dayDate.getTime() === today.getTime();
                            
                            days.push(
                              <button
                                key={day}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => {
                                  setDate(dayDate);
                                  setTouched((prev) => ({ ...prev, date: true }));
                                  setErrors((prev) => ({ ...prev, date: "" }));
                                }}
                                className={`h-8 w-full rounded text-sm font-medium transition-all flex items-center justify-center ${
                                  isSelected 
                                    ? "bg-[#000080] text-white shadow" 
                                    : isToday 
                                      ? "bg-blue-100 text-[#000080] border border-[#000080] font-bold text-xs"
                                      : isDisabled 
                                        ? "text-gray-300 cursor-not-allowed bg-gray-50 text-xs"
                                        : "hover:bg-gray-100 text-gray-700 text-xs"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          }
                          return days;
                        })()}
                      </div>
                    </div>
                    
                    {/* Date sélectionnée affichée */}
                    {date && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded flex items-center gap-2 text-sm">
                        <CalendarIcon className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 font-medium">
                          {date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      </div>
                    )}
                    
                    {errors.date && touched.date && (
                      <p className="text-red-500 text-sm">{errors.date}</p>
                    )}
                  </div>

                  {/* Time Slot */}
                  <div>
                    <Label htmlFor="time" className="text-base">
                      Heure Préférée *
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        handleInputChange("time", value);
                        setTouched((prev) => ({ ...prev, time: true }));
                        validateFieldRealTime("time", value);
                      }}
                    >
                      <SelectTrigger
                        className={`mt-2 text-base ${errors.time && touched.time ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Sélectionnez votre heure préférée" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem
                            key={time}
                            value={time}
                            className="text-base"
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.time && touched.time && (
                      <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                    )}
                  </div>

                  {/* Duration */}
                  <div>
                    <Label htmlFor="duration" className="text-base">
                      Durée Estimée *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("duration", value)
                      }
                      defaultValue="1"
                    >
                      <SelectTrigger className="mt-2 text-base">
                        <SelectValue placeholder="Combien d'heures avez-vous besoin ?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1" className="text-base">
                          1 heure - 25€
                        </SelectItem>
                        <SelectItem value="2" className="text-base">
                          2 heures - 50€
                        </SelectItem>
                        <SelectItem value="3" className="text-base">
                          3 heures - 75€
                        </SelectItem>
                        <SelectItem value="4" className="text-base">
                          4 heures - 100€
                        </SelectItem>
                        <SelectItem value="5" className="text-base">
                          5+ heures - Devis personnalisé
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className="text-base">
                      Adresse du Service *
                    </Label>
                    <Input
                      id="address"
                      placeholder="Entrez votre adresse complète"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      onBlur={() => handleBlur("address")}
                      className={`mt-2 text-base ${errors.address && touched.address ? "border-red-500" : ""}`}
                    />
                    {errors.address && touched.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <Label htmlFor="city" className="text-base">
                      Ville *
                    </Label>
                    <Input
                      id="city"
                      placeholder="Entrez votre ville"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      onBlur={() => handleBlur("city")}
                      className={`mt-2 text-base ${errors.city && touched.city ? "border-red-500" : ""}`}
                    />
                    {errors.city && touched.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-base">
                      Téléphone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Entrez votre numéro (ex: +221771234567)"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      onBlur={() => handleBlur("phone")}
                      className={`mt-2 text-base ${errors.phone && touched.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes" className="text-base">
                      Détails Supplémentaires
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Entrez des détails supplémentaires sur vos besoins de service..."
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
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
                <CardTitle className="text-xl">
                  Récapitulatif de Réservation
                </CardTitle>
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
                    <span>
                      {date
                        ? date.toLocaleDateString("fr-FR")
                        : "Date non sélectionnée"}
                    </span>
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
                    disabled={
                      !date ||
                      !formData.time ||
                      !formData.address ||
                      !formData.serviceType ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Réservation en cours...
                      </span>
                    ) : showSuccess ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Réservation envoyée !
                      </span>
                    ) : (
                      "Confirmer la Réservation"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onNavigate("service-detail")}
                    className="w-full border-gray-300 text-gray-700 py-3 text-base"
                    disabled={isSubmitting}
                  >
                    Retour au Prestataire
                  </Button>
                </div>

                {/* Guarantee */}
                <div className="text-xs text-gray-600 text-center pt-4 border-t">
                  ✓ 100% Garantie de Satisfaction
                  <br />
                  ✓ Annulation jusqu'à 2 heures avant
                  <br />✓ Paiement direct au prestataire
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
