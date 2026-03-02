import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { validateFormField } from "../../lib/validations";
import { toast } from "sonner";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  defaultTab?: string;
}

export function LoginPage({ onNavigate, defaultTab }: LoginPageProps) {
  const [userType, setUserType] = useState<"customer" | "provider">(
    defaultTab === "login-provider" ? "provider" : "customer",
  );
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // États pour les erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validation en temps réel
    if (touched[field]) {
      validateFieldRealTime(field, value);
    }
  };

  // Validation en temps réel d'un champ
  const validateFieldRealTime = (field: string, value: string): boolean => {
    let error: string | null = null;

    switch (field) {
      case "email":
        error = validateFormField(value, "email", "Email");
        break;
      case "password":
        error = validateFormField(value, "password", "Mot de passe");
        break;
      case "name":
        error = validateFormField(value, "name", "Nom");
        break;
      case "phone":
        error = validateFormField(value, "phone", "Téléphone");
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Les mots de passe ne correspondent pas";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error || "" }));
    return !error;
  };

  // Gestion de la perte de focus
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateFieldRealTime(field, formData[field as keyof typeof formData]);
  };

  // Valider le formulaire complet
  const validateForm = (isSignup: boolean): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validation de l'email
    const emailError = validateFormField(formData.email, "email", "Email");
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }

    // Validation du mot de passe
    const passwordError = validateFormField(
      formData.password,
      "password",
      "Mot de passe",
    );
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    // Validation supplémentaire pour l'inscription
    if (isSignup) {
      const nameError = validateFormField(formData.name, "name", "Nom");
      if (nameError) {
        newErrors.name = nameError;
        isValid = false;
      }

      const phoneError = validateFormField(
        formData.phone,
        "phone",
        "Téléphone",
      );
      if (phoneError) {
        newErrors.phone = phoneError;
        isValid = false;
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
      name: true,
      phone: true,
      confirmPassword: true,
    });

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent, isSignup: boolean) => {
    e.preventDefault();

    // Validation avant soumission
    if (!validateForm(isSignup)) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    // Mock authentication - redirect based on user type
    if (userType === "provider") {
      onNavigate("prestataire-dashboard");
    } else {
      onNavigate("dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000080] to-[#001a99] flex items-center justify-center py-12 px-4 pt-20">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-[#FFF4EA] mb-2">KaayJob</h1>
          <p className="text-[#FFF4EA] text-lg">
            Connectez-vous avec des prestataires de confiance
          </p>
        </div>

        <Card
          className="shadow-2xl border-0 bg-white/95 backdrop-blur animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="bg-gradient-to-r from-[#000080] to-[#001a99]">
            <CardTitle className="text-center text-white text-2xl">
              Commencer
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <Tabs
              defaultValue="customer"
              className="w-full"
              onValueChange={(value: string) =>
                setUserType(value as "customer" | "provider")
              }
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                <TabsTrigger
                  value="customer"
                  className="text-base data-[state=active]:bg-[#000080] data-[state=active]:text-white"
                >
                  Client
                </TabsTrigger>
                <TabsTrigger
                  value="provider"
                  className="text-base data-[state=active]:bg-[#000080] data-[state=active]:text-white"
                >
                  Prestataire
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customer">
                <Tabs
                  defaultValue="login"
                  className="w-full"
                  onValueChange={(v) => setActiveTab(v as "login" | "signup")}
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Connexion</TabsTrigger>
                    <TabsTrigger value="signup">S'inscrire</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form
                      onSubmit={(e) => handleSubmit(e, false)}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="exemple@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          onBlur={() => handleBlur("email")}
                          className={`mt-1 text-base ${errors.email && touched.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && touched.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="password">Mot de passe *</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder=" minimum 8 caractères"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          onBlur={() => handleBlur("password")}
                          className={`mt-1 text-base ${errors.password && touched.password ? "border-red-500" : ""}`}
                        />
                        {errors.password && touched.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-base py-3"
                      >
                        Connexion
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form
                      onSubmit={(e) => handleSubmit(e, true)}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Entrez votre nom complet"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          onBlur={() => handleBlur("name")}
                          className={`mt-1 text-base ${errors.name && touched.name ? "border-red-500" : ""}`}
                        />
                        {errors.name && touched.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email-signup">Email *</Label>
                        <Input
                          id="email-signup"
                          type="email"
                          placeholder="exemple@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          onBlur={() => handleBlur("email")}
                          className={`mt-1 text-base ${errors.email && touched.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && touched.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Numéro de téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+221771234567"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          onBlur={() => handleBlur("phone")}
                          className={`mt-1 text-base ${errors.phone && touched.phone ? "border-red-500" : ""}`}
                        />
                        {errors.phone && touched.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="password-signup">Mot de passe *</Label>
                        <Input
                          id="password-signup"
                          type="password"
                          placeholder="Min. 8 caractères (majuscule, minuscule, chiffre)"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          onBlur={() => handleBlur("password")}
                          className={`mt-1 text-base ${errors.password && touched.password ? "border-red-500" : ""}`}
                        />
                        {errors.password && touched.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">
                          Confirmer le mot de passe *
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Répétez votre mot de passe"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          onBlur={() => handleBlur("confirmPassword")}
                          className={`mt-1 text-base ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""}`}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-base py-3"
                      >
                        S'inscrire
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="provider">
                <Tabs
                  defaultValue="login"
                  className="w-full"
                  onValueChange={(v) => setActiveTab(v as "login" | "signup")}
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Connexion</TabsTrigger>
                    <TabsTrigger value="signup">S'inscrire</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form
                      onSubmit={(e) => handleSubmit(e, false)}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="provider-email">Email *</Label>
                        <Input
                          id="provider-email"
                          type="email"
                          placeholder="exemple@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          onBlur={() => handleBlur("email")}
                          className={`mt-1 text-base ${errors.email && touched.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && touched.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="provider-password">
                          Mot de passe *
                        </Label>
                        <Input
                          id="provider-password"
                          type="password"
                          placeholder=" minimum 8 caractères"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          onBlur={() => handleBlur("password")}
                          className={`mt-1 text-base ${errors.password && touched.password ? "border-red-500" : ""}`}
                        />
                        {errors.password && touched.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-base py-3"
                      >
                        Connexion Prestataire
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form
                      onSubmit={(e) => handleSubmit(e, true)}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="provider-name">
                          Nom de l'entreprise *
                        </Label>
                        <Input
                          id="provider-name"
                          type="text"
                          placeholder="Entrez le nom de votre entreprise"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          onBlur={() => handleBlur("name")}
                          className={`mt-1 text-base ${errors.name && touched.name ? "border-red-500" : ""}`}
                        />
                        {errors.name && touched.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="provider-email-signup">Email *</Label>
                        <Input
                          id="provider-email-signup"
                          type="email"
                          placeholder="exemple@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          onBlur={() => handleBlur("email")}
                          className={`mt-1 text-base ${errors.email && touched.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && touched.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="provider-phone">
                          Numéro de téléphone *
                        </Label>
                        <Input
                          id="provider-phone"
                          type="tel"
                          placeholder="+221771234567"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          onBlur={() => handleBlur("phone")}
                          className={`mt-1 text-base ${errors.phone && touched.phone ? "border-red-500" : ""}`}
                        />
                        {errors.phone && touched.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="provider-password-signup">
                          Mot de passe *
                        </Label>
                        <Input
                          id="provider-password-signup"
                          type="password"
                          placeholder="Min. 8 caractères (majuscule, minuscule, chiffre)"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          onBlur={() => handleBlur("password")}
                          className={`mt-1 text-base ${errors.password && touched.password ? "border-red-500" : ""}`}
                        />
                        {errors.password && touched.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="provider-confirmPassword">
                          Confirmer le mot de passe *
                        </Label>
                        <Input
                          id="provider-confirmPassword"
                          type="password"
                          placeholder="Répétez votre mot de passe"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          onBlur={() => handleBlur("confirmPassword")}
                          className={`mt-1 text-base ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""}`}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-base py-3"
                      >
                        S'inscrire en tant que Prestataire
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate("home")}
            className="text-blue-600 hover:text-blue-800 text-base"
          >
            ← Retour à l'Accueil
          </button>
        </div>
      </div>
    </div>
  );
}
