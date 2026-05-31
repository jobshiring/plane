import * as React from 'react'; // Importing React for component creation

// Next.js navigation hooks for handling routing and URL parameters
import { usePathname, useSearchParams } from 'next/navigation'; // Get current path and search params
import { useRouter } from '@bprogress/next'; // Router for navigation with progress bar support

// Importing Material-UI components for UI elements
import {
  Box, // Box component for layout and spacing
  Skeleton, // Skeleton loader for displaying placeholders while loading
  Stack, // Stack component for flexbox-based layout
  Typography, // Typography component for text display
  Radio, // Radio button for single selection
  RadioGroup, // Grouping radio buttons together
  FormControl, // Wrapper for form elements
  FormControlLabel, // Label for radio buttons
} from '@mui/material';

export default function Stops(props) {
  const { isLoading } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const stop = searchParams.get('stop');

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

  const handleChange = (e) => {
    const queryString = createQueryString('stop', e.target.value);

    if (e.target.value !== '') {
      router.push(`${pathname}?${queryString}`);
    } else {
      router.push(`${pathname}?${deleteQueryString('stop')}`);
    }
  };

  return (
    <Box>
      <FormControl>
        <Typography
          variant='subtitle1'
          color='text.primary'
          pb={1}>
          {isLoading ? (
            <Skeleton
              variant='text'
              width={120}
            />
          ) : (
            ' Flight stops'
          )}
        </Typography>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          onChange={handleChange}
          value={stop || ''}>
          {[
            { value: '', label: 'All Stops' },
            { value: '0', label: 'Direct' },
            { value: '1', label: '1 Stop' },
            { value: '2', label: '2 Stops' },
          ].map(({ value, label }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={
                isLoading ? (
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                    sx={{ height: 42, width: 42 }}>
                    <Skeleton
                      variant='circular'
                      width={24}
                      height={24}
                    />
                  </Stack>
                ) : (
                  <Radio />
                )
              }
              label={
                isLoading ? (
                  <Skeleton
                    variant='text'
                    width={80}
                  />
                ) : (
                  label
                )
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
