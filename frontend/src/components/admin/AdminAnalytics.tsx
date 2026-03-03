import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Données analytiques simulées
const monthlyData = [
  { month: "Jan", bookings: 120, revenue: 1800000 },
  { month: "Fév", bookings: 145, revenue: 2175000 },
  { month: "Mar", bookings: 168, revenue: 2520000 },
  { month: "Avr", bookings: 156, revenue: 2340000 },
  { month: "Mai", bookings: 189, revenue: 2835000 },
  { month: "Juin", bookings: 210, revenue: 3150000 },
];

const topProviders = [
  {
    name: "Aliou Kanté",
    services: 5,
    bookings: 156,
    rating: 4.9,
    revenue: "2 340 000 CFA",
  },
  {
    name: "Fatou Sow",
    services: 3,
    bookings: 142,
    rating: 4.7,
    revenue: "1 136 000 CFA",
  },
  {
    name: "Mariama Bah",
    services: 2,
    bookings: 98,
    rating: 4.8,
    revenue: "1 176 000 CFA",
  },
  {
    name: "Aminata Touré",
    services: 4,
    bookings: 87,
    rating: 4.6,
    revenue: "870 000 CFA",
  },
  {
    name: "Ousmane Faye",
    services: 3,
    bookings: 76,
    rating: 4.5,
    revenue: "760 000 CFA",
  },
];

const serviceCategories = [
  { name: "Technologie", count: 25, percentage: 28 },
  { name: "Maison", count: 22, percentage: 25 },
  { name: "Éducation", count: 18, percentage: 20 },
  { name: "Beauté", count: 15, percentage: 17 },
  { name: "Bâtiment", count: 9, percentage: 10 },
];

const recentActivity = [
  {
    type: "nouveau_service",
    message: "Nouveau service ajouté : Réparation Ordinateur",
    time: "Il y a 2h",
  },
  {
    type: "nouveau_prestataire",
    message: "Nouveau prestataire inscrit : Moussa Sidibé",
    time: "Il y a 4h",
  },
  {
    type: "reservation",
    message: "Nouvelle réservation : Cours de Maths",
    time: "Il y a 5h",
  },
  {
    type: "avis",
    message: "Nouveau avis 5 étoiles pour Aliou Kanté",
    time: "Il y a 1 jour",
  },
  {
    type: "reservation",
    message: "Réservation terminée : Ménage à domicile",
    time: "Il y a 1 jour",
  },
];

export function AdminAnalytics() {
  const maxBookings = Math.max(...monthlyData.map((d) => d.bookings));

  return (
    <div className="p-6 lg:p-8 lg:ml-64">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#000080]">
          Analyses et Statistiques
        </h1>
        <p className="text-gray-500 mt-1">
          Suivez les performances de votre plateforme
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total réservations</p>
                <p className="text-3xl font-bold">988</p>
                <p className="text-sm text-blue-100 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" /> +18% ce mois
                </p>
              </div>
              <Calendar size={40} className="text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Revenus totaux</p>
                <p className="text-3xl font-bold">14.8M</p>
                <p className="text-sm text-green-100 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" /> +22% ce mois
                </p>
              </div>
              <DollarSign size={40} className="text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Utilisateurs actifs</p>
                <p className="text-3xl font-bold">1 248</p>
                <p className="text-sm text-purple-100 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" /> +12% ce mois
                </p>
              </div>
              <Users size={40} className="text-purple-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-700 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Note moyenne</p>
                <p className="text-3xl font-bold">4.7</p>
                <p className="text-sm text-orange-100 flex items-center mt-1">
                  <Star size={14} className="mr-1 fill-current" /> 245 avis
                </p>
              </div>
              <Star size={40} className="text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Graphique des réservations mensuelles */}
        <Card>
          <CardHeader>
            <CardTitle>Réservations mensuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-[#000080] rounded-t-lg transition-all duration-500 hover:bg-blue-700"
                    style={{
                      height: `${(data.bookings / maxBookings) * 200}px`,
                    }}
                    title={`${data.bookings} réservations`}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Catégories de services */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-gray-500">
                      {category.count} services
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-[#000080] h-3 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top prestataires */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Prestataires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProviders.map((provider, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#000080] text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-gray-500">
                        {provider.services} services • {provider.bookings}{" "}
                        réservation
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} className="fill-current" />
                      <span className="font-medium">{provider.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 border-l-2 border-[#000080]"
                >
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
