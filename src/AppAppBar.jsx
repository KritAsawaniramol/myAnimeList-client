import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Logo from './Logo'
import { useNavigate } from "react-router-dom";
import { useThemeContext } from './theme/ThemeContextProvider';
import { useAuth } from './auth/AuthContext';
import { limiter, restartLimiter, sendProtectedReq } from './api/useApi';

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { logout, isAuthenticated} = useAuth()
  const nav = useNavigate()
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const { theme } = useThemeContext();
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 1),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
  }));

  const handleNav = (path) =>{
    restartLimiter()
    nav(path)
  }
  
  const fetchUserProfile = async () => {
    console.log("fetchUserProfile");
    sendProtectedReq.get("/profile")
    .then((res) => {
      setUserProfile(res.data.user)
      setIsLoggedIn(true)
    }).catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile()
    }
  }, [])



  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 3 }}
    >
      <Container maxWidth="xl">
        <StyledToolbar
          variant="dense" disableGutters
        >
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            {/* <Sitemark /> */}
            <Logo h={40} w={150} mr={0} />

            <Box
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Button variant="text" color="info" size="small" sx={{fontSize: '1rem'}}
                onClick={() => handleNav('/')}>
                Home
              </Button>
              <Button variant="text" color="info" size="small" sx={{fontSize: '1rem'}}
                onClick={() =>  handleNav("/search")}
              >
                Search Anime
              </Button>
              <Button variant="text" color="info" size="small" sx={{fontSize: '1rem'}}
                onClick={() => handleNav("/seasonal")}
              >
                Seasonal Anime
              </Button>

            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >

            {
              isLoggedIn === true ?
                <Box>
                  
                  <Typography variant="text" color="info">Welcome {userProfile.name}</Typography>
                  <IconButton  sx={{ mx: '10px' }} onClick={() => nav("/profile")}>
                    <Avatar 
                      src={userProfile.avatar_url} />
                  </IconButton>
                  <Button color='error' variant='outlined' onClick={logout}>
                    Logout
                  </Button>
                </Box>
                : <>
               
                  <Button color="primary" variant="text" size="small"
                    onClick={() => nav("/signin")}
                  >
                    Sign in
                  </Button>
                </>
            }
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>

            <IconButton
              aria-label="Menu button"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top" open={open} onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ p: 2, backgroundColor: 'background.default' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton
                    color="primary" onClick={toggleDrawer(false)}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem onClick={() => handleNav("/")}>Home</MenuItem>
                <MenuItem onClick={() => handleNav("/search")}>Search Anime</MenuItem>
                <MenuItem onClick={() => handleNav("/seasonal")}>Seasonal Anime</MenuItem>
                {
                  isLoggedIn === true ?
                    <>
                      <MenuItem onClick={() => handleNav("/profile")}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: '20px' }}
                          src={userProfile.avatar_url}></Avatar>
                        <Typography variant="text" color="info">Welcome {userProfile.name}</Typography>
                      </MenuItem>
                      <MenuItem onClick={logout}>
                        <Typography color='error'>
                          Logout
                        </Typography>
                      </MenuItem>
                    </>
                    : <MenuItem>
                      <Button color="primary" variant="outlined" onClick={() => nav("/signin")} fullWidth>
                        Sign in
                      </Button>
                    </MenuItem>
                }
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}