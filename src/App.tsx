import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/client/HomePage";
import { LoginPage } from "./components/client/LoginPage";
import { ServiceCategoriesPage } from "./components/client/ServiceCategoriesPage";
import { ServiceProvidersListPage } from "./components/client/ServiceProvidersListPage";
import { ServiceDetailPage } from "./components/client/ServiceDetailPage";
import { BookingPage } from "./components/client/BookingPage";
import { CheckoutPage } from "./components/client/CheckoutPage";
import { UserDashboard } from "./components/client/UserDashboard";
import { ContactPage } from "./components/client/ContactPage";

// Admin imports
import { AdminSidebar } from "./components/admin/AdminSidebar";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminServices } from "./components/admin/AdminServices";
import { AdminBookings } from "./components/admin/AdminBookings";
import { AdminAnalytics } from "./components/admin/AdminAnalytics";
import { AdminSettings } from "./components/admin/AdminSettings";
import { AdminSubscriptions } from "./components/admin/AdminSubscriptions";
import { AdminPayments } from "./components/admin/AdminPayments";

// Prestataire imports
import { PrestataireSidebar } from "./components/prestataire/PrestataireSidebar";
import { PrestataireDashboard } from "./components/prestataire/PrestataireDashboard";
import { PrestataireServices } from "./components/prestataire/PrestataireServices";
import { PrestataireBookings } from "./components/prestataire/PrestataireBookings";
import { PrestataireProfile } from "./components/prestataire/PrestataireProfile";
import { PrestataireSettings } from "./components/prestataire/PrestataireSettings";

// Admin imports
import { AdminSidebar } from "./components/admin/AdminSidebar";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminServices } from "./components/admin/AdminServices";
import { AdminBookings } from "./components/admin/AdminBookings";
import { AdminAnalytics } from "./components/admin/AdminAnalytics";
import { AdminSettings } from "./components/admin/AdminSettings";
import { AdminSubscriptions } from "./components/admin/AdminSubscriptions";
import { AdminPayments } from "./components/admin/AdminPayments";

// Prestataire imports
import { PrestataireSidebar } from "./components/prestataire/PrestataireSidebar";
import { PrestataireDashboard } from "./components/prestataire/PrestataireDashboard";
import { PrestataireServices } from "./components/prestataire/PrestataireServices";
import { PrestataireBookings } from "./components/prestataire/PrestataireBookings";
import { PrestataireProfile } from "./components/prestataire/PrestataireProfile";
import { PrestataireSettings } from "./components/prestataire/PrestataireSettings";

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
      case "admin-subscriptions":
        return <AdminSubscriptions />;
      case "admin-payments":
        return <AdminPayments />;
      default:
        return <AdminDashboard />;
    }
  };

  // Rendu des pages prestataire
  const renderPrestatairePage = () => {
    switch (currentPage) {
      case "prestataire-dashboard":
        return <PrestataireDashboard />;
      case "prestataire-services":
        return <PrestataireServices />;
      case "prestataire-bookings":
        return <PrestataireBookings />;
      case "prestataire-profile":
        return <PrestataireProfile />;
      case "prestataire-settings":
        return <PrestataireSettings />;
      default:
        return <PrestataireDashboard />;
    }
  };

  const renderCurrentPage = () => {
    // Pages admin
    if (currentPage.startsWith("admin-")) {
      return renderAdminPage();
    }

    // Pages prestataire
    if (currentPage.startsWith("prestataire-")) {
      return renderPrestatairePage();
    }

    // Pages client
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      case "categories":
        return <ServiceCategoriesPage onNavigate={handleNavigate} />;
      case "service-providers":
        return <ServiceProvidersListPage onNavigate={handleNavigate} />;
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
      ) : currentPage.startsWith("prestataire-") ? (
        <>
          <PrestataireSidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
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
