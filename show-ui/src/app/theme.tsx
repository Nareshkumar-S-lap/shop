'use client';
import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins'; // Import the font

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Define Poppins globally
    h1: {
      fontFamily: 'Poppins, Arial, sans-serif', // Optional: Override for specific variants
    },
    h2: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    // Add other typography variants if needed
  },
});

export default theme;