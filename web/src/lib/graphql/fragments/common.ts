import { gql } from '@apollo/client';

// Common field fragments for reusability
export const CUSTOMER_FIELDS = gql`
  fragment CustomerFields on Customer {
    id
    name
    email
    status
    createdAt
    updatedAt
  }
`;

export const PRODUCT_FIELDS = gql`
  fragment ProductFields on Product {
    id
    name
    sku
    priceCents
    stock
    createdAt
    updatedAt
  }
`;

export const DASHBOARD_SUMMARY_FIELDS = gql`
  fragment DashboardSummaryFields on DashboardSummary {
    totalCustomers
    totalProducts
    activeCustomers
    lowStockProducts
    totalRevenue
  }
`;

export const DASHBOARD_TIMESERIES_FIELDS = gql`
  fragment DashboardTimeseriesFields on DashboardTimeseries {
    date
    customers
    products
    revenue
  }
`;
