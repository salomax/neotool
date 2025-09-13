"use client";

import "@/i18n/config";
import { useTranslation } from "react-i18next";
import { Button, Stack, Typography } from "@mui/material";

export default function SignInPage() {
  const { t } = useTranslation();
  const handleLogin = () => {
    // Fake auth cookie for the demo
    document.cookie = "auth=1; path=/; max-age=86400";
    window.location.href = "/";
  };

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Typography variant="h5">Sign in</Typography>
      <Button
        data-testid="sign-in-continue"
        variant="contained"
        onClick={handleLogin}
      >
        {t("signIn.continue")}
      </Button>
    </Stack>
  );
}
