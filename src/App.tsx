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

// Admin imports
import { AdminSidebar } from "./components/admin/AdminSidebar";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminServices } from "./components/admin/AdminServices";
import { AdminBookings } from "./components/admin/AdminBookings";
import { AdminAnalytics } from "./components/admin/AdminAnalytics";
import { AdminSettings } from "./components/admin/AdminSettings";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Rendu des pages admin
  const renderAdminPage = () => {
    switch (currentPage) {
      case "admin-dashboard":
        return <AdminDashboard />;
      case "admin-users":
        return <AdminUsers />;
      case "admin-services":
        return <AdminServices />;
      case "admin-bookings":
        return <AdminBookings />;
      case "admin-analytics":
        return <AdminAnalytics />;
      case "admin-settings":
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  const renderCurrentPage = () => {
    // Pages admin
    if (currentPage.startsWith("admin-")) {
      return renderAdminPage();
    }

    // Pages client
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
      {currentPage.startsWith("admin-") ? (
        <>
          <AdminSidebar currentPage={currentPage} onNavigate={handleNavigate} />
          {renderCurrentPage()}
        </>
      ) : (
        <>
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          {renderCurrentPage()}
        </>
      )}
    </div>
  );
}
