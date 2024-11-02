import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useThemeContext } from './theme/ThemeContextProvider';
import { Typography, Box, ThemeProvider, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ActionAreaCard from './ActionAreaCard';
import { limitedSendJikanReq } from './api/useApi';

export default function TopAnimes() {
  const [topAnime, setTopAnime] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    limitedSendJikanReq({method: 'get' , url: `/top/anime?limit=10`})
      .then(function (res) {
        setTopAnime(res.data.data)
        setIsLoading(false)

      }).catch(function (error) {
        console.log(error);
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  const { theme } = useThemeContext();
  return (
    <>
      <ThemeProvider theme={theme}>
        {isLoading ?
          <CircularProgress color="secondary" />
          : <Grid container
            spacing={{ xs: 1, md: 3 }}
          >
            {topAnime.map(function (item, i) {
              const title = getFirst20Chars(item.title)
              return (
                <Grid spacing={12}  size={{ xs: 6,sm: 4, md: 3, lg:2, xl: 2, xxl: 2}} key={i}>
                  <Box>
                    <Box position={'relative'} >
                      <Box
                        position={'absolute'}
                        bottom={'0px'}
                        display={'flex'}
                        gap={'10px'}
                        flexDirection={'column-reverse'}
                        width={'2.5rem'}
                        height={'90%'}
                        overflow={'hidden'}
                        textOverflow={'ellipsis'}
                      >
                        <Typography
                          fontWeight={'bold'}
                          color={theme.palette.primary.main}
                          variant='h5'
                        >
                          {i + 1 < 10 ? "0" + (i + 1) : i + 1}
                        </Typography>
                        <Typography
                          fontWeight={'bold !important'}
                          whiteSpace={'nowrap'}
                          variant='h6'
                          sx={{
                            transform: 'rotate(270deg)',
                          }}>
                          {title}
                        </Typography>
                      </Box>
                      <Box sx={{
                        marginLeft: '2.5rem',
                        // height: '30vh',
                        // maxWidth: '50vh'
                      }}>
                        <ActionAreaCard
                          mal_id={item.mal_id}
                          title={item.title}
                          titleJapanese={item.title_japanese}
                          score={item.score}
                          rating={item.rating}
                          synopsis={item.synopsis}
                          genres={item.genres}
                          season={item.season}
                          year={item.year}
                          img={item.images.webp.large_image_url} />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        }
      </ThemeProvider>
    </>
  )
}

function getFirst20Chars(inputString) {
  if (inputString.length > 18) {
    return inputString.slice(0, 18) + "...";
  } else {
    return inputString;
  }
}