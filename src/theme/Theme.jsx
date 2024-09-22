import { amber, deepOrange, grey } from "@mui/material/colors";



export const getDesignTokens = (mode) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 2400,
    },
  },
    typography: {
        button: {
          textTransform: 'none'
        },
        

          
          body1: {
            fontSize: '1.2rem',
            '@media (min-width:600px)': {
              fontSize: '0.7rem',
            },
            '@media (min-width:900px)': {
              fontSize: '0.8rem',
            },
          },
  
      },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
                main: '#1976d2',
              },
              secondary: {
                main: '#9c27b0',
              },
              text: {
                primary: '#000',
            },
            background: {
                default: '#ffffff',
              },
            scheduleCard: {
              background: '#e6e6e6'
            },
            scoreColor: 
              ["#000", "#D32F2F", "#F44336", "#FF5722", "#FF7043", "#FF9800", "#FFEB3B", "#AED581", "#81C784", "#66BB6A", "#4CAF50"]
            
              
          }
        : {
            // palette values for dark mode
            primary: {
                main: '#ffffff',
              },
              secondary: {
                main: '#58e1ff',
              },
              text: {
                primary: '#ffffff',
            },
            scheduleCard: {
              background: '#212121'
            },
            scoreColor: 
              ["#fff", "#D32F2F", "#F44336", "#FF5722", "#FF7043", "#FF9800", "#FFEB3B", "#AED581", "#81C784", "#66BB6A", "#4CAF50"]
            
          }),
    },
  });
  
