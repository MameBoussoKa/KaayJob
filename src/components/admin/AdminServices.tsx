import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Star,
  Edit,
  Trash2,
  Eye,
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

// Données simulées
const mockServices = [
  {
    id: 1,
    name: "Réparation Smartphone",
    category: "Technologie",
    provider: "Mamadou Diallo",
    price: 15000,
    status: "actif",
    rating: 4.8,
    bookings: 145,
  },
  {
    id: 2,
    name: "Ménage à domicile",
    category: "Maison",
    provider: "Fatou Sow",
    price: 8000,
    status: "actif",
    rating: 4.5,
    bookings: 128,
  },
  {
    id: 3,
    name: "Cours de mathématiques",
    category: "Éducation",
    provider: "Aliou Kanté",
    price: 10000,
    status: "actif",
    rating: 4.9,
    bookings: 98,
  },
  {
    id: 4,
    name: "Coiffure",
    category: "Beauté",
    provider: "Mariama Bah",
    price: 12000,
    status: "actif",
    rating: 4.7,
    bookings: 87,
  },
  {
    id: 5,
    name: "Plomberie",
    category: "Bâtiment",
    provider: "Ousmane Faye",
    price: 25000,
    status: "inactif",
    rating: 4.6,
    bookings: 45,
  },
  {
    id: 6,
    name: "Cours de Physique",
    category: "Éducation",
    provider: "Aminata Touré",
    price: 12000,
    status: "actif",
    rating: 4.4,
    bookings: 32,
  },
  {
    id: 7,
    name: "Jardinage",
    category: "Maison",
    provider: "Moussa Sidibé",
    price: 6000,
    status: "en attente",
    rating: 0,
    bookings: 0,
  },
];

export function AdminServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "actif":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Actif
          </Badge>
        );
      case "inactif":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Inactif
          </Badge>
        );
      case "en attente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            En attente
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
            Gestion des services
          </h1>
          <p className="text-gray-500 mt-1">
            Gérez les services proposés sur la plateforme
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-[#000080] hover:bg-blue-900">
          <Plus size={20} className="mr-2" />
          Ajouter un service
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
                placeholder="Rechercher par nom ou catégorie..."
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
                Tous
              </Button>
              <Button
                variant={statusFilter === "actif" ? "default" : "outline"}
                onClick={() => setStatusFilter("actif")}
                className={statusFilter === "actif" ? "bg-[#000080]" : ""}
              >
                Actifs
              </Button>
              <Button
                variant={statusFilter === "inactif" ? "default" : "outline"}
                onClick={() => setStatusFilter("inactif")}
                className={statusFilter === "inactif" ? "bg-[#000080]" : ""}
              >
                Inactifs
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
              <p className="text-sm text-gray-500">Total services</p>
              <p className="text-2xl font-bold">{mockServices.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500">Services actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {mockServices.filter((s) => s.status === "actif").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500">Note moyenne</p>
              <p className="text-2xl font-bold text-yellow-600">4.7</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-500">Total réservations</p>
              <p className="text-2xl font-bold text-purple-600">535</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des services */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prestataire</TableHead>
                <TableHead>Prix (CFA)</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Réservations</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <p className="font-medium">{service.name}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{service.category}</Badge>
                  </TableCell>
                  <TableCell>{service.provider}</TableCell>
                  <TableCell>{service.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-yellow-500 fill-yellow-500"
                      />
                      <span>{service.rating > 0 ? service.rating : "-"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{service.bookings}</TableCell>
                  <TableCell>{getStatusBadge(service.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye size={14} className="mr-2" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit size={14} className="mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 size={14} className="mr-2" />
                          Supprimer
                        </DropdownMenuItem>
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
