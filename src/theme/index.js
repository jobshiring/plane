'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

// mui
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import * as locales from '@mui/material/locale';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// redux
import { useSelector, darkMode } from '@/redux';

// stylis
import rtlPlugin from 'stylis-plugin-rtl';

// custom theme
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shape from './shape';
import shadows, { customShadows } from './shadows';

// override components
import componentsOverride from './overrides';
import Settings from '@/components/settings';

ThemeRegistry.propTypes = {
  children: PropTypes.node.isRequired,
  lang: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
};

const Localization = (lang) => {
  switch (lang) {
    case 'ar':
      return 'arEG';
    case 'fr':
      return 'frFR';
    case 'en':
      return 'enUS';
    default:
      return 'frFR';
  }
};

export default function ThemeRegistry({ children, lang, fontFamily }) {
  const isDarkMode = useSelector(darkMode);

  const locale = Localization(lang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const customTheme = () =>
    createTheme(
      {
        palette: isDarkMode ? palette.dark : palette.light,
        direction: dir,
        typography: { fontFamily, ...typography },
        shadows: isDarkMode ? shadows.dark : shadows.light,
        customShadows: isDarkMode ? customShadows.light : customShadows.dark,
        shape,
        breakpoints,
      },
      locales[locale]
    );

  const theme = customTheme();

  return (
    <AppRouterCacheProvider
      options={{
        key: dir === 'rtl' ? 'muirtl' : 'css',
        stylisPlugins: dir === 'rtl' ? [rtlPlugin] : [],
      }}
    >
      <ThemeProvider
        theme={{
          ...theme,
          components: componentsOverride(theme),
        }}
      >
        <CssBaseline />
        {children}
        <Settings direction={dir} />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
