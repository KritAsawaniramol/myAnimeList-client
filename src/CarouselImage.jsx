import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useThemeContext } from './theme/ThemeContextProvider';
import Carousel from 'react-material-ui-carousel'
import {Fab, Box, Typography, ThemeProvider, CircularProgress } from '@mui/material'
import './CarouselImage.css';
import { useNavigate } from "react-router-dom";
import { limitedSendJikanReq } from './api/useApi';


import NavigateNextIcon from '@mui/icons-material/NavigateNext';
function CarouselImage(props) {
    const [upcoming, setUpcoming] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { theme } = useThemeContext();

    const fetchData = async () => {
        limitedSendJikanReq({method: 'get' , url: `/seasons/now`})
            .then(function (res) {
                console.log(res.data.data);
                setUpcoming(res.data.data)
                setIsLoading(false)

            }).catch(function (error) {
                console.log(error);
            })

    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <ThemeProvider theme={theme}>

                {isLoading ?
                    <CircularProgress color="secondary" />

                    :
                    <Box
                        sx={{

                            
                            position: 'relative',
                            height: { xs: 300, sm: 600, md: 600, lg: 700 }, // Responsive height
                        }}
                    >
                        <Carousel
                            animation="slide"
                            duration={700}
                            height={700}
                            showThumbs={false}
                            showStatus={false}
                            swipeable
                            sx={{
                                height: { xs: 300, sm: 600, md: 600, lg: 700 }, // Responsive height
                                position: 'relative',
                              }}
                            indicatorContainerProps={{
                                style: {
                                    display: 'none'
                                }

                            }}
                        >
                            {
                                upcoming?.map((item, i) => <Item key={i} item={item} />)
                            }
                        </Carousel>
                    </Box>


                }
            </ThemeProvider>

        </>
    )
}

function Item(props) {

    const { item } = props
    // const displayText = item.synopsis.length > 300 ? item.synopsis.substring(0, 300) + '...' : item.synopsis;
    const nav = useNavigate()
    let short_description
    if (item.synopsis.split(' ').length >= 80) {
        short_description = item.synopsis.split(' ').slice(0, 80).join(' ');
    } else {
        short_description = item.synopsis;
    }
    const { theme } = useThemeContext();
    const handleOnClick = (e) => {
        console.log(item.mal_id);
        nav(`/anime/${item.mal_id}`)
    }

    return (

        <>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        backgroundRepeat: "no-repeat",
                        overflow: 'hidden',
                        objectFit: 'cover',
                        float: 'right',
                        display: 'flex', // Enable flexbox layout
                        // justifyContent: 'center', // Horizontally center the image
                        width: '60%',
                        '@media (max-width:600px)': {
                            width: '100%'
                        },
                        height: { xs: 300, sm: 600, md: 600, lg: 700 }, // Responsive height
                    }}>
                    <img  className='carouseImage' src={`${item.trailer.images.maximum_image_url}`} />
                    <Box
                        sx={{

                            position: 'absolute',
                            width: '100%',
                            backgroundColor: 'transparent',
                            boxShadow: `inset 30px 0px 30px 30px ${theme.palette.background.default}`,
                            '@media (max-width:600px)': {
                               display: 'none'
                            },
                            height: { xs: 300, sm: 600, md: 600, lg: 700 }, // Responsive height

                        }}
                    >

                    </Box>
                </Box>

                <Box
                    position={'absolute'}
                    zIndex={1}
                    paddingLeft={'3%'}
                    maxHeight={'100%'}
                    overflow={'hidden'}
                    maxWidth={'50%'}

                    flexWrap={'wrap'}
                    alignContent={'flex-end'}
                    sx={{
                        height: { xs: 300, sm: 600, md: 600, lg: 700 }, // Responsive height

                        '@media (max-width:600px)': {
                            maxWidth: '100%'

                        },
                      
                    }}

                >
                    <Typography
                        variant='h3'
                        width={'100%'}
                        fontWeight={'Bold'}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            
                            '@media (max-width:600px)': {
                                color: '#fff',
                                width: '100%',
                                WebkitTextStrokeWidth: '1px',
                                WebkitTextStrokeColor: '#b3eef5'

                            }
                        }}
                    >{props.item.title}

                    </Typography>


                    <Typography variant='body1' sx={{
                           overflow: 'hidden',
                           textOverflow: 'ellipsis',
                           display: '-webkit-box',
                           WebkitBoxOrient: 'vertical',
                           WebkitLineClamp: 6,
                        '@media (max-width:600px)': {
                            display: 'none', // Default height for larger screens
                        }
                    }}
                    >
                        {item.synopsis}

                    </Typography>


                    <Fab variant="extended" color="primary"
                        onClick={handleOnClick}
                        sx={{
                            marginTop: '10px',
                            marginBottom: '5%',
                            textTransform: 'none',
                            paddingX: '20px'
                        }}
                        
                    >

                        Detail
                        <NavigateNextIcon />
                    </Fab>
                </Box>


            </ThemeProvider>

        </>
    )
}

export default CarouselImage

