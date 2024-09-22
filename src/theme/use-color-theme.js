import React from "react";
import { createTheme, responsiveFontSizes  } from '@mui/material';
import { getDesignTokens} from './Theme';
import Cookies from 'js-cookie';

export const useColorTheme = () => {
  const initMode = Cookies.get("mode")
  const [mode, setMode] = React.useState(initMode ? initMode : "light");
  Cookies.set("mode", mode)



  const toggleColorMode = () =>
    setMode((preMode) => (preMode === "light" ? "dark" : "light"));

  const modifiedTheme = React.useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
