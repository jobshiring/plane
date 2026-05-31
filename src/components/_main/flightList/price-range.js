import * as React from 'react';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { Box, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next';

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

function valuetext(value) {
  return `$${value.toFixed()}`;
}

export default function PriceRange(props) {
  const { priceRange, isLoading } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [loading, setLoading] = React.useState(true);

  const createQueryString = React.useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const onChange = (e, v) => {
    const queryString = createQueryString('price', v.join('_'));
    router.push(`${pathname}?${queryString}`);
  };

  React.useEffect(() => {
    setLoading(true);
    if (!isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [priceRange, isLoading]);

  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`; // change $ to PKR / AED / etc.
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="text.primary" pb={3}>
        {loading ? <Skeleton width={120} variant="text" /> : 'Price Range'}
      </Typography>

      {loading ? (
        <Box>
          <Skeleton variant="rounded" height={40} />
        </Box>
      ) : (
        <Box sx={{ px: 1 }}>
          <AirbnbSlider
            valueLabelDisplay="on"
            valueLabelFormat={formatCurrency}
            slots={{ thumb: AirbnbThumbComponent }}
            min={Math.round(Number(priceRange[0]))}
            max={Math.round(Number(priceRange[1]))}
            defaultValue={[
              Math.round(Number(priceRange[0])),
              Math.round(Number(priceRange[1])),
            ]}
            getAriaValueText={valuetext}
            onChangeCommitted={onChange}
            sx={{
              '& .MuiSlider-valueLabelOpen': {
                p: '2px 4px',
                fontSize: 10,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
