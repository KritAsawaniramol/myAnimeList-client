import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useThemeContext } from './theme/ThemeContextProvider';
import PropTypes from 'prop-types';

export default function ScoreCheckboxesGroup(props) {
    const { scoreFilter, setScoreFilterFn} = props

    const { theme } = useThemeContext();

    const handleChange = (e) => {

        if (e.target.checked === true) {
            setScoreFilterFn([
                ...scoreFilter,
                e.target.name
            ]
            )
        } else {
            setScoreFilterFn(
                scoreFilter.filter(score => score !== e.target.name)
            )
        }
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ my: 3, ml: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Score</FormLabel>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="10" sx={{  color: theme.palette.scoreColor[10], '&.Mui-checked': {  color: theme.palette.scoreColor[10] }, }} />} label="(10) Masterpiece" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="9" sx={{  color: theme.palette.scoreColor[9]  , '&.Mui-checked': { color: theme.palette.scoreColor[9]   }, }} />} label="(9) Great" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="8" sx={{  color: theme.palette.scoreColor[8]  , '&.Mui-checked': { color: theme.palette.scoreColor[8]   }, }} />} label="(8) Very Good" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="7" sx={{  color: theme.palette.scoreColor[7]  , '&.Mui-checked': { color: theme.palette.scoreColor[7]   }, }} />} label="(7) Good" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="6" sx={{  color: theme.palette.scoreColor[6]  , '&.Mui-checked': { color: theme.palette.scoreColor[6]   }, }} />} label="(6) Fine" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="5" sx={{  color: theme.palette.scoreColor[5]  , '&.Mui-checked': { color: theme.palette.scoreColor[5]   }, }} />} label="(5) Average" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="4" sx={{  color: theme.palette.scoreColor[4]  , '&.Mui-checked': { color: theme.palette.scoreColor[4]   }, }} />} label="(4) Bad" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="3" sx={{  color: theme.palette.scoreColor[3]  , '&.Mui-checked': { color: theme.palette.scoreColor[3]   }, }} />} label="(3) Very Bad" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="2" sx={{  color: theme.palette.scoreColor[2]  , '&.Mui-checked': { color: theme.palette.scoreColor[2]   }, }} />} label="(2) Horrible" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="1" sx={{  color: theme.palette.scoreColor[1]  , '&.Mui-checked': { color: theme.palette.scoreColor[1]   }, }} />} label="(1) Appalling" />
                </FormGroup>
            </FormControl>

        </Box>
    );
}

ScoreCheckboxesGroup.prototype = {
    scoreFilter: PropTypes.array,
    setScoreFilterFn: PropTypes.func
}