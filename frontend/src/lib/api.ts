/**
 * Configuration API pour KaayJob
 * Point central pour les appels au backend
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

/**
 * headers par défaut pour les requêtes
 */
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Gestion des réponses API
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Une erreur est survenue");
  }

  return data;
};

/**
 * Methods HTTP
 */

export const api = {
  // GET request
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getHeaders(),
    });
    return handleResponse<T>(response);
  },

  // POST request
  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  // PUT request
  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse<T>(response);
  },
};

/**
 * Types de réponses API
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: "client" | "prestataire" | "admin";
    avatar?: string;
  };
  token: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "client" | "prestataire" | "admin";
  avatar?: string;
}

export interface Provider {
  id: string;
  userId: string;
  specialty?: string;
  bio?: string;
  hourlyRate?: number;
  yearsExperience?: number;
  location?: string;
  isAvailable: boolean;
  rating: number;
  totalReviews: number;
  totalBookings: number;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface Service {
  id: string;
  providerId: string;
  categoryId?: string;
  name: string;
  description?: string;
  price: number;
  priceType: "fixed" | "hourly" | "quote";
  duration?: number;
  isActive: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  serviceId?: string;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  status:
    | "pending"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "rejected";
  address: string;
  city: string;
  phone?: string;
  notes?: string;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "refunded";
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
}
