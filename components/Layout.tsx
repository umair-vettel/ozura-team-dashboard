import Head from "next/head";
import Sidebar from "./Sidebar";

import { useSession } from "next-auth/react"
import { lightTheme, darkTheme } from '../pages/theme';
import { ThemeContext } from '../pages/ThemeContext';
import { useContext, useState } from "react";
import Script from "next/script";
import { ThemeProvider } from '@mui/material/styles';
import { Box, Select } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
    


  const [darkMode, setDarkMode] = useState(false);


  

  return (
    <div className="max-h-screen w-full">
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <Box
          sx={{
            backgroundColor: theme =>
              theme.palette.background.default, 
            zIndex: -1,
            height: '100vh',
            width: '100vw',
          }}
        >
        
        
 
        <div className="w-full pr-10 pt-8 h-full absolute left-0 top-0 z-10">
      <Head>
        <title>Ozura</title>
        <meta name="description" content="Ozura Hub" />
        <link rel="icon" href="/OZCurrencyAmount.png" />
      </Head>
      <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-PRFT9D346S"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-N6DWPWDXMG');
      `}
          </Script>



      <div className="md:flex w-full">
        <div className="flex-none">
          <Sidebar />
        </div>
      
          <div className="md:grow">
          {children}
          </div>
      </div>
    </div>

    </Box>

  
    </ThemeProvider>
    </div>
  );
}
