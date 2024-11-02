import { createTheme, responsiveFontSizes  } from '@mui/material';
import { getDesignTokens} from './Theme';
import Cookies from 'js-cookie';
import { useMemo, useState } from 'react';

export const useColorTheme = () => {
  const initMode = Cookies.get("mode")

  const [mode, setMode] = useState(initMode ? initMode : "light");
  Cookies.set("mode", mode)

  const toggleColorMode = () =>
    setMode((preMode) => (preMode === "light" ? "dark" : "light"));

  const designTokens = getDesignTokens(mode)
  const modifiedTheme = useMemo(
    () => responsiveFontSizes(createTheme(designTokens)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
