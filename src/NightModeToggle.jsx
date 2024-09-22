import React from 'react'
import { IconButton, Box } from '@mui/material';
import { useThemeContext } from './theme/ThemeContextProvider';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function NightModeToggle() {
  const { mode, toggleColorMode } = useThemeContext();
  return (
    <Box
    sx={{
      bgcolor: "background.default",
      color: "text.primary",
      borderColor: "text.primary",
      position: "fixed",
      top: 10,
      right: 10,
      zIndex: 1200,
    }} >

      {mode} mode
     <IconButton 
     onClick={toggleColorMode}
     aria-label="Toggle dark mode"
     color='inherit'
     >
        {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}

     </IconButton>
    </Box>
  )
}
