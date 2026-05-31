import * as React from 'react'; // Importing React library

// MUI components for styling and UI elements
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// Importing icons for UI interaction
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'; // Plus & minus icons for increment/decrement
import { FaAngleDown } from 'react-icons/fa6'; // Downward arrow icon
import { IoPeopleOutline } from 'react-icons/io5'; // People outline icon

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 250,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus({ ...props }) {
  const { setTravelers, travelers } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [adults, setAdults] = React.useState(1);
  const [childrens, setChildrens] = React.useState(0);
  const [infants, setInfants] = React.useState(0);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdultChange = (increment) => {
    setAdults((prev) => {
      const newCount = increment ? prev + 1 : prev - 1;
      return newCount < 1 ? 1 : newCount > 9 ? 9 : newCount;
    });
  };

  const handleChildChange = (increment) => {
    setChildrens((prev) => {
      const newCount = increment ? prev + 1 : prev - 1;
      const total = adults + newCount;
      return newCount < 0 ? 0 : total > 9 ? 9 - adults : newCount;
    });
  };
  let maxInfants = 1;

  if (adults === 1) {
    maxInfants = 1;
  } else if (adults === 2) {
    maxInfants = 2;
  } else if (adults === 3) {
    maxInfants = 3;
  } else if (adults >= 4) {
    maxInfants = 4;
  }
  const handleInfantChange = (increment) => {
    setInfants((prev) => {
      const newCount = increment ? prev + 1 : prev - 1;

      if (newCount < 0) {
        return 0;
      } else if (newCount > maxInfants) {
        return maxInfants;
      } else {
        return newCount;
      }
    });
  };
  React.useEffect(() => {
    setTravelers({
      infants,
      childrens,
      adults,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infants, childrens, adults]);

  React.useEffect(() => {
    setAdults(travelers.adults);
    setChildrens(travelers.childrens);
    setInfants(travelers.infants);
    setTravelers({
      ...travelers,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        color="inherit"
        onClick={handleClick}
        fullWidth
        endIcon={<FaAngleDown />}
        sx={{
          justifyContent: 'space-between',
          bgcolor: 'transparent',
          minHeight: 56,
          fontSize: 14,
          fontWeight: 500,
          svg: {
            color: 'text.secondary',
          },
          '& .MuiButton-endIcon': {
            svg: {
              fontSize: 16,
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            },
          },
          border: (theme) => '1px solid ' + theme.palette.divider,
          ...(open && {
            border: (theme) => '1px solid ' + theme.palette.primary.main,
            outline: (theme) => '1px solid ' + theme.palette.primary.main,
          }),
          '&:hover': {
            bgcolor: 'transparent',
            border: (theme) => '1px solid ' + theme.palette.text.primary,
          },
          textTransform: 'capitalize',
        }}
      >
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          component={Typography}
          color="text.primary"
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          <IoPeopleOutline fontSize={20} />
          Travelers: {adults + childrens + infants}
        </Stack>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Stack gap={2} p={2}>
          <Stack
            direction="row"
            gap={1}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <div>
              <Typography variant="subtitle1" color="text.primary">
                Adults
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +12 Years
              </Typography>
            </div>
            <Stack direction="row" alignItems={'center'}>
              <IconButton
                aria-label="dec"
                onClick={() => handleAdultChange(false)}
                disabled={adults <= 1}
              >
                <CiCircleMinus />
              </IconButton>
              <Typography
                variant="subtitle2"
                color="text.primary"
                width={14}
                textAlign={'center'}
              >
                {adults}
              </Typography>
              <IconButton
                aria-label="inc"
                onClick={() => handleAdultChange(true)}
                disabled={childrens + adults >= 9}
              >
                <CiCirclePlus />
              </IconButton>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap={1}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <div>
              <Typography variant="subtitle1" color="text.primary">
                Children
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2 to 11 Years
              </Typography>
            </div>
            <Stack direction="row" alignItems={'center'}>
              <IconButton
                aria-label="dec"
                onClick={() => handleChildChange(false)}
                disabled={childrens <= 0}
              >
                <CiCircleMinus />
              </IconButton>
              <Typography
                variant="subtitle2"
                color="text.primary"
                width={14}
                textAlign={'center'}
              >
                {childrens}
              </Typography>
              <IconButton
                aria-label="inc"
                onClick={() => handleChildChange(true)}
                disabled={adults + childrens >= 9}
              >
                <CiCirclePlus />
              </IconButton>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            gap={1}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <div>
              <Typography variant="subtitle1" color="text.primary">
                Infants
              </Typography>
              <Typography variant="body2" color="text.secondary">
                -2 years
              </Typography>
            </div>
            <Stack direction="row" alignItems={'center'}>
              <IconButton
                aria-label="dec"
                onClick={() => handleInfantChange(false)}
                disabled={infants <= 0}
              >
                <CiCircleMinus />
              </IconButton>
              <Typography
                variant="subtitle2"
                color="text.primary"
                width={14}
                textAlign={'center'}
              >
                {infants}
              </Typography>
              <IconButton
                color="primary"
                aria-label="inc"
                onClick={() => handleInfantChange(true)}
                disabled={infants >= maxInfants}
              >
                <CiCirclePlus />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </StyledMenu>
    </div>
  );
}
