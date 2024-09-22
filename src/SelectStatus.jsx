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
export default function SelectStatus(props) {
    const {changeStatus, status} = props

return (
    <FormControl sx={{
        minWidth: 150, 
        height: '100%',
        '& .MuiInputBase-root': {
            height: '100%'
        }
    }} >
        <Select
            sx={{
                '& .MuiSelect-select': {
                    paddingY: "0",
                    typography: 'button'
                },
            }}
            value={status}
            onChange={changeStatus}
            displayEmpty
        >
            <MenuItem value="plan-to-watch">Plan to Watch</MenuItem>
            <MenuItem value="watching">Watching</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="on-hold">On-Hold</MenuItem>
            <MenuItem value="dropped">Dropped</MenuItem>
        </Select>
    </FormControl>
  )
}
