// Import MUI theme hook for accessing theme properties
import { useTheme } from "@mui/material";

// Import styled component for custom styling
import RootStyled from "./styled";

// Import PropTypes for type-checking component props
import PropTypes from "prop-types";

MenuPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  sx: PropTypes.object,
  isDesktop: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

// ----------------------------------------------------------------------
export default function MenuPopover({ ...props }) {
  const theme = useTheme();
  const { children, open, sx, isDesktop, ...other } = props;
  return (
    <RootStyled
      anchorOrigin={{
        vertical: "bottom",
        horizontal: isDesktop ? "center" : "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: isDesktop ? "center" : "right",
      }}
      open={open}
      {...other}
      PaperProps={{
        className: isDesktop && "is-desktop",
        sx: {
          ...sx,
          border: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {children}
    </RootStyled>
  );
}
