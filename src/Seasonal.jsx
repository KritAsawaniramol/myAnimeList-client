import React, { useEffect, useState } from 'react'
import AppAppBar from './AppAppBar'
import NightModeToggle from './NightModeToggle';
import ScheduleCard from './ScheduleCard';
import {
  CssBaseline,
  Box,
  Container,
  Typography,
} from '@mui/material';
import { useThemeContext } from './theme/ThemeContextProvider';
import { ThemeProvider } from '@mui/material'
import Footer from './Footer';
import Pagination from '@mui/material/Pagination';

export default function Seasonal() {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date();
  const [schedule, setSchedule] = useState(initSchedule())
  const { theme } = useThemeContext();


  function initSchedule() {
    const s = []
    let day = d.getDay();
    for (let i = 0; i < 6; i++) {
      s.push(
        weekday[day],
      )
      day += 1
      if (day > 6) {
        day = 0
      }
    }
    return s
}




  return (
    <>
      <ThemeProvider theme={theme}>

        <CssBaseline />
        <AppAppBar />
        <NightModeToggle />
        <Box marginTop={'120px'}>
          <Container maxWidth={'100%'} >
            {schedule.map((item, i) =>
              <Box key={i} mb={2}>
                <Typography fontWeight={'bold'} variant='h2'>{item}</Typography>
                <ScheduleCard day={item} />
              </Box>
            )
            }
            
            
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>

    </>



  )
}
