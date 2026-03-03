import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Clock, MapPin, Star, Settings, Bell, CreditCard, User, Plus, ChevronRight, Mail, Phone, Shield, Award, Briefcase } from "lucide-react";

export function PrestataireProfile() {
  const [formData] = useState({
    firstName: "Aliou",
    lastName: "Kanté",
    email: "aliou.kante@email.com",
    phone: "+221 77 123 45 67",
    address: "Dakar, Senegal",
    bio: "Technicien informatique avec 5 ans d'expérience.",
  });

  const stats = [
    { label: "Services", value: "127" },
    { label: "Note", value: "4.8" },
    { label: "Expérience", value: "5 ans" },
    { label: "Réponse", value: "98%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Profile Card - Centré */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardContent className="p-8 text-center">
            <div className="w-28 h-28 bg-[#000080] rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-lg">
              {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{formData.firstName} {formData.lastName}</h2>
            <p className="text-gray-500">{formData.email}</p>
            <p className="text-gray-500 text-sm">{formData.phone}</p>
            <Badge className="mt-3 bg-yellow-500 text-white">Premium</Badge>
            <div className="flex justify-center gap-3 mt-4">
              <Button variant="outline" size="sm">Modifier</Button>
              <Button size="sm" className="bg-[#000080]">Paramètres</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats - 4 cartes centrées */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-white border-0 shadow text-center">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-[#000080]">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Cards - Centré */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail size={20} className="text-[#000080]" />
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone size={20} className="text-[#000080]" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin size={20} className="text-[#000080]" />
              <span>{formData.address}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Shield size={20} className="text-green-500" />
              <span>Identité vérifiée</span>
            </div>
          </CardContent>
        </Card>

        {/* Compétences - Centré */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Compétences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Réparation smartphone", "Dépannage PC", "Installation réseau", "Récupération données"].map((skill, i) => (
                <Badge key={i} className="bg-gray-100 text-gray-700">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu - Centré */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-2">
            {[
              { icon: Briefcase, label: "Mes Services" },
              { icon: Calendar, label: "Réservations" },
              { icon: Star, label: "Avis Clients" },
              { icon: CreditCard, label: "Abonnement" },
              { icon: Settings, label: "Paramètres" },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 text-left">
                <div className="flex items-center gap-3">
                  <item.icon size={20} className="text-[#000080]" />
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
