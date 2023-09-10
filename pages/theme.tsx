import { createTheme } from '@mui/material/styles';
import React, { createContext, useContext, useEffect, useState } from "react";



export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f2effa',
    },
    background: {
      default: '#dfdceb',
      paper: '#ffffff',
    },
    text: {
      primary: '#503C85',
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#8771bf', 
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#251C3D',
    },
    background: {
      default: '#191427',
      paper: '#251C3D',
    },
    text: {
      primary: '#ffffff',
    },
  },
});


export const ThemeContext = createContext();
