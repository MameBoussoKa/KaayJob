import { Users, Briefcase, Calendar, TrendingUp, Activity } from "lucide-react";
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

// Données simulées pour l'exemple
const recentBookings = [
  {
    id: 1,
    client: "Mamadou Diallo",
    service: "Réparation Smartphone",
    status: "confirmé",
    date: "2024-02-24",
  },
  {
    id: 2,
    client: "Fatou Sow",
    service: "Ménage à domicile",
    status: "en attente",
    date: "2024-02-23",
  },
  {
    id: 3,
    client: "Aliou Kanté",
    service: "Cours de mathématiques",
    status: "confirmé",
    date: "2024-02-23",
  },
  {
    id: 4,
    client: "Mariama Bah",
    service: "Coiffure",
    status: "annulé",
    date: "2024-02-22",
  },
  {
    id: 5,
    client: "Ousmane Faye",
    service: "Plomberie",
    status: "confirmé",
    date: "2024-02-22",
  },
];

const topServices = [
  { name: "Réparation Smartphone", bookings: 145 },
  { name: "Ménage à domicile", bookings: 128 },
  { name: "Cours particuliers", bookings: 98 },
  { name: "Coiffure", bookings: 87 },
];

export function AdminDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmé":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Confirmé
          </Badge>
        );
      case "en attente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            En attente
          </Badge>
        );
      case "annulé":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Annulé
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 lg:p-8 lg:ml-64">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#000080]">
          Tableau de bord Admin
        </h1>
        <p className="text-gray-500 mt-1">
          Bienvenue dans votre espace d'administration
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Utilisateurs"
          value={1248}
          change="+12% ce mois"
          trend="up"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Services actifs"
          value={89}
          change="+5 ce mois"
          trend="up"
          icon={Briefcase}
          color="bg-green-500"
        />
        <StatCard
          title="Réservations"
          value={456}
          change="+18% ce mois"
          trend="up"
          icon={Calendar}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Réservations récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity size={20} className="text-[#000080]" />
              Réservations récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                  </div>
                  <div className="text-right">
                    {getStatusBadge(booking.status)}
                    <p className="text-sm text-gray-500 mt-1">{booking.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services populaires */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Briefcase size={20} className="text-[#000080]" />
              Services les plus demandés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#000080] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {service.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {service.bookings} réservations
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Note: Les paiements sont gérés directement entre client et
              prestataire
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
