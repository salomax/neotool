import { gql } from '@apollo/client';
import { DASHBOARD_SUMMARY_FIELDS, DASHBOARD_TIMESERIES_FIELDS } from '../../fragments/common';

// Dashboard Queries
export const GET_DASHBOARD_SUMMARY = gql`
  ${DASHBOARD_SUMMARY_FIELDS}
  query GetDashboardSummary {
    dashboardSummary {
      ...DashboardSummaryFields
    }
  }
`;

export const GET_DASHBOARD_TIMESERIES = gql`
  ${DASHBOARD_TIMESERIES_FIELDS}
  query GetDashboardTimeseries($days: Int!) {
    dashboardTimeseries(days: $days) {
      ...DashboardTimeseriesFields
    }
  }
`;
