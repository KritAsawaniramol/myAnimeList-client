import React from 'react'
import {
    Box,
    Container,
    CssBaseline,
    Typography,
    ThemeProvider,
    CircularProgress,
    Card,
    IconButton,
    FormControl,
    Button,
    InputAdornment,
    Select,
    MenuItem,
} from '@mui/material';
import { useThemeContext } from './theme/ThemeContextProvider';
import StarIcon from '@mui/icons-material/Star';

export default function SelectScore(props) {
    const {selectColor, score, changeScore } = props
    const { theme } = useThemeContext();

    
  return (
    <FormControl sx={{
        minWidth: 200, height: '100%',
        '& .MuiInputBase-root': {
            height: '100%'
        }
    }} >
        <Select
            sx={{
                '& .MuiSelect-select': {
                    paddingY: "0",
                    pr: "5px !important",
                    display: 'flex',
                    typography: 'button',
                    color: `${selectColor}`,
                },
            }}
            value={score}
            onChange={changeScore}
            displayEmpty
            endAdornment={
                <InputAdornment position="end" sx={{ mr: '15px' }} >
                    <StarIcon sx={{ color: `${selectColor}` }} />
                </InputAdornment>
            }
        >
            <MenuItem value={0}>Select</MenuItem>
            <MenuItem value={10} style={{ color: theme.palette.scoreColor[10] }}>(10) Masterpiece</MenuItem>  {/* Green for top rating */}
            <MenuItem value={9} style={{ color: theme.palette.scoreColor[9] }}>(9) Great</MenuItem>         {/* Slightly lighter green */}
            <MenuItem value={8} style={{ color: theme.palette.scoreColor[8] }}>(8) Very Good</MenuItem>      {/* Lighter green */}
            <MenuItem value={7} style={{ color: theme.palette.scoreColor[7] }}>(7) Good</MenuItem>           {/* Lime green */}
            <MenuItem value={6} style={{ color: theme.palette.scoreColor[6] }}>(6) Fine</MenuItem>           {/* Yellow for a mid-range rating */}
            <MenuItem value={5} style={{ color: theme.palette.scoreColor[5] }}>(5) Average</MenuItem>        {/* Orange for average */}
            <MenuItem value={4} style={{ color: theme.palette.scoreColor[4] }}>(4) Bad</MenuItem>            {/* Light orange */}
            <MenuItem value={3} style={{ color: theme.palette.scoreColor[3] }}>(3) Very Bad</MenuItem>       {/* Dark orange */}
            <MenuItem value={2} style={{ color: theme.palette.scoreColor[2] }}>(2) Horrible</MenuItem>       {/* Red for low rating */}
            <MenuItem value={1} style={{ color: theme.palette.scoreColor[1] }}>(1) Appalling</MenuItem>      {/* Dark red for worst rating */}
        </Select>
    </FormControl>
  )
}
