import React, { useEffect } from 'react';
import { useSelector, useDispatch, darkMode, settingSlice } from '@/redux';

// MUI
import { Stack, Tooltip, Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Icons
import { IoSunny, IoMoonOutline } from 'react-icons/io5';
import { MdLaptopMac } from 'react-icons/md';
import { capitalize } from 'lodash';

export default function ThemeMode() {
  const dispatch = useDispatch();
  const isDark = useSelector(darkMode); // OLD boolean

  // Determine current mode for ToggleButtonGroup
  const [currentMode, setCurrentMode] = React.useState(
    isDark ? 'dark' : 'light'
  );

  // Update currentMode whenever darkMode changes
  useEffect(() => {
    setCurrentMode(isDark ? 'dark' : 'light');
  }, [isDark]);

  const modes = [
    { value: 'light', name: 'Light', icon: <IoSunny /> },
    { value: 'dark', name: 'Dark', icon: <IoMoonOutline /> },
    { value: 'system', name: 'System', icon: <MdLaptopMac /> },
  ];

  const handleChange = (event, mode) => {
    if (!mode) return;

    if (mode === 'light' && isDark) {
      dispatch(settingSlice.actions.changeMode());
    }
    if (mode === 'dark' && !isDark) {
      dispatch(settingSlice.actions.changeMode());
    }
    if (mode === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      if (prefersDark !== isDark) {
        dispatch(settingSlice.actions.changeMode());
      }
    }

    setCurrentMode(mode); // Update UI immediately
  };

  return (
    <div>
      <Typography variant="overline" gutterBottom>
        Theme Mode
      </Typography>

      <Stack direction="row" gap={1}>
        <ToggleButtonGroup
          value={currentMode}
          exclusive
          size="large"
          fullWidth
          onChange={handleChange}
          sx={{ height: 56, svg: { fontSize: 30 } }}
        >
          {modes.map(({ value, icon, name }) => (
            <Tooltip key={value} title={`${capitalize(name)} Mode`}>
              <ToggleButton value={value} color="primary" aria-label={name}>
                {icon}
              </ToggleButton>
            </Tooltip>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
}
