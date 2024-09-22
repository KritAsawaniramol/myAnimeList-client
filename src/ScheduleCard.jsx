import React, { useEffect, useState } from 'react'
import { ThemeProvider, Card, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import ActionAreaCard from './ActionAreaCard';
import Grid from '@mui/material/Grid2';
import { alpha } from '@mui/material/styles';
import { useThemeContext } from './theme/ThemeContextProvider';
import StarIcon from '@mui/icons-material/Star';
import { limitedSendJikanReq } from './api/useApi';

export default function ScheduleCard(props) {
    const { day } = props
    const [anime, setAnime] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { theme } = useThemeContext();

    const fetchData = async (page) => {
        limitedSendJikanReq({method: 'get' , url: `/schedules?filter=${day}&page=${page}`})
            .then(function (res) {
                console.log(res.data);
                res.data.data.sort(function (a, b) {
                    if (a.broadcast.time == null) {
                        return 1
                    } else if (a.broadcast.time == null) {
                        return 0
                    }
                    return a.broadcast.time.localeCompare(b.broadcast.time);
                });
                setAnime(res.data.data)
                setIsLoading(false)
                if (res.data.pagination.has_next_page === true) {
                    console.log(`day: ${day}, page: ${page} => has next page`);
                    fetchData(page + 1)
                }
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            }
        )
    }

    useEffect(() => {
        setIsLoading(true)
        fetchData(1)
    }
        , [])

    return (
        <>
            <ThemeProvider theme={theme}>
                {
                    isLoading ? <CircularProgress /> :
                        <Grid container spacing={2} >
                            {
                                anime.map(function (item, i) {
                                    return (
                                        <Grid spacing={12} width={'100%'} size={{ sm: 6, md: 6, lg: 4, xl: 3, xxl: 2 }} key={i}>

                                            <Box display={'flex'} height={'100%'} width={'100%'} key={i} borderRadius={2}
                                                sx={{
                                                    backgroundColor: theme.palette.scheduleCard.background,
                                                }}
                                            >
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
                                                <Box width={'50%'} height={'auto'} marginX={2} marginY={2} >
                                                    <Typography
                                                        color='secondary'
                                                        variant='h6' fontWeight={'bold'}> {item.broadcast.time}
                                                        &nbsp;
                                                        <span style={{

                                                            fontWeight: 'normal',
                                                            fontSize: '15px'
                                                        }}>{item.broadcast.timezone}</span>
                                                    </Typography>
                                                    <Typography variant='h6' fontWeight={'bold'} color='primary'
                                                        sx={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            display: '-webkit-box',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 2,
                                                            lineHeight: 1.2
                                                        }}> {item.title}</Typography>
                                                    <Typography variant='body2' >status: {item.status}</Typography>
                                                    <Typography variant='body2'>episodes: {
                                                        item.episodes ? item.episodes : '?'
                                                    }</Typography>
                                                    <Typography variant='body2'>type: {item.type}</Typography>
                                                    <Box
                                                        columnGap={'2%'}
                                                        display={'flex'}
                                                        flexWrap={"wrap"}
                                                        alignContent={'center'}
                                                        alignItems={'center'}
                                                        mt={1}
                                                    >
                                                        <StarIcon fontSize='small' sx={{ color: '#fbc02d' }} />
                                                        <Typography variant='body2'>
                                                            {
                                                                item.score ? item.score : '?'
                                                            }
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>

                }
            </ThemeProvider>
        </>
    )
}
