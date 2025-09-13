"use client";
import React from "react";
import PageSkeleton from "@/components/loading/PageSkeleton";

export default function Loading() {
  return <PageSkeleton data-testid="loading-enterprise-table" />;
}
