// Material-UI Components
import List from '@mui/material/List'; // List container for displaying items

// Material-UI Styling Utilities
import { styled, alpha } from '@mui/material/styles';
// styled: Used for creating custom-styled components
// alpha: Utility for adding transparency to colors

const RootStyled = styled(List)(({ theme }) => ({
  height: 'calc(100vh - 150px)',
  overflow: 'auto',
  '& .MuiListItem-root': {
    '&.active': {
      background: alpha(
        theme.palette.primary.main,
        theme.palette.mode === 'light' ? 0.03 : 0.1
      ),
      position: 'relative',
    },
    span: { fontWeight: 500 },
    '& .icon': {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: 18,
      right: 12,
    },
  },
}));
export default RootStyled;
