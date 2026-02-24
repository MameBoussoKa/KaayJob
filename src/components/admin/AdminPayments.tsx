import { useState } from "react";
import {
  Search,
  Plus,
  Check,
  X,
  DollarSign,
  CreditCard,
  Clock,
  AlertCircle,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

// Données simulées
const mockPayments = [
  {
    id: 1,
    provider: "Aliou Kanté",
    amount: 9900,
    plan: "Premium",
    method: "Wave",
    transactionId: "WAVE-2024-001",
    date: "2024-02-15",
    status: "validé",
    validatedBy: "Admin",
  },
  {
    id: 2,
    provider: "Fatou Sow",
    amount: 24900,
    plan: "Pro",
    method: "Orange Money",
    transactionId: "OM-2024-045",
    date: "2024-02-14",
    status: "validé",
    validatedBy: "Admin",
  },
  {
    id: 3,
    provider: "Moussa Sidibé",
    amount: 9900,
    plan: "Premium",
    method: "Wave",
    transactionId: "WAVE-2024-089",
    date: "2024-02-18",
    status: "en_attente",
    validatedBy: "-",
  },
  {
    id: 4,
    provider: "Aminata Touré",
    amount: 24900,
    plan: "Pro",
    method: "Carte bancaire",
    transactionId: "CB-2024-012",
    date: "2024-02-17",
    status: "rejeté",
    validatedBy: "Admin",
  },
  {
    id: 5,
    provider: "Ousmane Faye",
    amount: 9900,
    plan: "Premium",
    method: "Wave",
    transactionId: "WAVE-2024-102",
    date: "2024-02-19",
    status: "en_attente",
    validatedBy: "-",
  },
];

export function AdminPayments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validé":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <Check size={12} /> Validé
          </Badge>
        );
      case "en_attente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex items-center gap-1">
            <Clock size={12} /> En attente
          </Badge>
        );
      case "rejeté":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
            <X size={12} /> Rejeté
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Wave":
        return <span className="text-purple-600 font-bold">W</span>;
      case "Orange Money":
        return <span className="text-orange-600 font-bold">OM</span>;
      case "Carte bancaire":
        return <CreditCard size={16} className="text-blue-600" />;
      default:
        return <DollarSign size={16} className="text-gray-600" />;
    }
  };

  const totalRevenue = mockPayments
    .filter((p) => p.status === "validé")
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingPayments = mockPayments.filter(
    (p) => p.status === "en_attente",
  ).length;

  return (
    <div className="p-6 lg:p-8 lg:ml-64">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#000080]">
            Gestion des paiements
          </h1>
          <p className="text-gray-500 mt-1">
            Validez et suivez les paiements des prestataires
          </p>
        </div>
        <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 bg-[#000080] hover:bg-blue-900">
              <Plus size={20} className="mr-2" />
              Enregistrer un paiement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enregistrer un paiement</DialogTitle>
              <DialogDescription>
                Entrez les détails du paiement effectué par le prestataire
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Prestataire</label>
                <Input placeholder="Nom du prestataire" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Plan</label>
                <Input placeholder="Premium / Pro" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Montant (CFA)</label>
                <Input type="number" placeholder="9900" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Méthode de paiement
                </label>
                <Input placeholder="Wave / Orange Money" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">ID de transaction</label>
                <Input placeholder="WAVE-2024-XXX" />
              </div>
              <Button className="bg-[#000080] hover:bg-blue-900 w-full">
                Enregistrer le paiement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenus totaux</p>
                <p className="text-2xl font-bold">
                  {totalRevenue.toLocaleString()} CFA
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  En attente de validation
                </p>
                <p className="text-2xl font-bold">{pendingPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Check className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Paiements validés</p>
                <p className="text-2xl font-bold">
                  {mockPayments.filter((p) => p.status === "validé").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerte si paiements en attente */}
      {pendingPayments > 0 && (
        <Card className="mb-6 border-yellow-400 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-yellow-800">
              <AlertCircle size={24} />
              <div>
                <p className="font-medium">
                  {pendingPayments} paiement(x) en attente de validation
                </p>
                <p className="text-sm">
                  Veuillez valider ou rejeter ces paiements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
                placeholder="Rechercher par nom ou ID transaction..."
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
                variant={statusFilter === "en_attente" ? "default" : "outline"}
                onClick={() => setStatusFilter("en_attente")}
                className={statusFilter === "en_attente" ? "bg-[#000080]" : ""}
              >
                En attente
              </Button>
              <Button
                variant={statusFilter === "validé" ? "default" : "outline"}
                onClick={() => setStatusFilter("validé")}
                className={statusFilter === "validé" ? "bg-[#000080]" : ""}
              >
                Validés
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des paiements */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des paiements</CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prestataire</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>ID Transaction</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Validé par</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <p className="font-medium">{payment.provider}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.plan}</Badge>
                  </TableCell>
                  <TableCell>{payment.amount.toLocaleString()} CFA</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getMethodIcon(payment.method)}
                      <span>{payment.method}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {payment.transactionId}
                    </code>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.validatedBy}</TableCell>
                  <TableCell className="text-right">
                    {payment.status === "en_attente" && (
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Valider
                        </Button>
                        <Button size="sm" variant="destructive">
                          Rejeter
                        </Button>
                      </div>
                    )}
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
