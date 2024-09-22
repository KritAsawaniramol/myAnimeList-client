import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SvgIcon from '@mui/material/SvgIcon';
import SitemarkIcon from './SitemarkIcon';
import Logo from './Logo'

function Copyright() {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {'Copyright © '}
            Krit Asawaniramol
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box mt={10}>

        <React.Fragment>
            <Divider />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 4, sm: 4 },
                    pt: { xs: 6, sm: 8 },
                    pb: { xs: 10, sm: 12 },
                    textAlign: { sm: 'center', md: 'left' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            minWidth: { xs: '100%', sm: '60%' },
                        }}
                    >
                            <Logo h={60} w={200} mr={2} />
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ color: 'text.secondary' }}
                                textAlign={'start'}
                            >
                                Welcome to <strong>My Anime List</strong> – your one-stop destination for exploring and keeping track of your favorite anime shows and movies. Powered by the <strong>Jikan API</strong>, our platform provides up-to-date information on anime titles, characters, and more, ensuring that you stay connected to the world of anime. Whether you're a seasoned otaku or just getting started, My Anime List is here to help you discover, rate, and share your anime experiences with the community.
                            </Typography>
                    </Box>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        pt: { xs: 2, sm: 4 },
                        width: '100%',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <div>
                        <Copyright />
                    </div>
                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{ justifyContent: 'left', color: 'text.secondary' }}
                    >
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://github.com/KritAsawaniramol"
                            aria-label="GitHub"
                            sx={{ alignSelf: 'center' }}
                        >
                            <GitHubIcon />
                        </IconButton>

                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://www.linkedin.com/in/krit-asawaniramol-409b97244/"
                            aria-label="LinkedIn"
                            sx={{ alignSelf: 'center' }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
        </Box>

    );
}