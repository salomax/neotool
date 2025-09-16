import React from 'react';
import PageSkeleton from '@/atoms/PageSkeleton';

export default function DashboardLoading() {
  return <PageSkeleton data-testid="loading-dashboard" />;
}
