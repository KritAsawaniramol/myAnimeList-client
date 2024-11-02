import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import PlayCircleIcon from '@mui/icons-material/PlayCircle'; 
import { useThemeContext } from './theme/ThemeContextProvider';
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';

export default function ActionAreaCard(props) {
    const nav = useNavigate()

    const shortRating = new Map();
    shortRating.set('G - All Ages', 'G-All')
    shortRating.set('PG - Children', 'PG')
    shortRating.set('PG-13 - Teens 13 or older', 'PG-13')
    shortRating.set('R - 17+ (violence & profanity)', 'R-17+')
    shortRating.set('R+ - Mild Nudity', 'R+')
    shortRating.set('Rx - Hentai', 'Rx')

    const ratingColor = new Map([
        ['G - All Ages', '#E8CCEB'], 
        ['PG - Children', '#F5E0BC'], 
        ['PG-13 - Teens 13 or older', '#D6EAF8'], 
        ['R - 17+ (violence & profanity)', '#F2B0B7'], 
        ['R+ - Mild Nudity', '#D9B6F2'], 
        ['Rx - Hentai', '#E8E8E8'] 
    ]);

    const { mal_id, season, title, titleJapanese, score, rating, synopsis, genres, year, img } = props

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const { theme } = useThemeContext();

    const handleOnClick = (e) => {

        nav(`/anime/${mal_id}`)
    }

    return (

        <Box>
            <Card
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                
                sx={{
                    position: 'relative',
                    maxWidth: 200,
                    
                    borderRadius: 2,
                    '&:hover img': {
                        filter: 'blur(4px) brightness(0.7)', // Blur and darken the background
                    },
                    '&:hover .hoverIcon': {
                        opacity: 1, // Show the icon on hover
                    },
                }}>
                <CardActionArea sx={{ margin: '0', padding: '0', aspectRatio: '2/3' }} onClick={handleOnClick} >
                        <CardMedia 
                          component='img'
                          src={`${img}`}
                          height={'100%'}
                        />
                        {/* <Box
                            component='img'
                            src={`${img}`}
                            sx={{
                                objectFit: 'cover',
                                maxWidth: 'auto',
                                height: '100%',
                                maxHeight: '300px',
                                aspectRatio: '2/3',
                            }}
                        >
                        </Box> */}

                        <PlayCircleIcon

                            className="hoverIcon"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#fff',
                                opacity: 0,
                                fontSize: 48,
                                transition: 'opacity 0.3s ease-in-out',
                            }}
                        />
                  


                </CardActionArea>
                <Popover
                    id="mouse-over-popover"
                    open={open}
                    sx={{
                        pointerEvents: 'none',
                        '& .MuiPaper-root': {
                            backgroundColor: alpha(theme.palette.background.default, 0.8),
                            borderRadius: 2,
                            padding: '20px',
                        },
                    }}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus


                >
                    <Box

                        height={'auto'} width={'30vh'}
                    >
                        <Typography variant='h4' fontWeight={'bold'} sx={{

                        }}>
                            {title}
                        </Typography>
                        <Box
                            marginBottom={2}
                            columnGap={'2%'}
                            display={'flex'}
                            flexWrap={"wrap"}
                            alignContent={'center'}
                        >
                            <StarIcon sx={{ color: '#fbc02d' }} />
                            <Typography>
                                {
                                    score ? score : '?'
                                }
                            </Typography>

                            <Typography
                                sx={{
                                    paddingX: '3%',
                                    color: '#000 !important',
                                    backgroundColor: `${ratingColor.get(rating)}`,
                                    borderRadius: 2

                                }}
                            >
                                {shortRating.get(rating)}
                            </Typography>
                        </Box>
                        <Typography
                            variant='body2'
                            marginBottom={2}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                            }}>
                            {synopsis}
                        </Typography>
                        <Typography variant='body2'>
                            Japanese: {titleJapanese} <br />
                            Aired: {year ? year : '?'} <br />
                            Season: {season ? season : '?'}
                        </Typography>
                        <hr />
                        <Box
                            display={'flex'}
                            columnGap={'2%'}
                        >
                            <Typography
                                display={'flex'}
                                flexWrap={"wrap"}
                                alignContent={'center'}
                                variant='body2'
                                mt={1}
                            >
                                Genre:
                            </Typography>
                            <Stack direction="row"
                                flexWrap={'wrap'}

                            >
                                {genres.map((item, i) =>

                                    <Chip sx={{ mt: 1, mr: 1 }} label={item.name} key={i} variant="outlined" />
                                )}


                            </Stack>
                        </Box>
                    </Box>
                </Popover>
            </Card>

        </Box>

    )
}
