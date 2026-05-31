'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FormControl, Typography, Select, MenuItem } from '@mui/material';
import { i18n } from 'i18n-config';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname?.split('/')[1] || i18n.defaultLocale;

  const redirectedPathname = (locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const handleChange = (event) => {
    const newLocale = event.target.value;
    router.push(redirectedPathname(newLocale));
  };

  return (
    <FormControl fullWidth size="large" variant="outlined">
      <Typography variant="overline" color="inherit" gutterBottom>
        Language
      </Typography>

      <Select
        value={currentLocale}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: 300 },
          },
        }}
      >
        {i18n.locales.map((locale) => (
          <MenuItem key={locale} value={locale}>
            {locale === 'en'
              ? 'English'
              : locale === 'fr'
                ? 'French'
                : locale === 'es'
                  ? 'Spanish'
                  : locale}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
