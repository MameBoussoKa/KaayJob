import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Calendar,
  Shield,
  UserCog,
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
const mockUsers = [
  {
    id: 1,
    name: "Mamadou Diallo",
    email: "mamadou.diallo@email.com",
    phone: "+221 77 123 45 67",
    role: "client",
    status: "actif",
    joinedDate: "2024-01-15",
    bookings: 12,
  },
  {
    id: 2,
    name: "Fatou Sow",
    email: "fatou.sow@email.com",
    phone: "+221 76 234 56 78",
    role: "prestataire",
    status: "actif",
    joinedDate: "2024-01-10",
    bookings: 45,
  },
  {
    id: 3,
    name: "Aliou Kanté",
    email: "aliou.kante@email.com",
    phone: "+221 70 345 67 89",
    role: "prestataire",
    status: "inactif",
    joinedDate: "2023-12-05",
    bookings: 8,
  },
  {
    id: 4,
    name: "Mariama Bah",
    email: "mariama.bah@email.com",
    phone: "+221 78 456 78 90",
    role: "client",
    status: "actif",
    joinedDate: "2024-02-01",
    bookings: 3,
  },
  {
    id: 5,
    name: "Ousmane Faye",
    email: "ousmane.faye@email.com",
    phone: "+221 75 567 89 01",
    role: "admin",
    status: "actif",
    joinedDate: "2023-11-20",
    bookings: 0,
  },
  {
    id: 6,
    name: "Aminata Touré",
    email: "aminata.toure@email.com",
    phone: "+221 77 678 90 12",
    role: "client",
    status: "actif",
    joinedDate: "2024-02-10",
    bookings: 7,
  },
  {
    id: 7,
    name: "Moussa Sidibé",
    email: "moussa.sidibe@email.com",
    phone: "+221 76 789 01 23",
    role: "prestataire",
    status: "en attente",
    joinedDate: "2024-02-18",
    bookings: 0,
  },
];

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Admin
          </Badge>
        );
      case "prestataire":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Prestataire
          </Badge>
        );
      case "client":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Client
          </Badge>
        );
      default:
        return <Badge>{role}</Badge>;
    }
  };

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
            Gestion des utilisateurs
          </h1>
          <p className="text-gray-500 mt-1">
            Gérez les clients, prestataires et administrateurs
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-[#000080] hover:bg-blue-900">
          <Plus size={20} className="mr-2" />
          Ajouter un utilisateur
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
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={roleFilter === "all" ? "default" : "outline"}
                onClick={() => setRoleFilter("all")}
                className={roleFilter === "all" ? "bg-[#000080]" : ""}
              >
                Tous
              </Button>
              <Button
                variant={roleFilter === "client" ? "default" : "outline"}
                onClick={() => setRoleFilter("client")}
                className={roleFilter === "client" ? "bg-[#000080]" : ""}
              >
                Clients
              </Button>
              <Button
                variant={roleFilter === "prestataire" ? "default" : "outline"}
                onClick={() => setRoleFilter("prestataire")}
                className={roleFilter === "prestataire" ? "bg-[#000080]" : ""}
              >
                Prestataires
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <UserCog className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total utilisateurs</p>
                <p className="text-2xl font-bold">{mockUsers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Prestataires</p>
                <p className="text-2xl font-bold">
                  {mockUsers.filter((u) => u.role === "prestataire").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nouveaux ce mois</p>
                <p className="text-2xl font-bold">
                  {
                    mockUsers.filter((u) => u.joinedDate.startsWith("2024-02"))
                      .length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Réservations</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.bookings}</TableCell>
                  <TableCell>{user.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Désactiver
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
