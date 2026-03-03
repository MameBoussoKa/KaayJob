import { Users, Briefcase, Calendar, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
}

function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            <div
              className={`flex items-center mt-2 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              <TrendingUp
                size={16}
                className={`mr-1 ${trend === "down" && "rotate-180"}`}
              />
              <span>{change}</span>
            </div>
          </div>
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}
          >
            <Icon size={28} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Données simulées
const recentBookings = [
  {
    id: 1,
    client: "Mamadou Diallo",
    service: "Réparation Smartphone",
    date: "2024-02-24",
    time: "10:00",
    status: "confirmé",
  },
  {
    id: 2,
    client: "Fatou Sow",
    service: "Ménage à domicile",
    date: "2024-02-23",
    time: "14:00",
    status: "en_attente",
  },
  {
    id: 3,
    client: "Aliou Kanté",
    service: "Cours de mathématiques",
    date: "2024-02-23",
    time: "09:00",
    status: "terminé",
  },
];

const myServices = [
  { name: "Réparation Smartphone", bookings: 45, active: true },
  { name: "Réparation Ordinateur", bookings: 23, active: true },
  { name: "Dépannage réseau", bookings: 12, active: false },
];

export function PrestataireDashboard() {
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
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 lg:p-8 lg:ml-64">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#000080]">
          Bienvenue, Aliou !
        </h1>
        <p className="text-gray-500 mt-1">Gérez vos services et réservations</p>
      </div>

      {/* Badge Premium */}
      <Card className="mb-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">Plan Premium</p>
              <p className="text-yellow-100">Expire le 15 Mars 2024</p>
            </div>
            <Badge className="bg-white text-yellow-600 font-bold">Actif</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Réservations totales"
          value={80}
          change="+15% ce mois"
          trend="up"
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Services actifs"
          value={5}
          change="+2 ce mois"
          trend="up"
          icon={Briefcase}
          color="bg-green-500"
        />
        <StatCard
          title="Note moyenne"
          value={4.8}
          change="+0.2 ce mois"
          trend="up"
          icon={Star}
          color="bg-yellow-500"
        />
        <StatCard
          title="Clients satisfaits"
          value={62}
          change="+8 ce mois"
          trend="up"
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Réservations récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar size={20} className="text-[#000080]" />
              Réservations récentes
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {booking.client}
                    </p>
                    <p className="text-sm text-gray-500">{booking.service}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {booking.date} à {booking.time}
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(booking.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mes services */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Briefcase size={20} className="text-[#000080]" />
              Mes services
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto">
            <div className="space-y-4">
              {myServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">
                      {service.bookings} réservations
                    </p>
                  </div>
                  <Badge variant={service.active ? "default" : "secondary"}>
                    {service.active ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
