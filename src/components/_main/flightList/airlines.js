import * as React from 'react'; // Importing React for component creation

// Next.js hooks for handling navigation and search parameters
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next'; // Importing useRouter with progress bar support

// Material-UI components for UI elements
import Checkbox from '@mui/material/Checkbox'; // Checkbox component for user selections
import Stack from '@mui/material/Stack'; // Stack component for layout management
import FormGroup from '@mui/material/FormGroup'; // FormGroup for grouping related form elements
import FormControlLabel from '@mui/material/FormControlLabel'; // Label for checkboxes and radio buttons
import FormControl from '@mui/material/FormControl'; // Wrapper for form components
import { Box, Typography, Skeleton } from '@mui/material'; // Common UI components from Material-UI

import Image from 'next/image'; // Next.js optimized image component for better performance

export default function Airlines({ ...props }) {
  const { airlines, isLoading } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [state, setstate] = React.useState([]);
  const createQueryString = React.useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const deleteQueryString = React.useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );
  return (
    <Box>
      <FormControl>
        <Typography variant="subtitle1" color="text.primary" pb={1}>
          {isLoading ? <Skeleton width={120} /> : 'Airlines'}
        </Typography>

        <Box>
          {isLoading ? (
            <Box>
              <Stack>
                {[...Array(10)].map((_, index) => (
                  <Stack
                    key={`airline-skeleton-${index}`}
                    direction="row"
                    alignItems={'center'}
                    sx={{
                      height: 42,
                      gap: 2,
                    }}
                  >
                    <Skeleton variant="circular" width={24} height={24} />

                    <Skeleton variant="text" width={100} height={18.55} />
                  </Stack>
                ))}
              </Stack>
            </Box>
          ) : (
            <FormGroup
              onChange={(e) => {
                if (state.filter((v) => v === e.target.value).length) {
                  const filtered = state.filter((v) => v !== e.target.value);
                  setstate(filtered);
                  if (filtered.length) {
                    const queryString = createQueryString(
                      'airlines',
                      filtered.join('_')
                    );
                    router.push(`${pathname}?${queryString}`);
                  } else {
                    const queryString = deleteQueryString('airlines');
                    router.push(`${pathname}?${queryString}`);
                  }
                } else {
                  setstate([...state, e.target.value]);
                  const queryString = createQueryString(
                    'airlines',
                    [...state, e.target.value].join('_')
                  );
                  router.push(`${pathname}?${queryString}`);
                }
              }}
              aria-labelledby="demo-radio-buttons-group-label"
            >
              {airlines.map((airline) => (
                <FormControlLabel
                  key={airline.airline}
                  value={airline.airline}
                  control={
                    <Checkbox
                      checked={
                        state.filter((v) => v === airline.airline).length
                      }
                    />
                  }
                  label={
                    <Stack direction="row" gap={1} alignItems="center">
                      <Image
                        alt={airline.airline}
                        src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${airline.img}.svg`}
                        width={28}
                        height={28}
                        priority
                      />
                      <Typography variant="body2" color="text.primary" noWrap>
                        {airline.airline}
                      </Typography>
                    </Stack>
                  }
                />
              ))}
            </FormGroup>
          )}
        </Box>
      </FormControl>
    </Box>
  );
}
