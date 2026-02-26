import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar, Clock, MapPin, Star, CreditCard, Settings, User, History } from "lucide-react";

interface UserDashboardProps {
  onNavigate: (page: string) => void;
}

export function UserDashboard({ onNavigate }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("bookings");

  const user = {
    name: "Sarah Ahmed",
    email: "sarah.ahmed@email.com",
    phone: "+33 6 12 34 56 78",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
  };

  const bookings = [
    {
      id: "BK001",
      provider: "Ahmed Khan",
      service: "Plomberie",
      date: "15 Mars 2024",
      time: "10:00",
      status: "En Attente",
      address: "123 Rue Principale, Karachi",
      cost: "50€",
      rating: null
    },
    {
      id: "BK002", 
      provider: "Marie Martin",
      service: "Travaux Électriques",
      date: "10 Mars 2024",
      time: "14:00",
      status: "Terminé",
      address: "456 Avenue du Chêne, Karachi",
      cost: "75€",
      rating: 5
    },
    {
      id: "BK003",
      provider: "Hassan Ali",
      service: "Nettoyage de Maison",
      date: "8 Mars 2024", 
      time: "09:00",
      status: "Terminé",
      address: "789 Chemin des Pins, Karachi",
      cost: "40€",
      rating: 4
    }
  ];

  const payments = [
    {
      id: "PAY001",
      booking: "BK002",
      amount: "75€",
      method: "Carte de Crédit",
      date: "10 Mars 2024",
      status: "Payé"
    },
    {
      id: "PAY002",
      booking: "BK003", 
      amount: "40€",
      method: "Espèces",
      date: "8 Mars 2024",
      status: "Payé"
    },
    {
      id: "PAY003",
      booking: "BK001",
      amount: "50€",
      method: "En Attente",
      date: "15 Mars 2024",
      status: "En Attente"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "En Attente":
        return <Badge className="bg-yellow-100 text-yellow-800">En Attente</Badge>;
      case "Terminé":
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
      case "Annulé":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="bg-white border-0 shadow-md mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">SA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 text-lg mb-1">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => onNavigate('categories')}
              >
                Réserver un Nouveau Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="bookings" className="text-base">
              <History className="w-5 h-5 mr-2" />
              Mes Réservations
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-base">
              <CreditCard className="w-5 h-5 mr-2" />
              Paiements
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-base">
              <Settings className="w-5 h-5 mr-2" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Mes Réservations</h2>
                <Button 
                  onClick={() => onNavigate('categories')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Réserver un Nouveau Service
                </Button>
              </div>
              
              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="bg-white border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {booking.provider} - {booking.service}
                            </h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="text-gray-600 text-base">ID de Réservation: {booking.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{booking.cost}</p>
                          {booking.rating && (
                            <div className="flex items-center justify-end mt-1">
                              {renderStars(booking.rating)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2" />
                          <span>{booking.address}</span>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 mt-4">
                        {booking.status === "En Attente" && (
                          <>
                            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                              Annuler
                            </Button>
                            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                              Reprogrammer
                            </Button>
                          </>
                        )}
                        {booking.status === "Terminé" && !booking.rating && (
                          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                            Noter le Service
                          </Button>
                        )}
                        <Button variant="outline" className="border-gray-300 text-gray-700">
                          Voir les Détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Historique des Paiements</h2>
              
              <Card className="bg-white border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Transactions Récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Paiement pour {payment.booking}</h3>
                            <p className="text-gray-600 text-sm">
                              {payment.method} • {payment.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">{payment.amount}</p>
                          {getStatusBadge(payment.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Paramètres du Compte</h2>
              
              <Card className="bg-white border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Informations Personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-base">Nom Complet</Label>
                      <Input
                        id="fullName"
                        defaultValue={user.name}
                        className="mt-2 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        className="mt-2 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base">Numéro de Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue={user.phone}
                        className="mt-2 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-base">Adresse par Défaut</Label>
                      <Input
                        id="address"
                        placeholder="Entrez votre adresse"
                        className="mt-2 text-base"
                      />
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Enregistrer les Modifications
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Préférences de Notification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Confirmations de Réservation</h3>
                        <p className="text-sm text-gray-600">Soyez notifié lorsque les réservations sont confirmées</p>
                      </div>
                      <Button variant="outline" size="sm">Basculer</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Rappels de Service</h3>
                        <p className="text-sm text-gray-600">Recevez des rappels avant les services programmés</p>
                      </div>
                      <Button variant="outline" size="sm">Basculer</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Offres Promotionnelles</h3>
                        <p className="text-sm text-gray-600">Recevez des mises à jour sur les offres spéciales et réductions</p>
                      </div>
                      <Button variant="outline" size="sm">Basculer</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
