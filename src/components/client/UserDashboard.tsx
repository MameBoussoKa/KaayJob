import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Clock, MapPin, Star, Settings, Bell, CreditCard, User, Plus, ChevronRight } from "lucide-react";

interface UserDashboardProps {
  onNavigate: (page: string) => void;
}

export function UserDashboard({ onNavigate }: UserDashboardProps) {
  const user = {
    name: "Sarah Ahmed",
    email: "sarah.ahmed@email.com",
    phone: "+221 77 123 45 67",
  };

  const bookings = [
    {
      id: "BK001",
      provider: "Aliou Kanté",
      service: "Réparation Smartphone",
      date: "15 Mars 2026",
      time: "10:00",
      status: "En Attente",
      address: "Point E, Dakar",
      cost: "15 000 XOF",
    },
    {
      id: "BK002",
      provider: "Marie Martin",
      service: "Installation Électrique",
      date: "10 Mars 2026",
      time: "14:00",
      status: "Terminé",
      address: "Fann, Dakar",
      cost: "25 000 XOF",
      rating: 5,
    },
    {
      id: "BK003",
      provider: "Moussa Diop",
      service: "Nettoyage Maison",
      date: "8 Mars 2026",
      time: "09:00",
      status: "Terminé",
      address: "Mermoz, Dakar",
      cost: "20 000 XOF",
      rating: 4,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "En Attente":
        return <Badge className="bg-yellow-100 text-yellow-800">En Attente</Badge>;
      case "Terminé":
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Profile Card - Centré */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardContent className="p-8 text-center">
            <div className="w-28 h-28 bg-[#000080] rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-lg">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500 text-sm">{user.phone}</p>
            <div className="flex justify-center gap-3 mt-4">
              <Button variant="outline" size="sm">Modifier</Button>
              <Button size="sm" className="bg-[#000080]">Paramètres</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats - 4 cartes centrées */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: "12" },
            { label: "Terminées", value: "8" },
            { label: "En attente", value: "3" },
            { label: "Favoris", value: "0" },
          ].map((stat, i) => (
            <Card key={i} className="bg-white border-0 shadow text-center">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-[#000080]">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reservations - Centré */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Historique des Réservations</CardTitle>
              <Button className="bg-[#000080]" onClick={() => onNavigate("categories")}>
                <Plus size={16} className="mr-2" />
                Nouvelle
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{booking.service}</h4>
                  {getStatusBadge(booking.status)}
                </div>
                <p className="text-gray-600 text-sm mb-2">{booking.provider}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {booking.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {booking.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-green-600">{booking.cost}</span>
                    {booking.rating && (
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className={`w-4 h-4 ${i <= booking.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Menu - Centré */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-2">
            {[
              { icon: Calendar, label: "Mes Réservations" },
              { icon: Star, label: "Mes Favoris" },
              { icon: CreditCard, label: "Mes Paiements" },
              { icon: Bell, label: "Notifications" },
              { icon: Settings, label: "Paramètres du Compte" },
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
