import * as React from 'react';
import PropTypes from 'prop-types';
import { CardMedia, Paper, IconButton, Container, ThemeProvider, CssBaseline, Typography, CircularProgress, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export function CircularProgressWithLabel(props) {
    const { total, done, increaseEpisodesFn, decreaseEpisodesFn, gradientID } = props

    const percentage = Math.round((done / total) * 100)

    const [height, setHeight] = React.useState(0)

    const ref = React.useRef(null)
    React.useEffect(() => {
        setHeight(ref.current.clientWidth)
    })

    return (
        <Box ref={ref} sx={{ position: 'relative', display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress
                size={height * 0.8}
                sx={{
                    'svg circle': {
                        stroke: `url(#${gradientID})`,
                        strokeLinecap: 'round'
                    },
                    height: 'auto !important',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }} variant="determinate" value={percentage} />
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                position={'absolute'}
            >
                <IconButton sx={{
                    width: 'fit-content',
                    '@media (max-width:600px)': {
                        p: '0',
                    }
                }} onClick={increaseEpisodesFn}>
                    <AddCircleIcon fontSize="large" sx={{
                        '@media (max-width:600px)': {
                            fontSize: 'medium',
                        }
                    }} />
                </IconButton>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                    {`${done} / ${total}`}
                </Typography>
                <IconButton sx={{ width: 'fit-content', '@media (max-width:600px)': {
                        p: '0',
                    } }} onClick={decreaseEpisodesFn}>
                    <RemoveCircleIcon fontSize="large" sx={{
                        '@media (max-width:600px)': {
                            fontSize: 'medium',
                        }
                    }} />
                </IconButton>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel(props) {
    const { total, done, increaseEpisodesFn, decreaseEpisodesFn, gradientID } = props

    const percentage = Math.round((done / total) * 100)
    return <CircularProgressWithLabel
        done={done}
        total={total}
        value={percentage}
        increaseEpisodesFn={increaseEpisodesFn}
        decreaseEpisodesFn={decreaseEpisodesFn}
        gradientID={gradientID}
    />;
}


