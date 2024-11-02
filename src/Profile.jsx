import React, { useEffect, useState } from 'react'
import { useThemeContext } from './theme/ThemeContextProvider';
import { responsiveFontSizes } from '@mui/material';

import {
  Box,
  Container,
  CssBaseline,
  Typography,
  ThemeProvider,
  CircularProgress,
  TextField,
  Paper,
  InputAdornment,
  Divider,
  ListItemButton,
  Collapse,
  ListItemIcon,
  ListItemText,

} from '@mui/material';
import AppAppBar from './AppAppBar'
import NightModeToggle from './NightModeToggle';
import Footer from './Footer';
import { useAuth } from './auth/AuthContext';
import { useNavigate } from "react-router-dom";
import { sendProtectedReq } from './api/useApi';
import SearchIcon from '@mui/icons-material/Search';
import ScoreCheckboxesGroup from './ScoreCheckboxesGroup';
import StatusCheckboxesGroup from './StatusCheckboxesGroup';
import AnimeListCard from './AnimeListCard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
export default function Profile() {
  const { theme } = useThemeContext();
  const [userProfile, setUserProfile] = useState();
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimeListLoading, setIsAnimeListLoading] = useState(true);
  const [displayAnime, setDisplayAnime] = useState([]);
  const [filterName, setFilterName] = useState("")
  const [filterStatus, setFilterStatus] = useState([])
  const [filterScore, setFilterScore] = useState([])
  const { isAuthenticated } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const searchTitle = (animeTitle, animeStatus, animeScore) => {
    if (filterName === "" ||
      filterName === null ||
      (animeTitle.trim().toLowerCase().startsWith(filterName.toLowerCase()) && filterName !== ""
      )) {
      if (filterStatus.length === 0 || filterStatus.includes(animeStatus)) {
        if (filterScore.length === 0 || filterScore.includes(`${animeScore}`)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  }


  const onSearchChange = (e) => {
    let keyword = e.target.value

    // animeList.filter((item) => item.)
    setFilterName(keyword)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile()
      fetchAnimeList()
    } else {
      nav("/signin")
    }
  }, [])

  const fetchUserProfile = async () => {
    setIsLoading(true)
    sendProtectedReq.get("/profile")
      .then((res) => {
        setUserProfile(res.data.user)
        console.log(res.data.user.avatar_url);
        setIsLoading(false)
      }).catch((err) => {
        console.log(err);
      })
  }

  const fetchAnimeList = async () => {
    sendProtectedReq.get("/animeList")
      .then((res) => {
        setAnimeList(res.data.anime_list)
        setDisplayAnime(res.data.anime_list)
        console.log(res.data.anime_list);
        setIsAnimeListLoading(false)
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <AppAppBar />
        <NightModeToggle />
        <Box marginTop={'120px'}>
          <Container maxWidth={'xl'}  >
            {
              isLoading ? <CircularProgress /> :
                <Paper
                  display={'flex'}
                  sx={{
                    alignItems: 'flex-start',
                    borderRadius: theme.shape.borderRadius
                  }}
                >
                  <svg width={0} height={0}>
                    <defs>
                      <linearGradient id="circularProgressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    ml={3}
                    py={2}
                    gap={'20px'}
                  >
                    <Box maxHeight={'96px'} maxWidth={'20%'} >
                      <img src={userProfile.avatar_url} />
                    </Box>
                    <Box>
                      <Typography>Name: {userProfile.name}</Typography>
                      <Typography sx={{
                        overflowWrap: 'break-word'
                      }}>Email: {userProfile.email} </Typography>
                    </Box>
                  </Box>
                  <Divider />

                  <Box padding={'1%'} sx={{ display: { xs: 'block', sm: 'block', md: 'flex' } }} >
                    <Box sx={{ display: { sm: 'block', md: 'none' } }}>
                      <TextField
                        sx={{
                          '& .MuiInputBase-root': {
                            backgroundColor: theme.palette.background.paper
                          }
                        }}
                        variant="outlined"
                        placeholder='Search...'
                        value={filterName}
                        onChange={onSearchChange}
                        fullWidth
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    
                      <ListItemButton onClick={handleClick} sx={{my: '10px'}}>
                        <ListItemIcon>
                          <FilterAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Filter" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box display={'flex'} flexWrap={'wrap'}  >
                          <StatusCheckboxesGroup statusFilter={filterStatus} setStatusFilterFn={setFilterStatus} />
                          <ScoreCheckboxesGroup scoreFilter={filterScore} setScoreFilterFn={setFilterScore} />
                        </Box>
                      </Collapse>

                    </Box>
                    <Box width={'20%'} mr={'10px'}
                      sx={{
                        display: { xs: 'none', sm: 'none', md: 'block' }
                      }}
                    >
                      <TextField
                        sx={{
                          '& .MuiInputBase-root': {
                            backgroundColor: theme.palette.background.paper
                          }
                        }}
                        variant="outlined"
                        placeholder='Search...'
                        value={filterName}
                        onChange={onSearchChange}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      <StatusCheckboxesGroup statusFilter={filterStatus} setStatusFilterFn={setFilterStatus} />
                      <ScoreCheckboxesGroup scoreFilter={filterScore} setScoreFilterFn={setFilterScore} />
                    </Box>

                    <Box width={'100%'} sx={{ overflowY: 'scroll' }} maxHeight={'800px'}>
                      {isAnimeListLoading ? <CircularProgress /> :
                        <>
                          {
                            animeList.map(function (item, i) {
                              console.log(item);
                              return (
                                <AnimeListCard
                                  key={i}
                                  mal_id={item.mal_id}
                                  status={item.status}
                                  episodes_count={item.episodes_count}
                                  filterNameFn={searchTitle}
                                  filterName={filterName}
                                  score={item.score}
                                  fetchAnimeListFn={fetchAnimeList}
                                />
                              )
                            })
                          }
                        </>
                      }

                    </Box>

                  </Box>
                </Paper>
            }
          </Container>
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  )
}
