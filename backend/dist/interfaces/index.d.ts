/**
 * Interfaces du projet KaayJob
 * Application des principes SOLID - Définition des contrats
 */
export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: UserRole;
    avatar?: string;
    isActive: boolean;
    createdAt: Date;
}
export type UserRole = "client" | "prestataire" | "admin";
export interface IProviderProfile {
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
}
export interface IService {
    id: string;
    providerId: string;
    categoryId?: string;
    name: string;
    description?: string;
    price: number;
    priceType: PriceType;
    duration?: number;
    isActive: boolean;
}
export type PriceType = "fixed" | "hourly" | "quote";
export interface IBooking {
    id: string;
    clientId: string;
    providerId: string;
    serviceId?: string;
    bookingDate: Date;
    bookingTime: string;
    duration: number;
    status: BookingStatus;
    address: string;
    city: string;
    phone?: string;
    notes?: string;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    createdAt: Date;
}
export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "rejected";
export type PaymentStatus = "pending" | "paid" | "refunded";
export interface IReview {
    id: string;
    bookingId: string;
    clientId: string;
    providerId: string;
    rating: number;
    comment?: string;
    isVerified: boolean;
    createdAt: Date;
}
export interface ICategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    image?: string;
    isActive: boolean;
    displayOrder: number;
}
export interface RegisterDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: UserRole;
}
export type RegisterInput = RegisterDTO;
export interface LoginDTO {
    email: string;
    password: string;
}
export type LoginInput = LoginDTO;
export interface CreateBookingDTO {
    providerId: string;
    serviceId?: string;
    bookingDate: string;
    bookingTime: string;
    duration?: number;
    address: string;
    city: string;
    phone: string;
    notes?: string;
}
export type CreateBookingInput = CreateBookingDTO;
export interface CreateServiceDTO {
    name: string;
    description?: string;
    price: number;
    priceType?: PriceType;
    duration?: number;
    categoryId?: string;
}
export type CreateServiceInput = CreateServiceDTO;
export interface UpdateServiceDTO {
    name?: string;
    description?: string;
    price?: number;
    priceType?: PriceType;
    duration?: number;
    categoryId?: string;
    isActive?: boolean;
}
export type UpdateServiceInput = UpdateServiceDTO;
export interface CreateReviewDTO {
    bookingId: string;
    rating: number;
    comment?: string;
}
export type CreateReviewInput = CreateReviewDTO;
export interface UpdateUserDTO {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
}
export type UpdateUserInput = UpdateUserDTO;
export interface UpdateProviderProfileDTO {
    specialty?: string;
    bio?: string;
    hourlyRate?: number;
    yearsExperience?: number;
    location?: string;
    isAvailable?: boolean;
}
export type UpdateProviderProfileInput = UpdateProviderProfileDTO;
export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: ValidationError[];
}
export interface PaginationParams {
    limit: number;
    offset: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        limit: number;
        offset: number;
        total?: number;
    };
}
export interface ValidationError {
    field: string;
    message: string;
}
export interface IUserService {
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    create(data: RegisterDTO): Promise<IUser>;
    update(id: string, data: UpdateUserDTO): Promise<IUser>;
}
export interface IAuthService {
    register(data: RegisterDTO): Promise<AuthResult>;
    login(data: LoginDTO): Promise<AuthResult>;
    verifyToken(token: string): Promise<IUser | null>;
}
export interface AuthResult {
    user: IUser;
    token: string;
}
export interface IBookingService {
    create(userId: string, data: CreateBookingDTO): Promise<IBooking>;
    findByClient(clientId: string, pagination: PaginationParams): Promise<PaginatedResponse<IBooking>>;
    findByProvider(providerId: string, pagination: PaginationParams): Promise<PaginatedResponse<IBooking>>;
    findById(id: string): Promise<IBooking | null>;
    updateStatus(id: string, status: BookingStatus): Promise<IBooking>;
}
export interface IProviderService {
    findAll(filters: ProviderFilters, pagination: PaginationParams): Promise<PaginatedResponse<IProviderProfile>>;
    findById(id: string): Promise<IProviderProfile | null>;
    updateProfile(userId: string, data: UpdateProviderProfileDTO): Promise<IProviderProfile>;
}
export interface ProviderFilters {
    category?: string;
    location?: string;
    minRating?: number;
    search?: string;
}
//# sourceMappingURL=index.d.ts.map