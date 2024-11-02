import React, { useEffect, useState } from 'react'
import { useThemeContext } from './theme/ThemeContextProvider';
import {
    Box,
    Container,
    CssBaseline,
    Typography,
    ThemeProvider,
    CircularProgress,
    Card,
    IconButton,
    FormControl,
    Button,
    InputAdornment,
    Select,
    MenuItem,
} from '@mui/material';
import AppAppBar from './AppAppBar'
import Footer from './Footer';
import NightModeToggle from './NightModeToggle';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarIcon from '@mui/icons-material/Star';
import { sendProtectedReq, limitedSendJikanReq } from './api/useApi';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { getIsUserLoggedIn } from './auth/authClientStore';
import SelectStatus from './SelectStatus';
export default function Anime() {
    let { id } = useParams();
    const [anime, setAnime] = useState();
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(getIsUserLoggedIn());
    const [streaming, setStreaming] = useState([]);
    const [loadingStreaming, setLoadingStreaming] = useState(true);
    const [animeList, setAnimeList] = useState()
    const { theme } = useThemeContext();
    const [selectColor, setSelectColor] = useState("");

    const fetchStreaming = async () => {
        setLoadingStreaming(true)
        limitedSendJikanReq({ method: 'get', url: `/anime/${id}/streaming` })
            .then(function (res) {
                console.log(res.data.data);
                setStreaming(res.data.data)
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {
                setLoadingStreaming(false)
            })
    }
    const fetchData = async () => {
        setLoading(true)
        limitedSendJikanReq({ method: 'get', url: `/anime/${id}/full` })
            .then(function (res) {
                console.log(res.data.data);
                setAnime(res.data.data)
                if (isLoggedIn) {
                    fetchOneAnimeList(res.data.data.mal_id)
                }
                
                console.log(error);
            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
        fetchStreaming()
    }, [])

    const handleStreamingOnClick = (url) => {
        window.open(url)
    }

    const [status, setStatus] = React.useState("plan-to-watch");

    const handleAddToMyList = (e) => {
        sendProtectedReq.post('/animeList', { mal_id: `${anime.mal_id}` })
            .then(() => { fetchOneAnimeList(anime.mal_id) })
            .catch((err) => alert(err.response.data.message))
    }

    const fetchOneAnimeList = (mal_id) => {
        sendProtectedReq.get(`/animeList/${mal_id}`)
            .then((res) => {
                console.log(theme.palette.scoreColor[res.data.score])
                setAnimeList(res.data)
                setSelectColor(theme.palette.scoreColor[res.data.score])
            }
            )
            .catch((err) => {
                console.log(err.response)
            })
    }

    const updateAnimeList = (body) => {
        sendProtectedReq.patch(`/animeList/${anime.mal_id}`, body)
            .then((res) => {
                setAnimeList(res.data.anime_list)
                setSelectColor(theme.palette.scoreColor[res.data.anime_list.score])
            })
            .catch((err) => console.log(err.response.data.message))
    }

    const increaseEpisodes = () => {
        if (animeList.episodes_count < anime.episodes) {
            updateAnimeList({ "episodes_count": parseInt(animeList.episodes_count) + 1 })
        }
    }

    const decreaseEpisodes = () => {
        if (animeList.episodes_count > 0) {
        updateAnimeList({ "episodes_count": parseInt(animeList.episodes_count) - 1 })
        }
    }

   const changeStatus = (e) => {
        updateAnimeList({ "status": `${e.target.value}` })
    } 

    const changeScore = (e) => {
        updateAnimeList({ "score": parseInt(e.target.value) })
    }

    const searchTitle = (titleType) => {
        const t = anime.titles.find((title) => title.type === titleType)
        if (t) {
            return t.title
        } else {
            return ""
        }
    }


    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppAppBar />
                <NightModeToggle />
                <Container maxWidth={'xl'}>
                    <Box marginTop={'120px'}>
                        {loading ? <CircularProgress />
                            :
                            <Box>
                                <Box position={'relative'} display={'flex'}
                                    sx={{
                                        '@media (max-width:520px)': {
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }
                                    }}
                                >
                                    <img
                                        style={{ position: 'absolute', zIndex: '-1', filter: 'blur(8px)', width: '100%', height: '100%', objectFit: 'cover' }}
                                        src={anime.images.jpg.large_image_url} />
                                    <Box
                                        mr={2}
                                        component={'img'}
                                        width={'100%'}
                                        height={'auto'}
                                        maxWidth={'225px'}
                                        src={anime.images.webp.large_image_url}
                                        sx={{
                                            aspectRatio: '1/1.5',
                                            objectFit: 'cover',
                                            '@media (max-width:520px)': {
                                                marginX: 0

                                            }
                                        }}
                                    >
                                    </Box>

                                    <Box mt={2} width={'100%'} >
                                        <Box
                                            borderRadius={2}
                                            sx={{

                                                width: 'fit-content',
                                                padding: '1.5%',
                                                backgroundColor: 'rgba(0,0,0, 0.4)'
                                            }}>
                                            <Typography variant='h3' color='white' fontWeight={'bold'}>{searchTitle("Default")}</Typography>
                                            <Typography variant='h4' color='white' fontWeight={'bold'}>{searchTitle("English")
                                            }</Typography>
                                        </Box>
                                        <Card
                                            variant='outlined'
                                            sx={{
                                                width: 'fit-content',
                                                rowGap: '10px',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                marginTop: "10px",
                                                padding: '10px',
                                                flexWrap: 'wrap',
                                                '@media (max-width:520px)': {
                                                    width: '100%'
                                                }
                                            }}>
                                            <Box
                                                width={'fit-content'}
                                                padding={'10px'}
                                                border={'2px solid'}
                                                borderRadius={2}
                                                mr={3}
                                                borderColor={theme.palette.grey[300]}>
                                                <Typography lineHeight={'1.3rem'} textAlign={'center'} variant='subtitle1' paddingX={'5px'} borderRadius={2} bgcolor={theme.palette.primary.main} color={theme.palette.primary.contrastText}>Score</Typography>
                                                <Typography variant='h5' mt={1} fontWeight={'bold'} textAlign={'center'}> {anime.score}</Typography>
                                                <Typography variant='caption' whiteSpace={'nowrap'}>{anime.scored_by} users</Typography>
                                            </Box>
                                            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
                                                <Box display={'flex'} >
                                                    <Typography fontWeight={'light'} variant='h5' mr={2}>
                                                        Rank
                                                        <span style={{ color: theme.palette.primary.main, marginLeft: '10px', fontWeight: 'bold' }}>#{anime.rank}</span> {""}
                                                    </Typography>

                                                    <Typography fontWeight={'light'} variant='h5' >
                                                        Popularity <span style={{ color: theme.palette.primary.main, marginLeft: '10px', fontWeight: 'bold' }}>#{anime.popularity}</span>
                                                    </Typography>

                                                </Box>
                                                <Typography variant='caption'>{anime.season ? anime.season.toUpperCase() : ""} {anime.year}</Typography>
                                            </Box>
                                        </Card>
                                    </Box>
                                </Box>
                                {
                                    animeList
                                        ? <Box display={'flex'} mt={'20px'} gap={'10px'} flexWrap={'wrap'}>
                                            <Box border={'2px solid'} height={'45px'} borderRadius={'4px'} borderColor={theme.palette.grey[400]} >
                                                <IconButton onClick={increaseEpisodes}>
                                                    <AddCircleIcon />
                                                </IconButton>
                                                <Typography variant='button' >Episodes: {animeList.episodes_count}/{anime.episodes}</Typography>
                                                <IconButton onClick={decreaseEpisodes}>
                                                    <RemoveCircleIcon />
                                                </IconButton>
                                            </Box>
                                            <Box height={'45px'} >
                                                <FormControl sx={{
                                                    minWidth: 200, height: '100%',
                                                    '& .MuiInputBase-root': {
                                                        height: '100%'
                                                    }
                                                }} >
                                                    <Select
                                                        sx={{
                                                            '& .MuiSelect-select': {
                                                                paddingY: "0",
                                                                pr: "5px !important",
                                                                display: 'flex',
                                                                typography: 'button',
                                                                color: `${selectColor}`,
                                                            },
                                                        }}
                                                        value={animeList.score}
                                                        onChange={changeScore}
                                                        displayEmpty
                                                        endAdornment={
                                                            <InputAdornment position="end" sx={{ mr: '15px' }} >
                                                                <StarIcon sx={{ color: `${selectColor}` }} />
                                                            </InputAdornment>
                                                        }
                                                    >
                                                        <MenuItem value={0}>Select</MenuItem>
                                                        <MenuItem value={10} style={{ color: theme.palette.scoreColor[10] }}>(10) Masterpiece</MenuItem> 
                                                        <MenuItem value={9} style={{ color: theme.palette.scoreColor[9] }}>(9) Great</MenuItem>          
                                                        <MenuItem value={8} style={{ color: theme.palette.scoreColor[8] }}>(8) Very Good</MenuItem>      
                                                        <MenuItem value={7} style={{ color: theme.palette.scoreColor[7] }}>(7) Good</MenuItem>           
                                                        <MenuItem value={6} style={{ color: theme.palette.scoreColor[6] }}>(6) Fine</MenuItem>           
                                                        <MenuItem value={5} style={{ color: theme.palette.scoreColor[5] }}>(5) Average</MenuItem>        
                                                        <MenuItem value={4} style={{ color: theme.palette.scoreColor[4] }}>(4) Bad</MenuItem>            
                                                        <MenuItem value={3} style={{ color: theme.palette.scoreColor[3] }}>(3) Very Bad</MenuItem>       
                                                        <MenuItem value={2} style={{ color: theme.palette.scoreColor[2] }}>(2) Horrible</MenuItem>       
                                                        <MenuItem value={1} style={{ color: theme.palette.scoreColor[1] }}>(1) Appalling</MenuItem>      
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box height={'45px'}>
                                                <SelectStatus status={animeList.status} changeStatus={changeStatus} />
                                            </Box>
                                        </Box> :
                                        <Button disabled={!isLoggedIn} variant='contained' startIcon={<AddBoxIcon />} onClick={handleAddToMyList} sx={{ mt: '20px' }}  >Add to my list</Button>
                                }
                                {
                                    loadingStreaming ? <CircularProgress />
                                        : <Box mt={2} >
                                            <Typography variant='h4'>Streaming</Typography>
                                            <Box display={'flex'} flexWrap={'wrap'} gap={'10px'} mt={2}>
                                                {streaming.map((s, i) => {
                                                    return (
                                                        <Box key={i} mx={'0.2%'} borderRadius={'50%'} maxHeight={'50px'} sx={{ aspectRatio: '1/1' }} overflow={'hidden'}>
                                                            <Box
                                                                sx={{ cursor: 'pointer' }}
                                                                onClick={() => handleStreamingOnClick(s.url)}
                                                                component={'img'}
                                                                width={'100%'}
                                                                src={`https://www.google.com/s2/favicons?domain=${s.url}&sz=128`}>
                                                            </Box>
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                        </Box>
                                }

                                {anime?.trailer?.youtube_id &&
                                    <>
                                        <Typography variant='h4' my={2}>Trailer</Typography>
                                        <Box sx={{ aspectRatio: '16/9', width: { sm: '100%', md: '50%' } }} >
                                            <iframe
                                                frameBorder="0"
                                                allowFullScreen
                                                accelerometer="true"
                                                clipboard-write="true"
                                                encrypted-media="true"
                                                gyroscope="true"
                                                picture-in-picture="true"
                                                width={'100%'}
                                                height={'100%'}
                                                title={`${anime.title}'s trailer`}
                                                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}></iframe>
                                        </Box>
                                    </>}
                                <Typography variant='h4' my={2}>Synopsis</Typography>
                                <hr />
                                <Typography variant='body1'>{anime.synopsis}</Typography>
                                <Box mt={2} b>
                                    <Typography variant='h4'>Comment</Typography>
                                    <CommentSection mal_id={anime.mal_id} />
                                </Box>
                            </Box>
                        }
                    </Box>
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    )
}
