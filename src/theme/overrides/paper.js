export default function Paper(theme) {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.spacing(1),
        },
      },
    },
  };
}
