// web/.storybook/preview.tsx
import type { Preview } from '@storybook/react';
import React from 'react';
import { AppThemeProvider } from '../src/theme/AppThemeProvider';
import { tokens } from '../src/theme/tokens';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n/storybook'; // Storybook-only i18n init

const withProviders = (Story, context) => {
  const themeMode = context.globals.theme as 'light' | 'dark';
  const locale = context.globals.locale as 'pt-BR' | 'en-US';
  i18n.changeLanguage(locale);

  return (
    <AppThemeProvider defaultMode={themeMode}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </AppThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'App Background',
      values: [
        { name: 'App Background', value: tokens.light.palette.bg },
        { name: 'Paper', value: tokens.light.palette.bgPaper },
        { name: 'Dark', value: tokens.dark.palette.bg },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en-US',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en-US', title: 'English (US)' },
          { value: 'pt-BR', title: 'Português (Brasil)' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
