"use client";
import { useEffect } from "react";

export default function MSWProvider() {
  useEffect(() => {
    (async () => {
      const { enableMocking } = await import("@/mocks");
      await enableMocking();
    })();
  }, []);
  return null;
}
