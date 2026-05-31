// Import useState hook for managing component state
import { useState } from 'react';

// Import PropTypes for type checking and ensuring correct prop usage
import PropTypes from 'prop-types';

// Material-UI imports for layout components
import { Box } from '@mui/material'; // Provides a flexible container for layout

// Next.js Image component for optimized image rendering
import Image from 'next/image';

export default function BlurImageAvatar({ ...props }) {
  const [isLoading, setLoading] = useState(true);
  const { layout, objectFit, ...imageProps } = props;

  return (
    <Box
      sx={{
        position: 'relative',
        height: 40,
        width: 40,
        borderRadius: '50px',
      }}>
      <Image
        {...imageProps}
        src={props.src}
        alt={props.alt}
        fill
        sizes="40px"
        style={{
          borderRadius: '50px',
          objectFit: objectFit || 'cover',
          ...(isLoading
            ? {
                filter: 'blur(15px)',
              }
            : {
                filter: 'blur(0px)',
              }),
        }}
        onLoad={() => setLoading(false)}
        priority
      />
    </Box>
  );
}
BlurImageAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
