import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { ServiceCategoriesPage } from "./components/ServiceCategoriesPage";
import { ServiceDetailPage } from "./components/ServiceDetailPage";
import { BookingPage } from "./components/BookingPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { UserDashboard } from "./components/UserDashboard";
import { ContactPage } from "./components/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      case "categories":
        return <ServiceCategoriesPage onNavigate={handleNavigate} />;
      case "service-detail":
        return <ServiceDetailPage onNavigate={handleNavigate} />;
      case "booking":
        return <BookingPage onNavigate={handleNavigate} />;
      case "checkout":
        return <CheckoutPage onNavigate={handleNavigate} />;
      case "dashboard":
        return <UserDashboard onNavigate={handleNavigate} />;
      case "contact":
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderCurrentPage()}
    </div>
  );
}