import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ColorModeContext = React.createContext({ ToggleColorMode: () => { } });

const ToggleColorMode = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        // width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // bgcolor: theme.palette.background.default,
        // color: theme.palette.text.primary,
        borderRadius: 1,
        p: 3,
      }}>
      <Tooltip title={`עבור למצב ${theme.palette.state}`} >
        <IconButton sx={{ ml: 1, color: theme.palette.common.white }} onClick={colorMode.ToggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
export default ToggleColorMode;
