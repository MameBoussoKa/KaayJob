import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { validateFormField } from "../../lib/validations";
import { toast } from "sonner";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  defaultTab?: string;
}

export function LoginPage({ onNavigate, defaultTab }: LoginPageProps) {
  const [userType, setUserType] = useState<"customer" | "provider">(
    defaultTab === "login-provider" ? "provider" : "customer",
  );
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      validateFieldRealTime(field, value);
    }
  };

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

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateFieldRealTime(field, formData[field as keyof typeof formData]);
  };

  const validateForm = (isSignup: boolean): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    const emailError = validateFormField(formData.email, "email", "Email");
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }

    const passwordError = validateFormField(
      formData.password,
      "password",
      "Mot de passe",
    );
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

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

    if (!validateForm(isSignup)) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    if (userType === "provider") {
      onNavigate("prestataire-dashboard");
    } else {
      onNavigate("dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://i.pinimg.com/1200x/91/a0/d5/91a0d55c89af2d617f2a84398be117af.jpg')`,
        }}
      />
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        {/* Card */}
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold text-white tracking-tight" style={{ fontFamily: 'Poppins, Inter, sans-serif', textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)' }}>
              KaayJob
            </h1>
            <p className="text-white/80 text-lg mt-2 font-light tracking-wide">
              Votre gateway vers l'excellence
            </p>
          </div>

          {/* Glass Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] shadow-2xl overflow-hidden animate-slide-up">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#000080] to-[#0000FF] px-8 py-6">
              <h2 className="text-2xl font-bold text-white text-center" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                Bienvenue
              </h2>
              <p className="text-white/80 text-center text-sm mt-1">
                {activeTab === "login" 
                  ? "Connectez-vous à votre compte" 
                  : "Créez votre compte en quelques secondes"}
              </p>
            </div>

            {/* Card Content */}
            <div className="p-8">
              <Tabs
                defaultValue="customer"
                className="w-full"
                onValueChange={(value: string) =>
                  setUserType(value as "customer" | "provider")
                }
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-1">
                  <TabsTrigger
                    value="customer"
                    className="text-sm font-medium text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#000080] data-[state=active]:to-[#0000FF] data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
                  >
                    Client
                  </TabsTrigger>
                  <TabsTrigger
                    value="provider"
                    className="text-sm font-medium text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#000080] data-[state=active]:to-[#0000FF] data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
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
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 rounded-lg p-1">
                      <TabsTrigger 
                        value="login"
                        className="text-sm text-white/70 data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-md transition-all"
                      >
                        Connexion
                      </TabsTrigger>
                      <TabsTrigger 
                        value="signup"
                        className="text-sm text-white/70 data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-md transition-all"
                      >
                        S'inscrire
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white/90 text-sm font-medium">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="exemple@email.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              onBlur={() => handleBlur("email")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.email && touched.email && (
                            <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                            Mot de passe
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              onBlur={() => handleBlur("password")}
                              className="pl-11 pr-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                            >
                              {showPassword ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )}
                            </button>
                          </div>
                          {errors.password && touched.password && (
                            <p className="text-red-300 text-xs mt-1">{errors.password}</p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#000080] to-[#0000FF] hover:from-[#000066] hover:to-[#0000EE] text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-[#000080]/30 hover:shadow-[#000080]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          Connexion
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="signup">
                      <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white/90 text-sm font-medium">
                            Nom complet
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="Entrez votre nom complet"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              onBlur={() => handleBlur("name")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.name && touched.name && (
                            <p className="text-red-300 text-xs mt-1">{errors.name}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email-signup" className="text-white/90 text-sm font-medium">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="email-signup"
                              type="email"
                              placeholder="exemple@email.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              onBlur={() => handleBlur("email")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.email && touched.email && (
                            <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white/90 text-sm font-medium">
                            Téléphone
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+221771234567"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              onBlur={() => handleBlur("phone")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.phone && touched.phone && (
                            <p className="text-red-300 text-xs mt-1">{errors.phone}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password-signup" className="text-white/90 text-sm font-medium">
                            Mot de passe
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="password-signup"
                              type={showPassword ? "text" : "password"}
                              placeholder="Min. 8 caractères"
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              onBlur={() => handleBlur("password")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.password && touched.password && (
                            <p className="text-red-300 text-xs mt-1">{errors.password}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-white/90 text-sm font-medium">
                            Confirmer le mot de passe
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Répétez votre mot de passe"
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                              onBlur={() => handleBlur("confirmPassword")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.confirmPassword && touched.confirmPassword && (
                            <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#000080] to-[#0000FF] hover:from-[#000066] hover:to-[#0000EE] text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-[#000080]/30 hover:shadow-[#000080]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          Créer mon compte
                          <ArrowRight className="w-4 h-4" />
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
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 rounded-lg p-1">
                      <TabsTrigger 
                        value="login"
                        className="text-sm text-white/70 data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-md transition-all"
                      >
                        Connexion
                      </TabsTrigger>
                      <TabsTrigger 
                        value="signup"
                        className="text-sm text-white/70 data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-md transition-all"
                      >
                        S'inscrire
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="provider-email" className="text-white/90 text-sm font-medium">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="provider-email"
                              type="email"
                              placeholder="exemple@email.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              onBlur={() => handleBlur("email")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.email && touched.email && (
                            <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="provider-password" className="text-white/90 text-sm font-medium">
                            Mot de passe
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="provider-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              onBlur={() => handleBlur("password")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.password && touched.password && (
                            <p className="text-red-300 text-xs mt-1">{errors.password}</p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#000080] to-[#0000FF] hover:from-[#000066] hover:to-[#0000EE] text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-[#000080]/30 hover:shadow-[#000080]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          Connexion Prestataire
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="signup">
                      <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="provider-name" className="text-white/90 text-sm font-medium">
                            Nom de l'entreprise
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="provider-name"
                              type="text"
                              placeholder="Entrez le nom de votre entreprise"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              onBlur={() => handleBlur("name")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.name && touched.name && (
                            <p className="text-red-300 text-xs mt-1">{errors.name}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="provider-email-signup" className="text-white/90 text-sm font-medium">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="provider-email-signup"
                              type="email"
                              placeholder="exemple@email.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              onBlur={() => handleBlur("email")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.email && touched.email && (
                            <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="provider-phone" className="text-white/90 text-sm font-medium">
                            Téléphone
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="provider-phone"
                              type="tel"
                              placeholder="+221771234567"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              onBlur={() => handleBlur("phone")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.phone && touched.phone && (
                            <p className="text-red-300 text-xs mt-1">{errors.phone}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="provider-password-signup" className="text-white/90 text-sm font-medium">
                            Mot de passe
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="provider-password-signup"
                              type={showPassword ? "text" : "password"}
                              placeholder="Min. 8 caractères"
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              onBlur={() => handleBlur("password")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.password && touched.password && (
                            <p className="text-red-300 text-xs mt-1">{errors.password}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="provider-confirmPassword" className="text-white/90 text-sm font-medium">
                            Confirmer le mot de passe
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <Input
                              id="provider-confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Répétez votre mot de passe"
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                              onBlur={() => handleBlur("confirmPassword")}
                              className="pl-11 bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20 focus:bg-white/20 transition-all duration-300 rounded-lg"
                            />
                          </div>
                          {errors.confirmPassword && touched.confirmPassword && (
                            <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#000080] to-[#0000FF] hover:from-[#000066] hover:to-[#0000EE] text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-[#000080]/30 hover:shadow-[#000080]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          Devenir partenaire
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-white/50 text-xs mt-6">
            © 2024 KaayJob. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
