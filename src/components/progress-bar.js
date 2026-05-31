// Import the Next.js progress bar component for showing a loading indicator during navigation
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// Import Material-UI hook for accessing the current theme (colors, spacing, typography, etc.)
import { useTheme } from "@mui/material/styles";

const Providers = () => {
  const { palette } = useTheme(); // Destructure for cleaner code

  return (
    <ProgressBar
      height="3px"
      color={palette.primary.main}
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default Providers;
