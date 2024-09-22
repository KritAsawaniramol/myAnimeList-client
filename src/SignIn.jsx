import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcon';
import { useThemeContext } from './theme/ThemeContextProvider';
import Logo from './Logo';
import axios from 'axios';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: '100%',
    padding: 4,
    backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
        backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
}));



export default function SignIn() {
    const [mode, setMode] = React.useState('light');
    const { theme } = useThemeContext();
    // This code only runs on the client side, to determine the system color preference
    React.useEffect(() => {
        // Check if there is a preferred mode in localStorage
        const savedMode = localStorage.getItem('themeMode');
        if (savedMode) {
            setMode(savedMode);
        } else {
            // If no preference is found, it uses system preference
            const systemPrefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches;
            setMode(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);


    const handleSignInWithGoogle = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/auth/google`
    }
    
    const handleSignInWithFacebook = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/auth/facebook`
    }


    return (
        <Box>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <SignUpContainer direction="column" justifyContent="space-between">
                    <Stack
                        sx={{
                            justifyContent: 'center',
                            height: '100dvh',
                            p: 2,
                        }}
                    >
                        <Card variant="outlined">
                            <Logo h={60} w={200} />
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                            >
                                Sign In
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleSignInWithGoogle}
                                    startIcon={<GoogleIcon />}
                                >
                                    Sign in with Google
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleSignInWithFacebook}
                                    startIcon={<FacebookIcon />}
                                >
                                    Sign in with Facebook
                                </Button>

                            </Box>
                        </Card>
                    </Stack>
                </SignUpContainer>
            </ThemeProvider>
        </Box>
    );
}