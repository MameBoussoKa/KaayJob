import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Save,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

export function AdminSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    newBooking: true,
    newReview: true,
    newsletter: false,
  });

  return (
    <div className="p-6 lg:p-8 lg:ml-64">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#000080]">Paramètres</h1>
        <p className="text-gray-500 mt-1">
          Gérez les paramètres de votre plateforme
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings size={16} />
            Général
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            Profil
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell size={16} />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            Sécurité
          </TabsTrigger>
        </TabsList>

        {/* Paramètres généraux */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de la plateforme</CardTitle>
                <CardDescription>
                  Les informations visibles par les utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="platformName">Nom de la plateforme</Label>
                  <Input id="platformName" defaultValue="KaayJob" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    defaultValue="Trouvez le meilleur service près de chez vous"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email de contact</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contact@kaayjob.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue="+221 33 123 45 67" />
                </div>
                <Button className="bg-[#000080] hover:bg-blue-900">
                  <Save size={16} className="mr-2" />
                  Enregistrer
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Préférences régionales</CardTitle>
                <CardDescription>
                  Paramètres de langue et de devise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="language">Langue par défaut</Label>
                  <Input id="language" defaultValue="Français" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Input id="currency" defaultValue="FCFA (XOF)" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Input id="timezone" defaultValue="Africa/Dakar (UTC+0)" />
                </div>
                <Button className="bg-[#000080] hover:bg-blue-900">
                  <Save size={16} className="mr-2" />
                  Enregistrer
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profil administrateur */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Mon profil administrateur</CardTitle>
              <CardDescription>
                Gérez vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-[#000080] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  OA
                </div>
                <div>
                  <Button variant="outline" className="mb-2">
                    Changer la photo
                  </Button>
                  <p className="text-sm text-gray-500">
                    JPG, PNG ou GIF. Max 2MB
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Ousmane" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Administateur" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="adminEmail">Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  defaultValue="admin@kaayjob.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="adminPhone">Téléphone</Label>
                <Input id="adminPhone" defaultValue="+221 77 123 45 67" />
              </div>
              <Button className="bg-[#000080] hover:bg-blue-900">
                <Save size={16} className="mr-2" />
                Mettre à jour le profil
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notifications</CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Canaux de notification</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-gray-500" />
                      <div>
                        <p className="font-medium">Notifications par email</p>
                        <p className="text-sm text-gray-500">
                          Recevez les notifications par email
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell size={20} className="text-gray-500" />
                      <div>
                        <p className="font-medium">Notifications SMS</p>
                        <p className="text-sm text-gray-500">
                          Recevez les notifications par SMS
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, sms: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Types de notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouvelle réservation</p>
                      <p className="text-sm text-gray-500">
                        Quand un client réserve un service
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newBooking}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          newBooking: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouvel avis</p>
                      <p className="text-sm text-gray-500">
                        Quand un client laisse un avis
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newReview}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          newReview: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-gray-500">
                        Recevez des nouvelles de la plateforme
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          newsletter: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button className="bg-[#000080] hover:bg-blue-900">
                <Save size={16} className="mr-2" />
                Enregistrer les préférences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sécurité */}
        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Changer le mot de passe</CardTitle>
                <CardDescription>
                  Mettez à jour votre mot de passe régulièrement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">
                    Confirmer le mot de passe
                  </Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="bg-[#000080] hover:bg-blue-900">
                  Mettre à jour le mot de passe
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentification à deux facteurs</CardTitle>
                <CardDescription>
                  Ajoutez une couche de sécurité supplémentaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={24} className="text-green-600" />
                    <div>
                      <p className="font-medium">2FA désactivé</p>
                      <p className="text-sm text-gray-500">
                        Protégez votre compte avec la vérification en 2 étapes
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Activer</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessions actives</CardTitle>
                <CardDescription>
                  Gérez vos sessions de connexion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Session actuelle</p>
                      <p className="text-sm text-gray-500">
                        Dakar, Senegal • Chrome sur Windows
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
