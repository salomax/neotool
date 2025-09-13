"use client";
import { Box, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" width={240} height={36} />
      <Skeleton variant="rectangular" height={180} sx={{ mt: 2 }} />
      <Skeleton variant="rectangular" height={320} sx={{ mt: 2 }} />
    </Box>
  );
}
