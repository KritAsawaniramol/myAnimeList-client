import { createContext, useContext } from "react";
import { createTheme } from '@mui/material';
import { useColorTheme } from './use-color-theme';
export const ThemeContext = createContext({
    mode: 'light',
    toggleColorMode: () => { },
    theme: createTheme(),
})

export const useThemeContext = () => {
    // console.log(ThemeContext);
    return useContext(ThemeContext)
}

export const  ThemeContextProvider = ({ children }) => {
    const value = useColorTheme();
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}