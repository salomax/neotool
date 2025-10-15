import { gql } from '@apollo/client';

// Customer Queries
export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
      id
      name
      email
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer($id: ID!) {
    customer(id: $id) {
      id
      name
      email
      status
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
      id
      name
      email
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: ID!, $input: CustomerInput!) {
    updateCustomer(id: $id, input: $input) {
      id
      name
      email
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id)
  }
`;

// Product Queries
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      sku
      priceCents
      stock
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      sku
      priceCents
      stock
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      sku
      priceCents
      stock
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      sku
      priceCents
      stock
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// Dashboard Queries (these would need to be added to the supergraph schema)
export const GET_DASHBOARD_SUMMARY = gql`
  query GetDashboardSummary {
    dashboardSummary {
      totalCustomers
      totalProducts
      activeCustomers
      lowStockProducts
      totalRevenue
    }
  }
`;

export const GET_DASHBOARD_TIMESERIES = gql`
  query GetDashboardTimeseries($days: Int!) {
    dashboardTimeseries(days: $days) {
      date
      customers
      products
      revenue
    }
  }
`;
