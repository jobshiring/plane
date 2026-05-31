import { Box, Divider } from '@mui/material';
import { FaPlane } from 'react-icons/fa6';

export default function DividerWithUltraSlowIcon() {
  return (
    <Box sx={{ position: 'relative', width: 'calc(100%)', py: 4 }}>
      {/* Divider track */}
      <Divider sx={{ borderColor: 'grey.300' }} />

      {/* Progress line */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: 2,
          transform: 'translateY(-50%)',
          overflow: 'hidden',
        }}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            bgcolor: 'primary.light',
            transformOrigin: 'left',
            animation:
              'line-progress 15s cubic-bezier(0.7, 0.5, 0.7, 0.7) infinite',
          }}
        />
      </Box>

      {/* Moving icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translate(-30%, -30%)',
          color: 'primary.main',
          willChange: 'transform, left',
          animation:
            'icon-smooth-move 15s cubic-bezier(0.7, 0.5, 0.7, 0.7) infinite',

          '@keyframes icon-smooth-move': {
            '0%': {
              left: '0%',
              transform: 'translate(-30%, -30%) translateY(-2px)',
            },
            '50%': {
              transform: 'translate(-30%, -30%) translateY(-2px)',
            },
            '100%': {
              left: '100%',
              transform: 'translate(-30%, -30%) translateY(-2px)',
            },
          },

          '@keyframes line-progress': {
            '0%': {
              transform: 'scaleX(0)',
            },
            '100%': {
              transform: 'scaleX(1)',
            },
          },
        }}>
        <FaPlane size={20} />
      </Box>
    </Box>
  );
}
