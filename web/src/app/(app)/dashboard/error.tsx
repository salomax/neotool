"use client";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Something went wrong
      </Typography>
      <Stack spacing={2}>
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          {error?.message}
        </Typography>
        <Button variant="contained" onClick={reset}>
          Try again
        </Button>
      </Stack>
    </Box>
  );
}
