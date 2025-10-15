export interface Customer {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  priceCents: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerInput {
  name: string;
  email: string;
  status: string;
}

export interface ProductInput {
  name: string;
  sku: string;
  priceCents: number;
  stock: number;
}

export interface DashboardSummary {
  totalCustomers: number;
  totalProducts: number;
  activeCustomers: number;
  lowStockProducts: number;
  totalRevenue: number;
}

export interface DashboardTimeseries {
  date: string;
  customers: number;
  products: number;
  revenue: number;
}

// GraphQL Response Types
export interface CustomersResponse {
  customers: Customer[];
}

export interface CustomerResponse {
  customer: Customer;
}

export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}

export interface DashboardSummaryResponse {
  dashboardSummary: DashboardSummary;
}

export interface DashboardTimeseriesResponse {
  dashboardTimeseries: DashboardTimeseries[];
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}
