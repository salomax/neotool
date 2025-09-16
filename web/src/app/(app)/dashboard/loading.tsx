import React from 'react';
import PageSkeleton from '@/components/loading/PageSkeleton';

export default function DashboardLoading() {
  return <PageSkeleton data-testid="loading-dashboard" />;
}
