import { useState } from "react";
import { Search, Check, X, Phone, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Données simulées
const mockBookings = [
  {
    id: 1,
    client: "Mamadou Diallo",
    service: "Réparation Smartphone",
    date: "2024-02-24",
    time: "10:00",
    phone: "+221 77 123 45 67",
    status: "confirmé",
    notes: "Écran cassé",
  },
  {
    id: 2,
    client: "Fatou Sow",
    service: "Ménage à domicile",
    date: "2024-02-23",
    time: "14:00",
    phone: "+221 76 234 56 78",
    status: "en_attente",
    notes: "3 pièces",
  },
  {
    id: 3,
    client: "Aliou Kanté",
    service: "Cours de mathématiques",
    date: "2024-02-23",
    time: "09:00",
    phone: "+221 70 345 67 89",
    status: "terminé",
    notes: "Algèbre",
  },
  {
    id: 4,
    client: "Mariama Bah",
    service: "Coiffure",
    date: "2024-02-22",
    time: "11:00",
    phone: "+221 78 456 78 90",
    status: "annulé",
    notes: "Tresse",
  },
  {
    id: 5,
    client: "Ousmane Faye",
    service: "Plomberie",
    date: "2024-02-22",
    time: "15:00",
    phone: "+221 75 567 89 01",
    status: "terminé",
    notes: "Robinet qui fuit",
  },
];

export function PrestataireBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = booking.client
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmé":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case "en_attente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
        );
      case "terminé":
        return <Badge className="bg-blue-100 text-blue-800">Terminé</Badge>;
      case "annulé":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 lg:p-8 lg:ml-64">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#000080]">Mes réservations</h1>
        <p className="text-gray-500 mt-1">Gérez vos réservations</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold">{mockBookings.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockBookings.filter((b) => b.status === "en_attente").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500">Confirmées</p>
              <p className="text-2xl font-bold text-green-600">
                {mockBookings.filter((b) => b.status === "confirmé").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500">Terminées</p>
              <p className="text-2xl font-bold text-blue-600">
                {mockBookings.filter((b) => b.status === "terminé").length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Rechercher par client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                className={statusFilter === "all" ? "bg-[#000080]" : ""}
              >
                Toutes
              </Button>
              <Button
                variant={statusFilter === "en_attente" ? "default" : "outline"}
                onClick={() => setStatusFilter("en_attente")}
                className={statusFilter === "en_attente" ? "bg-[#000080]" : ""}
              >
                En attente
              </Button>
              <Button
                variant={statusFilter === "confirmé" ? "default" : "outline"}
                onClick={() => setStatusFilter("confirmé")}
                className={statusFilter === "confirmé" ? "bg-[#000080]" : ""}
              >
                Confirmées
              </Button>
              <Button
                variant={statusFilter === "terminé" ? "default" : "outline"}
                onClick={() => setStatusFilter("terminé")}
                className={statusFilter === "terminé" ? "bg-[#000080]" : ""}
              >
                Terminées
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Réservations */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredBookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{booking.client}</h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  <p className="text-gray-600">{booking.service}</p>
                  <p className="text-sm text-gray-500 mt-1">{booking.notes}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {booking.date} à {booking.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={14} />
                      {booking.phone}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {booking.status === "en_attente" && (
                    <>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Check size={16} className="mr-1" />
                        Accepter
                      </Button>
                      <Button variant="destructive">
                        <X size={16} className="mr-1" />
                        Refuser
                      </Button>
                    </>
                  )}
                  {booking.status === "confirmé" && (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Check size={16} className="mr-1" />
                      Terminer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
