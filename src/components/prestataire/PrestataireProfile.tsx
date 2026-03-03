import { useState } from "react";
import { User, Mail, Phone, MapPin, Camera, Star, Save, Shield, Award, TrendingUp, Calendar, Edit3, CheckCircle, Globe, Clock, DollarSign, MessageCircle, Briefcase, MapPinned, Bell, Settings, LogOut, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { validateFormField } from "../../lib/validations";
import { toast } from "sonner";

export function PrestataireProfile() {
  const [formData, setFormData] = useState({
    firstName: "Aliou",
    lastName: "Kanté",
    email: "aliou.kante@email.com",
    phone: "+221 77 123 45 67",
    address: "Dakar, Senegal",
    bio: "Technicien informatique avec 5 ans d'expérience. Spécialisé en réparation smartphone et ordinateur.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Estados para erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateFieldRealTime(field, value);
    }
  };

  const validateFieldRealTime = (field: string, value: string): boolean => {
    let error: string | null = null;
    switch (field) {
      case "email":
        error = validateFormField(value, "email", "Email");
        break;
      case "phone":
        error = validateFormField(value, "phone", "Téléphone");
        break;
      case "firstName":
      case "lastName":
        error = validateFormField(value, "name", field === "firstName" ? "Prénom" : "Nom");
        break;
      case "address":
        error = validateFormField(value, "address", "Adresse");
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error || "" }));
    return !error;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateFieldRealTime(field, formData[field as keyof typeof formData]);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    const firstNameError = validateFormField(formData.firstName, "name", "Prénom");
    if (firstNameError) { newErrors.firstName = firstNameError; isValid = false; }

    const lastNameError = validateFormField(formData.lastName, "name", "Nom");
    if (lastNameError) { newErrors.lastName = lastNameError; isValid = false; }

    const emailError = validateFormField(formData.email, "email", "Email");
    if (emailError) { newErrors.email = emailError; isValid = false; }

    const phoneError = validateFormField(formData.phone, "phone", "Téléphone");
    if (phoneError) { newErrors.phone = phoneError; isValid = false; }

    const addressError = validateFormField(formData.address, "address", "Adresse");
    if (addressError) { newErrors.address = addressError; isValid = false; }

    setErrors(newErrors);
    setTouched({ firstName: true, lastName: true, email: true, phone: true, address: true, bio: true });
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs");
      return;
    }
    setIsEditing(false);
    toast.success("Profil mis à jour avec succès !");
  };

  const menuItems = [
    { id: "overview", label: "Aperçu", icon: User },
    { id: "info", label: "Informations", icon: Settings },
    { id: "abonnement", label: "Abonnement", icon: Star },
    { id: "avis", label: "Avis Clients", icon: MessageCircle },
  ];

  const stats = [
    { label: "Services", value: "127", icon: Briefcase, color: "from-blue-500 to-blue-600" },
    { label: "Note", value: "4.8", icon: Star, color: "from-yellow-500 to-yellow-600" },
    { label: "Expérience", value: "5 ans", icon: Calendar, color: "from-green-500 to-green-600" },
    { label: "Réponse", value: "98%", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
  ];

  const quickActions = [
    { label: "Mes Services", icon: Briefcase, count: 8 },
    { label: "Réservations", icon: Calendar, count: 12 },
    { label: "Messages", icon: MessageCircle, count: 5 },
    { label: "Revenus", icon: DollarSign, value: "125K" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 lg:pt-4 lg:ml-64 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#000080]">Mon Profil</h1>
            <p className="text-gray-500">Gérez votre visibilité et vos informations</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="gap-2">
              <Bell size={18} />
              <span className="hidden sm:inline">Notifications</span>
            </Button>
            <Button className="bg-[#000080] hover:bg-[#001a99] gap-2">
              <Globe size={18} />
              <span className="hidden sm:inline">Voir le site</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Profile Card */}
            <Card className="bg-white border-0 shadow-xl">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-[#000080] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                      AK
                    </div>
                    <Button size="icon" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#000080] hover:bg-[#001a99]">
                      <Camera size={14} />
                    </Button>
                    <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <h2 className="text-xl font-bold mt-3 text-[#000080]">{formData.firstName} {formData.lastName}</h2>
                  <p className="text-gray-500 text-sm text-center px-4">{formData.bio.substring(0, 60)}...</p>
                  <Badge className="mt-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-0">Premium</Badge>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={16} className="text-[#000080]" />
                    <span>{formData.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={16} className="text-[#000080]" />
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={16} className="text-[#000080]" />
                    <span>{formData.email}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-[#000080] hover:bg-[#001a99]"
                  onClick={() => { setActiveTab("info"); setIsEditing(true); }}
                >
                  <Edit3 size={16} className="mr-2" />
                  Modifier le profil
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, i) => (
                  <Button key={i} variant="ghost" className="w-full justify-between h-12">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <action.icon size={16} className="text-[#000080]" />
                      </div>
                      <span className="text-sm">{action.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {action.count && <Badge variant="secondary">{action.count}</Badge>}
                      {action.value && <span className="font-bold text-green-600">{action.value}</span>}
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card className="bg-gradient-to-br from-[#000080] to-[#001a99] text-white border-0 shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Star className="w-6 h-6 fill-current" />
                  <Badge className="bg-green-500">Actif</Badge>
                </div>
                <h3 className="font-bold text-lg">Plan Premium</h3>
                <p className="text-white/70 text-sm mb-4">Expire le 15 Mars 2026</p>
                <Progress value={75} className="h-2 bg-white/20" />
                <p className="text-xs text-white/60 mt-2">75% de la période utilisé</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <Card key={i} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                      <stat.icon className="text-white w-6 h-6" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation Tabs */}
            <Card className="bg-white border-0 shadow-lg overflow-hidden">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === item.id 
                          ? "border-[#000080] text-[#000080] bg-blue-50/50" 
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <CardContent className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Verification Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <Shield className="text-white w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold">Identité vérifiée</p>
                            <p className="text-xs text-green-600">Compte sécurisé</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <Mail className="text-white w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold">Email vérifié</p>
                            <p className="text-xs text-blue-600">Notifications actives</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                            <Phone className="text-white w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold">Téléphone vérifié</p>
                            <p className="text-xs text-purple-600">SMS activés</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Award className="text-[#000080]" />
                        Compétences
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {["Réparation smartphone", "Dépannage PC", "Installation réseau", "Récupération données", "Configuration"].map((skill, i) => (
                          <Badge key={i} className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Recent Reviews */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <MessageCircle className="text-[#000080]" />
                        Avis récents
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: "Mamadou S.", rating: 5, comment: "Excellent travail très professionnel !", date: "Il y a 2 jours" },
                          { name: "Fatou B.", rating: 5, comment: "Je recommande fortement.", date: "Il y a 1 semaine" },
                        ].map((review, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#000080] rounded-full flex items-center justify-center text-white font-bold">
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">{review.name}</p>
                                  <p className="text-xs text-gray-500">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 mt-2 text-sm">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Info Tab */}
                {activeTab === "info" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Prénom</Label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          onBlur={() => handleBlur("firstName")}
                          className={`mt-1 ${errors.firstName ? "border-red-500" : ""}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Nom</Label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          onBlur={() => handleBlur("lastName")}
                          className={`mt-1 ${errors.lastName ? "border-red-500" : ""}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Téléphone</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          onBlur={() => handleBlur("phone")}
                          className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Adresse</Label>
                      <Input
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        onBlur={() => handleBlur("address")}
                        className={`mt-1 ${errors.address ? "border-red-500" : ""}`}
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Biographie</Label>
                      <textarea
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        maxLength={500}
                      />
                      <p className="text-xs text-gray-500 text-right">{formData.bio.length}/500</p>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-[#000080] hover:bg-[#001a99]">
                        <Save size={16} className="mr-2" />
                        Enregistrer
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setActiveTab("overview")}>
                        Annuler
                      </Button>
                    </div>
                  </form>
                )}

                {/* Abonnement Tab */}
                {activeTab === "abonnement" && (
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Star className="text-white w-8 h-8 fill-current" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">Plan Premium</h3>
                            <p className="text-gray-600">Renouvellement le 15 Mars 2026</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700 px-4 py-2">Actif</Badge>
                      </div>
                      <div className="mt-4 flex gap-6">
                        <div>
                          <p className="text-2xl font-bold text-[#000080]">127</p>
                          <p className="text-xs text-gray-500">Vues ce mois</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#000080]">18</p>
                          <p className="text-xs text-gray-500">Messages</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">125K</p>
                          <p className="text-xs text-gray-500">Revenus</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <h4 className="font-semibold mb-3">Vos privilèges</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Services illimités</li>
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Badge VIP</li>
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Visibilité prioritaire</li>
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Support 24/7</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-semibold mb-3">Prochaines fonctionnalités</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center gap-2"><Clock size={14} /> Analytics avancé</li>
                          <li className="flex items-center gap-2"><Clock size={14} /> Page personnalisée</li>
                          <li className="flex items-center gap-2"><Clock size={14} /> Assistant IA</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-[#000080] hover:bg-[#001a99]">Renouveler</Button>
                      <Button variant="outline" className="flex-1">Voir les plans</Button>
                    </div>
                  </div>
                )}

                {/* Avis Tab */}
                {activeTab === "avis" && (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-[#000080] to-[#001a99] rounded-2xl text-white">
                      <div className="text-5xl font-bold mb-2">4.8</div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-6 h-6 ${s <= 4 ? "text-yellow-400 fill-current" : "text-white/30"}`} />
                        ))}
                      </div>
                      <p className="text-white/80">127 avis</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Mamadou S.", rating: 5, comment: "Excellent travail ! Très professionnel et rapide.", date: "Il y a 2 jours" },
                        { name: "Fatou B.", rating: 5, comment: "Très satisfaite du service. Je recommande !", date: "Il y a 1 semaine" },
                        { name: "Ousmane D.", rating: 4, comment: "Bon travail, légèrement en retard.", date: "Il y a 2 semaines" },
                        { name: "Aminata M.", rating: 5, comment: "Service impeccable, je reviendrai.", date: "Il y a 3 semaines" },
                      ].map((review, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#000080] rounded-full flex items-center justify-center text-white font-bold">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{review.name}</p>
                                <p className="text-xs text-gray-500">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
