import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import {ThemeProvider } from '@mui/material'
import { useThemeContext } from './theme/ThemeContextProvider';


export default function Logo(prop) {
    const {h, w, mr} = prop
    const { theme } = useThemeContext();
    return (
        <ThemeProvider theme={theme}>

        <SvgIcon sx={{ height: h, width: w, mr: mr }}>
<svg xmlns="http://www.w3.org/2000/svg"    
 version="1.1" viewBox="100 0 2048 583">
{/* <path transform="translate(0)" d="m0 0h2048v583h-2048z" fill="#FDFEFE"/> */}
<path transform="translate(237,189)" d="m0 0 5 1 25 14 24 14 25 14 24 14 16 9 1 2-26 15-27 16-28 16-26 15-10 6v136l-6-2-24-14-25-14-24-14-25-14-15-9v-137l20-12 77-45z" fill="#128FFA"/>
<path transform="translate(490,332)" d="m0 0h1l1 82v55l-24 14-26 15-48 28-15 9-7 1-22-12-24-14-28-16-25-14-17-10-1-12v-125l12 6 24 14 25 14 24 14 25 14 7 4 5-1 26-15 24-14 26-15 24-14z" fill="#128FFA"/>
<path transform="translate(371,109)" d="m0 0 5 2 20 11 24 14 25 14 24 14 21 12 1 1 1 136-9 6-21 12-24 14-26 15-36 21h-2l-1-49-1-86-13-8-25-14-24-14-25-14-24-14-6-4 3-3 26-15 28-16 27-16 26-15z" fill="#128FFA"/>
<path transform="translate(591,227)" d="m0 0h51l15 43 16 48 4 14 1 1 8-27 26-79h52v153l-37 1-1-1v-73l1-24-21 63-12 34-5 1h-27l-4-8-21-60-9-27 1 21v73l-1 1h-36l-1-1z" fill={theme.palette.text.primary}/>
<path transform="translate(1356,269)" d="m0 0h17l10 3 10 9 4 7 6-8 7-6 10-4 4-1h18l11 4 6 5 5 8 3 10 1 9v75l-1 1h-35l-1-61-2-15-3-4h-10l-6 4-6 10-3 8-1 57-1 1h-34l-1-1-1-66-2-9-3-4h-10l-7 6-7 14-1 3-1 56-2 1h-34v-109h33l1 1 1 12 7-8 8-5z" fill={theme.palette.text.primary}/>
<path transform="translate(1e3 227)" d="m0 0h31l4 8 15 37 20 48 16 39 8 19v2l-6 1h-28l-6-2-9-22v-2l-56 1-8 23-1 1h-37l3-10 24-64 26-70z" fill={theme.palette.text.primary}/>
<path transform="translate(780,272)" d="m0 0h41l4 9 14 36 5 16 1 1 14-49 4-13h39l-3 10-15 40-22 58-5 24-5 13-7 9-9 6-10 4h-21l-12-5-8-7 1-5 14-19 4 2 5 4h9l4-4 3-8 2-10v-6l-13-29-19-42-15-34z" fill={theme.palette.text.primary}/>
<path transform="translate(1530,269)" d="m0 0h22l12 3 10 5 7 6 6 10 4 11 1 6v25h-68l3 13 4 5 5 2 13 1 8-3 4-7 21 3 10 2-1 6-5 9-7 8-14 7-8 2-9 1h-15l-16-4-10-5-10-9-6-10-4-12-1-6v-20l3-15 7-14 9-10 11-6 9-3z" fill={theme.palette.text.primary}/>
<path transform="translate(1169,269)" d="m0 0h17l10 3 9 8 5 10 2 9v81l-35 1-1-1-1-69-3-10h-12l-8 7-6 12-1 4-1 56-1 1-35-1v-108h34l1 14 6-8 7-5z" fill={theme.palette.text.primary}/>
<path transform="translate(1809,269)" d="m0 0h24l15 4 10 5 6 7 3 8v7l-6 2-24 4h-6l-3-7-4-2h-8l-4 3 1 6 8 4 24 7 12 6 8 7 4 9 1 4v11l-4 11-8 9-12 6-11 3-11 1h-9l-19-3-9-4-9-6-5-8-1-4v-8l31-5h3l3 7 4 2 11 1 6-2 2-2-1-5-16-6-17-5-11-6-5-4-6-10-2-10 1-11 4-9 7-8 8-5 9-3z" fill={theme.palette.text.primary}/>
<path transform="translate(1896,243)" d="m0 0h34v29h30v27l-30 1 1 48 2 4h7l3-8 1-3 11 3 14 5 1 4-5 13-6 8-9 6-12 3h-12l-13-3-10-7-6-9-3-11-1-53-12-1v-27l13-1z" fill={theme.palette.text.primary}/>
<path transform="translate(1657,214)" d="m0 0h36v167h-35l-1-1z" fill={theme.palette.text.primary}/>
<path transform="translate(1718,272)" d="m0 0h36v108l-4 1h-32z" fill={theme.palette.text.primary}/>
<path transform="translate(1236,272)" d="m0 0h36v108l-4 1h-32z" fill={theme.palette.text.primary}/>
<path transform="translate(1250,214)" d="m0 0h7l8 3 5 5 4 8v9l-4 8-7 6-5 2h-8l-10-5-4-5-3-8 1-9 4-7 8-6z" fill={theme.palette.text.primary}/>
<path transform="translate(1732,214)" d="m0 0 10 1 6 3 7 8 1 3v10l-4 8-7 6-5 2h-8l-10-5-5-6-2-7 1-9 4-7 8-6z" fill={theme.palette.text.primary}/>
<path transform="translate(1019,280)" d="m0 0 2 1 9 25 6 14v2h-30l1-5 11-33z" fill={theme.palette.background.default}/> 
{/* <path transform="translate(1535,295)" d="m0 0h10l5 3 3 4 1 3v8h-29l1-10 6-7z" fill="#FDFEFE"/> */}
</svg>
        </SvgIcon>
        </ThemeProvider>
    )
}
