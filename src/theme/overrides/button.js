export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          variants: [
            {
              props: { size: 'small' },
              style: {
                fontSize: 14,
                minHeight: 40,
                fontWeight: 600,
              },
            },
            {
              props: { size: 'medium' },
              style: {
                fontSize: 16,
                minHeight: 48,
                fontWeight: 600,
              },
            },
            {
              props: { size: 'large' },
              style: { fontSize: 16, minHeight: 56, fontWeight: 600 },
            },
            {
              props: { variant: 'text' },
              style: {},
            },
            {
              props: { variant: 'outlined' },
              style: {},
            },
            {
              props: { variant: 'contained', color: 'primary' },
              style: {
                boxShadow: theme.customShadows.primary,
              },
            },
            {
              props: { variant: 'contained', color: 'secondary' },
              style: {
                boxShadow: theme.customShadows.secondary,
              },
            },
            {
              props: { variant: 'contained', color: 'info' },
              style: {
                boxShadow: theme.customShadows.info,
              },
            },
            {
              props: { variant: 'contained', color: 'warning' },
              style: {
                boxShadow: theme.customShadows.warning,
              },
            },
            {
              props: { variant: 'contained', color: 'error' },
              style: {
                boxShadow: theme.customShadows.error,
              },
            },
            {
              props: { variant: 'contained', color: 'success' },
              style: {
                boxShadow: theme.customShadows.success,
              },
            },
          ],
        },
      },
    },
  };
}
