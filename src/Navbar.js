import { NavLink } from 'react-router-dom';
import ToggleColorMode from './toggleColorMode';
import { useTheme } from '@mui/material/styles';
import { Snackbar, AppBar, Toolbar, IconButton, Tooltip } from '@mui/material';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import './Navbar.css';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = (props) => {
  const theme = useTheme();
  const [rateTooltip, setRateTooltip] = useState('$');
  const [open, setOpen] = useState(false);
  const [changeWithSnackbar, setChangeWithSnackbar] = useState(false);

  function changeRateTooltip() {
    setRateTooltip(props.coin === 'שקל' ? 'שקל' : 'דולר');
  }

  const action = (
    <IconButton sx={{ bgcolor: theme.palette.primary.main, marginRight: 15 }} size="small" aria-label="close" color="inherit">
      <CloseIcon onClick={() => { setOpen(false) }} fontSize="small" />
    </IconButton>
  );

  function snackbar() {
    return (
      <Snackbar
        open={open && changeWithSnackbar}
        autoHideDuration={3000}
        message={`מטבע הוחלף ל${props.coin}`}
        action={action}
        onClose={() => setOpen(false)}
      />
    );
  }
  return (
    <AppBar position="sticky" sx={{ position: 'sticky', left: 0, right: 0, zIndex: 100, bgcolor: theme.palette.primary.main }}>
      <Toolbar>
        <IconButton
          component={NavLink}
          to="/donationList"
          size="small"
          color="inherit"
          sx={{
            mr: 2,
            width: 150,
            height: 50,
            borderRadius: 0,
            color: theme.palette.common.white,
            bgcolor: (theme) => (data) => (data.isActive ? theme.palette.primary.contrastText : 'transparent'),
          }}
        >תורמים</IconButton>

        <IconButton
          component={NavLink}
          to="/donate"
          size="small"
          color="inherit"
          sx={{
            mr: 2,
            width: 150,
            height: 50,
            borderRadius: 0,
            color: theme.palette.common.white,
            bgcolor: (theme) => (data) => (data.isActive ? theme.palette.primary.contrastText : 'transparent'),
          }}
        >תרמו עכשיו</IconButton>
        <ToggleColorMode />
        <Tooltip sx={{ width: 105 }} title={`החלף ל-${rateTooltip}`}>
          <IconButton
            sx={{ ml: 1, color: theme.palette.common.white }}
            onClick={() => {
              props.changeCoin();
              changeRateTooltip();
              setChangeWithSnackbar(true);
              setOpen(true);
            }}
            color="inherit">
            <CurrencyExchangeRoundedIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {snackbar()}
    </AppBar>
  );
};

export default Navbar;