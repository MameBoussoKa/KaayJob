import { useState } from "react";
import { User, Mail, Phone, MapPin, Camera, Star, Save } from "lucide-react";
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
import { Badge } from "../ui/badge";

export function PrestataireProfile() {
  return (
    <div className="p-6 lg:p-8 lg:ml-64">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#000080]">Mon profil</h1>
        <p className="text-gray-500 mt-1">
          Gérez vos informations personnelles
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Photo de profil */}
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Photo de profil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-40 h-40 bg-[#000080] rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4">
              AK
            </div>
            <Button variant="outline" className="w-full">
              <Camera size={16} className="mr-2" />
              Changer la photo
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              JPG, PNG ou GIF. Max 2MB
            </p>
          </CardContent>
        </Card>

        {/* Informations personnelles */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Ces informations seront visibles par les clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" defaultValue="Aliou" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" defaultValue="Kanté" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="aliou.kante@email.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" defaultValue="+221 77 123 45 67" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" defaultValue="Dakar, Senegal" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Biographie</Label>
              <textarea
                id="bio"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="Technicien informatique avec 5 ans d'expérience. Spécialisé en réparation smartphone et ordinateur."
              />
            </div>
            <Button className="bg-[#000080] hover:bg-blue-900">
              <Save size={16} className="mr-2" />
              Enregistrer
            </Button>
          </CardContent>
        </Card>

        {/* Badge et Abonnement */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mon abonnement</CardTitle>
            <CardDescription>
              Statut de votre abonnement Premium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="text-white fill-current" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">Plan Premium</p>
                  <p className="text-sm text-gray-600">
                    Expire le 15 Mars 2024
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Actif</Badge>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Vos privilèges :</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Services illimités</li>
                <li>✓ Badge VIP sur votre profil</li>
                <li>✓ Visibilité prioritaire</li>
                <li>✓ Support prioritaire</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Voir les plans disponibles
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
