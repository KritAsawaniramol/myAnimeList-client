import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useThemeContext } from './theme/ThemeContextProvider';
import PropTypes from 'prop-types';

export default function StatusCheckboxesGroup(props) {
    const { statusFilter, setStatusFilterFn} = props
    const { theme } = useThemeContext();
  

    const handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.checked);
        if (e.target.checked === true) {
            setStatusFilterFn([
                ...statusFilter,
                e.target.name
            ]
            )
        } else {
            console.log(statusFilter);
            setStatusFilterFn(
                statusFilter.filter(status => status !== e.target.name)
            )
        }
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ mt: 3, mx: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Status</FormLabel>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="plan-to-watch" sx={{ color: theme.palette.scoreColor[10], '&.Mui-checked': { color: theme.palette.scoreColor[10] }, }} />} label="Plan to Watch" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="watching" sx={{ color: theme.palette.scoreColor[8], '&.Mui-checked': { color: theme.palette.scoreColor[8] }, }} />}label="Watching" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="completed" sx={{ color: theme.palette.scoreColor[6], '&.Mui-checked': { color: theme.palette.scoreColor[6] }, }} />}label="Completed" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="on-hold" sx={{ color: theme.palette.scoreColor[3], '&.Mui-checked': { color: theme.palette.scoreColor[3] }, }} />}label="On-Hold" />
                    <FormControlLabel control={<Checkbox onChange={handleChange} name="dropped" sx={{ color: theme.palette.scoreColor[1], '&.Mui-checked': { color: theme.palette.scoreColor[1] }, }} />}label="Dropped" />
                </FormGroup>
            </FormControl>
        </Box>
    );
}

StatusCheckboxesGroup.prototype = {
    statusFilter: PropTypes.array,
    setStatusFilterFn: PropTypes.func
}