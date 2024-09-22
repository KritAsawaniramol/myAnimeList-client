import React, { useEffect, useState } from 'react'
import AppAppBar from './AppAppBar'
import { Container, CssBaseline, IconButton, Box, Typography } from '@mui/material';

import { useThemeContext } from './theme/ThemeContextProvider';
import NightModeToggle from './NightModeToggle';
import CarouselImage from './CarouselImage';
import TopAnimes from './TopAnimes';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material'

function App() {
  const { theme } = useThemeContext();
  useEffect(() => {
  
  }, [])

  return (

    <>
      <ThemeProvider theme={theme}>

        <CssBaseline />

        <AppAppBar />
        <NightModeToggle />
        <Container maxWidth={'xl'} >

          <Box sx={{
            marginTop: 0,
            paddingTop: 0
          }}>

            <CarouselImage />
          </Box>

          <Box marginTop={'10px'}>
            <Typography variant='h3' mb={2}>
              Top Anime Series
            </Typography>
            <TopAnimes />
          </Box>

        </Container>

        <Footer />
      </ThemeProvider>

    </>

  )
}

export default App