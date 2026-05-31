import MenuList from '@mui/material/MenuList'; // MUI component for rendering a list of menu items
import { styled } from '@mui/material/styles'; // Utility for custom styling with MUI's theme

const RootStyled = styled(MenuList)(({ theme }) => ({
  borderRadius: 8,
  '& .menu-item': {
    marginTop: theme.spacing(1),
  },
  '& .menu-icon': {
    marginRight: 0,
  },
}));
export default RootStyled;
