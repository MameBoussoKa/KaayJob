import { useState } from "react";
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
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
    price: 15000,
    bookings: 45,
    status: "actif",
    description: "Réparation de tous types de smartphones",
  },
  {
    id: 2,
    name: "Réparation Ordinateur",
    category: "Technologie",
    price: 25000,
    bookings: 23,
    status: "actif",
    description: "Réparation laptop et desktop",
  },
  {
    id: 3,
    name: "Dépannage réseau",
    category: "Technologie",
    price: 10000,
    bookings: 12,
    status: "inactif",
    description: "Configuration et dépannage réseau",
  },
  {
    id: 4,
    name: "Installation software",
    category: "Technologie",
    price: 8000,
    bookings: 8,
    status: "actif",
    description: "Installation Windows, Mac, Linux",
  },
];

export function PrestataireServices() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = mockServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 lg:p-8 lg:ml-64">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#000080]">Mes services</h1>
          <p className="text-gray-500 mt-1">Gérez vos services proposés</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-[#000080] hover:bg-blue-900">
          <Plus size={20} className="mr-2" />
          Ajouter un service
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
              <p className="text-sm text-gray-500">Total réservations</p>
              <p className="text-2xl font-bold text-blue-600">
                {mockServices.reduce((acc, s) => acc + s.bookings, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtre */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <Input
            placeholder="Rechercher un service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Tableau */}
      <Card>
        <CardHeader>
          <CardTitle>Liste de vos services</CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix (CFA)</TableHead>
                <TableHead>Réservations</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">
                        {service.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{service.category}</Badge>
                  </TableCell>
                  <TableCell>{service.price.toLocaleString()}</TableCell>
                  <TableCell>{service.bookings}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        service.status === "actif" ? "default" : "secondary"
                      }
                    >
                      {service.status === "actif" ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
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
                        <DropdownMenuItem>
                          {service.status === "actif" ? (
                            <>
                              <ToggleLeft size={14} className="mr-2" />
                              Désactiver
                            </>
                          ) : (
                            <>
                              <ToggleRight size={14} className="mr-2" />
                              Activer
                            </>
                          )}
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
