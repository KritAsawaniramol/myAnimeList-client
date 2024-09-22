import React, { useEffect, useState } from 'react'
import { limitedSendJikanReq, sendProtectedReq } from './api/useApi';
import { CardMedia, Paper, Typography, CircularProgress, Box } from '@mui/material';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { useThemeContext } from './theme/ThemeContextProvider';
import SelectStatus from './SelectStatus';
import SelectScore from './SelectScore';
import DeleteAnimeButton from './DeleteAnimeButton';

export default function AnimeListCard(props) {
    const [mal_id, setMalID] = useState(props.mal_id ? props.mal_id : "")
    const [status, setStatus] = useState(props.status ? props.status : "")
    const [episodes_count, setEpisodesCount] = useState(props.episodes_count ? props.episodes_count : 0)
    const [score, setScore] = useState(props.score ? props.score : 0)
    const [anime, setAnime] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const { theme } = useThemeContext();
    const [selectColor, setSelectColor] = useState(props.score ? theme.palette.scoreColor[props.score] : "");

    const fetchAnime = async () => {
        setIsLoading(true)
        limitedSendJikanReq({ method: 'get', url: `/anime/${mal_id}` })
            .then(function (res) {
                setAnime(res.data.data)
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            }
            )
    }

    const removeAnime = () => {
        sendProtectedReq.delete(`/animeList/${mal_id}`)
            .then((res) => {
            console.log(res);
            if (res.status === 200) {
                props.fetchAnimeListFn()
            }
            })
            .catch((err) => console.log(err))
    }


    const updateAnimeList = (body) => {
        sendProtectedReq.patch(`/animeList/${mal_id}`, body)
            .then((res) => {
                console.log(res);
                setMalID(res.data.anime_list.mal_id)
                setStatus(res.data.anime_list.status)
                setEpisodesCount(res.data.anime_list.episodes_count)
                setScore(res.data.anime_list.score)
                setSelectColor(theme.palette.scoreColor[res.data.anime_list.score])
            })
            .catch((err) => console.log(err))
    }


    const increaseEpisodes = () => {
        if (episodes_count < anime.episodes) {
            updateAnimeList({ "episodes_count": parseInt(episodes_count) + 1 })
        }
    }

    const decreaseEpisodes = () => {
        if (episodes_count > 0) {
            updateAnimeList({ "episodes_count": parseInt(episodes_count) - 1 })
        }
    }
    useEffect(() => {
        fetchAnime()
    }, [])


    const changeStatus = (e) => {
        setStatus(e.target.value)
        updateAnimeList({ "status": `${e.target.value}` })
    }

    const changeScore = (e) => {
        setScore(parseInt(e.target.value))
        updateAnimeList({ "score": parseInt(e.target.value) })
    }

    return (
        <>
            {
                isLoading ? <CircularProgress /> :
                <Box display={'flex'} justifyContent={'center'}>
                    <Paper
                        // display={filterNameFn(anime.title, props.filterName) ?  'none' : 'block'}
                        px={'5%'}
                        variant="outlined"
                        {...(theme.palette.mode === 'dark' && { elevation: 0, variant: 'elevation' })}
                        sx={{
                            display: props.filterNameFn(anime.title, status, score) ? 'flex' : 'none',
                            width: '100%',
                            height: 'auto',
                            mb: '10px',
                            position: 'relative',
                            overflow: 'visible',
                            '@media (max-width:600px)': {
                                width: '80%',
                            }
                        }}
                    >
                      

                        <Box display={'flex'} width={'75%'} position={'relative'} sx={{
                            '@media (max-width:600px)': {
                                display: 'block',
                                height: 'fit-contect',
                                width: '100%',
                                overflow: 'hidden'
                            }
                        }}>
                          
                            <DeleteAnimeButton  removeAnimeFn={removeAnime}/>
                            <Box sx={{
                                '@media (min-width:600px)': {
                                    display: 'none'
                                }
                            }}>
                                <Box width={'100px'}
                                    height={'100px'}
                                    right={'5px'}
                                    top={'5px'}
                                    bgcolor={'white'}
                                    borderRadius={'50%'}
                                    sx={{
                                        position: 'absolute',
                                        '@media (min-width:600px)': {
                                            bgcolor: 'transparent',
                                            
                                        }
                                    }}>
                                    <CircularProgressWithLabel
                                        key={'small'}
                                        done={episodes_count}
                                        total={anime.episodes}
                                        increaseEpisodesFn={increaseEpisodes}
                                        decreaseEpisodesFn={decreaseEpisodes}
                                        gradientID={'circularProgressGradient'}
                                    />
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{
                                    maxWidth: '30%',
                                    minHeight: '220px',
                                    maxHeight: '300px',
                                    objectFit: 'cover',
                                    '@media (max-width:600px)': {
                                        maxWidth: 'none',
                                        minHeight: '0',
                                        width: '100%',
                                        height: '100px',
                                    }
                                }}
                                src={anime.images.webp.large_image_url}
                            />
                            <Box display={'flex'} justifyContent={'center'} >
                                <Box p={{ sm: '5px', md: '20px' }} >
                                    <Typography variant='h5' fontWeight={'bold'}>{anime.title ? anime.title : ""}</Typography>
                                    <Typography >{anime.title_english ? anime.title_english : ""}</Typography>
                                    <Typography >{anime.title_japanese ? anime.title_japanese : ""}</Typography>
                                    <Box height='40px' >
                                        <Box mt={'10px'} display={'inline-block'} height={'100%'} mr={'10px'}>
                                            <SelectStatus 
                                            changeStatus={changeStatus} 
                                            status={status} />
                                        </Box>
                                        <Box mt={'10px'} display={'inline-block'} height={'100%'}>

                                            <SelectScore 
                                            score={score} 
                                            changeScore={changeScore} 
                                            selectColor={selectColor} 
                                            />
                                        </Box>

                                    </Box>


                                </Box>
                            </Box>
                        </Box>

                        <Box position={'absolute'} right={0} borderLeft={`6px dashed`} borderColor={theme.palette.mode === 'dark' ? '#1e1e1e' : '#0000001f'}
                            width={'25%'}
                            height={'100%'}
                            display={'flex'}
                            justifyContent={'center'}
                            sx={{
                                '@media (max-width:600px)': {
                                    display: 'none'
                                }
                            }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                left: '-18px',
                                top: '-1px',
                                backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : theme.palette.background.paper,
                                display: 'inline-block',
                                height: '17px',
                                width: '30px',
                                border: theme.palette.mode === 'light' && '1px solid',
                                borderColor: theme.palette.grey[300],
                                borderTop: 0,
                                borderRadius: '0 0 30px 30px',
                            }}>
                            </Box>

                            {/* <img src={anime.images.webp.large_image_url}/> */}
                            <CircularProgressWithLabel
                                key={2}
                                done={episodes_count}
                                total={anime.episodes}
                                increaseEpisodesFn={increaseEpisodes}
                                decreaseEpisodesFn={decreaseEpisodes}
                                gradientID={'circularProgressGradient'}
                            />
                            <Box sx={{
                                position: 'absolute',
                                left: '-18px',
                                bottom: '-1px',
                                backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : theme.palette.background.paper,
                                display: 'inline-block',
                                height: '17px',
                                width: '30px',
                                border: theme.palette.mode === 'light' && '1px solid',
                                borderBottom: 0,
                                borderColor: theme.palette.grey[300],
                                borderRadius: '30px 30px 0 0'
                            }}></Box>
                        </Box>
                    </Paper>
                    </Box>
            }
        </>
    )
}
