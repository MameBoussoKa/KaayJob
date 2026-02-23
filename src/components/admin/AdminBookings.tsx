import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Calendar,
  Check,
  X,
  Clock,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Données simulées (paiements gérés directement entre client et prestataire)
const mockBookings = [
  {
    id: 1,
    client: "Mamadou Diallo",
    service: "Réparation Smartphone",
    provider: "Aliou Kanté",
    date: "2024-02-24",
    time: "10:00",
    amount: 15000,
    status: "confirmé",
  },
  {
    id: 2,
    client: "Fatou Sow",
    service: "Ménage à domicile",
    provider: "Mariama Bah",
    date: "2024-02-23",
    time: "14:00",
    amount: 8000,
    status: "en attente",
  },
  {
    id: 3,
    client: "Aliou Kanté",
    service: "Cours de mathématiques",
    provider: "Aminata Touré",
    date: "2024-02-23",
    time: "09:00",
    amount: 10000,
    status: "confirmé",
  },
  {
    id: 4,
    client: "Mariama Bah",
    service: "Coiffure",
    provider: "Fatou Sow",
    date: "2024-02-22",
    time: "11:00",
    amount: 12000,
    status: "annulé",
  },
  {
    id: 5,
    client: "Ousmane Faye",
    service: "Plomberie",
    provider: "Moussa Sidibé",
    date: "2024-02-22",
    time: "15:00",
    amount: 25000,
    status: "terminé",
  },
  {
    id: 6,
    client: "Aminata Touré",
    service: "Cours de Physique",
    provider: "Aliou Kanté",
    date: "2024-02-21",
    time: "10:00",
    amount: 12000,
    status: "terminé",
  },
  {
    id: 7,
    client: "Moussa Sidibé",
    service: "Jardinage",
    provider: "Ousmane Faye",
    date: "2024-02-20",
    time: "08:00",
    amount: 6000,
    status: "annulé",
  },
];

export function AdminBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmé":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <Check size={12} /> Confirmé
          </Badge>
        );
      case "en attente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex items-center gap-1">
            <Clock size={12} /> En attente
          </Badge>
        );
      case "terminé":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Terminé
          </Badge>
        );
      case "annulé":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
            <X size={12} /> Annulé
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 lg:p-8 lg:ml-64">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#000080]">
            Gestion des réservations
          </h1>
          <p className="text-gray-500 mt-1">
            Suivez et gérez toutes les réservations
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-[#000080] hover:bg-blue-900">
          <Plus size={20} className="mr-2" />
          Nouvelle réservation
        </Button>
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
                placeholder="Rechercher par client ou service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                className={statusFilter === "all" ? "bg-[#000080]" : ""}
              >
                Toutes
              </Button>
              <Button
                variant={statusFilter === "confirmé" ? "default" : "outline"}
                onClick={() => setStatusFilter("confirmé")}
                className={statusFilter === "confirmé" ? "bg-[#000080]" : ""}
              >
                Confirmées
              </Button>
              <Button
                variant={statusFilter === "en attente" ? "default" : "outline"}
                onClick={() => setStatusFilter("en attente")}
                className={statusFilter === "en attente" ? "bg-[#000080]" : ""}
              >
                En attente
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

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500">Total réservations</p>
              <p className="text-2xl font-bold">{mockBookings.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockBookings.filter((b) => b.status === "en attente").length}
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

      {/* Tableau des réservations */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Note: Les paiements sont gérés directement entre le client et le
            prestataire
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Prestataire</TableHead>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <span className="text-gray-500">#{booking.id}</span>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{booking.client}</p>
                  </TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>{booking.provider}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span>
                        {booking.date} {booking.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{booking.amount.toLocaleString()} CFA</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir détails</DropdownMenuItem>
                        {booking.status === "en attente" && (
                          <DropdownMenuItem className="text-green-600">
                            Confirmer
                          </DropdownMenuItem>
                        )}
                        {booking.status !== "annulé" &&
                          booking.status !== "terminé" && (
                            <DropdownMenuItem className="text-red-600">
                              Annuler
                            </DropdownMenuItem>
                          )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
