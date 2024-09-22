import React, { useEffect, useState } from 'react'
import { Paper, IconButton, Container, ThemeProvider, CssBaseline, Typography, CircularProgress, Box } from '@mui/material';
import { useThemeContext } from './theme/ThemeContextProvider';
import AppAppBar from './AppAppBar'
import NightModeToggle from './NightModeToggle';
import axios from 'axios';
import ActionAreaCard from './ActionAreaCard';
import Footer from './Footer';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import MultipleSelectChip from './MultipleSelectChip';
import { limitedSendJikanReq } from './api/useApi';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid2';

export default function Search() {
    const { theme } = useThemeContext();
    const nav = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [rating, setRating] = useState("");
    const [query, setQuery] = useState("");
    const [genres, setGenres] = useState([]);
    const [pagination, SetPagination] = useState();
    const [anime, setAnime] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isGenresLoading, setGenresIsLoading] = useState(true)
    const [genresFillter, setGenresFillter] = useState([])
    const [isHighlighted, setIsHighlighted] = useState(false);




    const fetchGenres = async () => {
        setGenresIsLoading(true)
        limitedSendJikanReq({ method: 'get', url: `/genres/anime` })
            .then(function (res) {
                setGenres(res.data.data)
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {
                setGenresIsLoading(false)
            }
            )
    }
    const fetchData = async (query, page, genres) => {
        setIsLoading(true)

        const url = `/anime?q=${query ? query : ""}&page=${page ? page : ""}&genres=${genres ? genres : ""}`
        console.log(url);
        limitedSendJikanReq({ method: 'get', url: url })
            .then(function (res) {
                console.log(res.data);
                setAnime(res.data.data)
                SetPagination(res.data.pagination)
                console.log(res.data.pagination);
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            }
            )
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        const g = genresFillter.map((obj) => obj.mal_id).join(',')
        nav(`/search?query=${query}&page=1&genres=${g}`)
        fetchData(query, 1, g); // Trigger search after submitting
    }

    const handleChangePage = (e, value) => {
        e.preventDefault(); // Prevent page refresh
        setPage(value)
        const g = genresFillter.map((obj) => obj.mal_id).join(',')
        nav(`/search?query=${query}&page=${value}&genres=${g}`)
        fetchData(query, value, g); // Trigger search after submitting
    };

    let location = useLocation();

    // useEffect(() => {
    //     setQuery("")
    //     setGenresFillter([])
    //     location.search === "" && fetchData();
    // }, [location]);

    useEffect(() => {
        console.log('call useEffect');
        // const q = searchParams.get("query")
        // if (q !== null) {
        //     setQuery(q)
        // }
        // const p = searchParams.get("page")
        // if (p !== null) {
        //     setPage(parseInt(p))
        // }
        fetchData("", 1, "")
        fetchGenres()
    }, [])

    const handleOnChangeKeyword = (e) => {
        e.preventDefault(); // Prevent page refresh
        setQuery(e.target.value)
    }

    const removeBoxShadow = (e) => {
        e.preventDefault(); // Prevent page refresh
        if (e.target.value.length === 0) {
            setIsHighlighted(false);
        }
    };

    const handleFocus = (e) => {
        e.preventDefault(); // Prevent page refresh
        setIsHighlighted(true);
    };


    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppAppBar />
                <NightModeToggle />
                <Container maxWidth={'100%'}  >
                    <Box marginTop={'120px'} sx={{ display: { sm: 'flex' } }} justifyContent={'center'} minHeight={'4rem'}>
                        <Box
                            borderRadius={2}
                            border={'1px solid'}
                            onFocus={handleFocus}
                            onBlur={removeBoxShadow}
                            component="form"
                            action={`/search?query=${query}`}
                            method='get'
                            sx={{
                                maxHeight: '3.5rem',
                                mr: '10px',
                                p: "2px 4px",
                                display: "flex",
                                alignItems: "center",
                                width: '100%',
                                borderColor: isHighlighted ? theme.palette.primary.main : '#a3a3a3',
                                boxShadow: isHighlighted ? `${alpha(theme.palette.primary.main, 0.5)} 0 0 0 2px` : 'none',
                                transition: '.4s ease-in-out',
                            }}
                            onSubmit={handleSearchSubmit} // Handle the form submit with query as a parameter
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search anime..."
                                inputProps={{ "aria-label": "Search anime..." }}
                                value={query}
                                onChange={handleOnChangeKeyword}
                            />
                            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" >
                                <SearchIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ mt: { xs: 2, sm: 0 } }} >
                            {
                                isGenresLoading ? <CircularProgress /> : <MultipleSelectChip genres={genres} selected={genresFillter} setSelected={setGenresFillter} />
                            }
                        </Box>
                    </Box>

                    <Typography variant='h3' mt={3}>Search Result: {pagination ? pagination.items.total : 0}</Typography>
                    {isLoading ? <CircularProgress /> : <Box>


                        <Grid container
                        marginTop={'30px'}
                            spacing={{ xs: 1, md: 3 }}
                        >
                            {
                                anime.map((item, i) =>
                                    <Grid spacing={12} size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2, xxl: 2 }} >
                                        <Box key={i}  maxWidth={'200px'} flexGrow={1}>
                                            <ActionAreaCard
                                                mal_id={item.mal_id}
                                                title={item.title}
                                                titleJapanese={item.title_japanese} a
                                                score={item.score}
                                                rating={item.rating}
                                                synopsis={item.synopsis}
                                                genres={item.genres}
                                                season={item.season}
                                                year={item.year}
                                                img={item.images.webp.large_image_url} />
                                            <Typography
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 1,
                                                }}
                                            >{item.title}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                        </Grid>
                        <Pagination count={pagination.last_visible_page} page={page} onChange={handleChangePage} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} showFirstButton showLastButton />
                    </Box>
                    }
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    )
}
