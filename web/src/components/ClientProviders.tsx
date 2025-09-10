// web/src/components/ClientProviders.tsx
'use client';

// Wrap all client-side providers here (Theme, i18n, Sentry if needed).
// Keep comments in EN per user's preference.

import React from 'react';
import { AppThemeProvider } from '../theme/AppThemeProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  // TODO: If you have an existing i18n provider, mount it here.
  // Example:
  // return (
  //   <AppThemeProvider>
  //     <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  //   </AppThemeProvider>
  // );

  return <AppThemeProvider>{children}</AppThemeProvider>;
}
