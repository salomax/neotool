import React from "react";
import type { Preview } from "@storybook/react";
import type { StoryContext } from "@storybook/react";
import { AppThemeProvider } from "../src/styles/themes/AppThemeProvider";
import { tokens } from "../src/styles/themes/tokens";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/shared/i18n/storybook";
import { AppQueryProvider } from "../src/lib/api/AppQueryProvider";

const withProviders = (Story: React.ComponentType, context: StoryContext) => {
  const themeMode = context.globals.theme as "light" | "dark";
  const locale = context.globals.locale as "pt-BR" | "en-US";
  i18n.changeLanguage(locale);

  return (
    <AppThemeProvider defaultMode={themeMode}>
      <AppQueryProvider>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </AppQueryProvider>
    </AppThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: "App Background",
      values: [
        { name: "App Background", value: tokens.light.palette.bg },
        { name: "Paper", value: tokens.light.palette.bgPaper },
        { name: "Dark", value: tokens.dark.palette.bg },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      defaultValue: "en-US",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en-US", title: "English (US)" },
          { value: "pt-BR", title: "Português (Brasil)" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
