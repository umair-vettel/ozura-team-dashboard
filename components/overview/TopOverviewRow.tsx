import { Box } from "@mui/material"
import { useSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"
import Countdown from "react-countdown";
import { MerchantStatusContext, MerchantOverviewStatsContext } from "../../pages/overview"
import { lightTheme, darkTheme } from '../../pages/theme';
import { Typography } from "@mui/material";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";
import { ClassNames } from "@emotion/react";


export const MerchantOverviewBox = () => {
  const [merchantData, setMerchantData] = useContext(MerchantStatusContext)
  const [merchantStats, setMerchantStats] = useContext(MerchantOverviewStatsContext)
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

    <Box
      bgcolor="primary.main"
      height="100%"
      width="100%"
      p={3}
      maxHeight={130}
      borderRadius={5}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
<Typography
  variant="h4"
  component="div"
  sx={{ 
    color: 'text.primary', 
    fontWeight: '600',
    fontSize: '1.25rem', 
    fontFamily: 'montserrat',
  }}
>
 Merchant overview
</Typography>     
<Typography
  variant="h4"
  component="div"
  sx={{ 
    color: 'text.primary', 
    fontWeight: '500',
    fontSize: '1rem', 
    fontFamily: 'montserrat',
  }}
>    
     <p>{merchantStats.merchantName}</p>
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={1}
      ></Box>
    </Box>
    </ThemeProvider>
  );
}

export const StatusBox = () => {
  const [merchantData, setMerchantData] = useContext(MerchantStatusContext)
  
  return (
 
    <Box
      bgcolor="primary.main"
      height="100%"
      width="100%"
      p={3}
      maxHeight={130}
      borderRadius={5}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
<Typography
  variant="h4"
  component="div"
  sx={{ 
    color: 'text.primary', 
    fontWeight: '600',
    fontSize: '1.25rem', 
    fontFamily: 'montserrat',
  }}
>
Status
</Typography>
        {merchantData.active ? (
          <span className="bg-emerald-400 mt-2 rounded-2xl w-fit ">
          <p className="text-white text-sm  font-medium p-1 px-2.5">Active</p>
          </span>
        ) : (
          <p className="text-emerald-600">Inactive</p>
        )}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={1}
      ></Box>
    </Box>
    
  );
}

export const DailySpendingLimitBox = () => {
  const [merchantData, setMerchantData] = useContext(MerchantStatusContext)
  

  return (
    <Box
      bgcolor="primary.main"
      height="100%"
      width="100%"
      p={3}
      maxHeight={130}
      borderRadius={5}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
<Typography
  variant="h4"
  component="div"
  sx={{ 
    color: 'text.primary', 
    fontWeight: '600',
    fontSize: '1.25rem', 
    fontFamily: 'montserrat',
  }}
>
Daily spending limit
</Typography>  
<Typography
   variant="h4"
   component="div"
   sx={{ 
     color: 'text.primary', 
     fontWeight: '500',
     fontSize: '1rem', 
     fontFamily: 'montserrat',
  }}
>
${merchantData?.dailySpendingLimit.toLocaleString()}
</Typography>        
   

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={1}
      ></Box>
    </Box>
  );
}

export const TimeLeftTodayBox = () => {
 


  const [nextBatchTime, setNextBatchTime] = useState<number>();

  useEffect(() => {
    const batchTime = new Date(new Date().setUTCHours(0, 0, 0, 0));
    batchTime.setDate(batchTime.getDate() + 1);
    setNextBatchTime(batchTime.valueOf());
  }, []);

  const countdownRender = ({ hours, minutes, seconds, completed } :any) => {
   
    const formatNumber = (num:any) => {
      if (num < 10){
        num = num.toString();
        return "0"+num
      } else {
        return num
      }
    }

    if (completed) {
        // Render a completed statex
        window.location.reload();
    }
    
    return (<span>{formatNumber(hours)} : {formatNumber(minutes)} : {formatNumber(seconds)}</span>);
    
  };
  
  console.log(nextBatchTime)
  

  if (nextBatchTime){
    return (
      <Box
        bgcolor="primary.main"
        height="100%"
        width="100%"
        p={3}
        maxHeight={130}
        borderRadius={5}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
<Typography
  variant="h4"
  component="div"
  sx={{ 
    color: 'text.primary', 
    fontWeight: '600',
    fontSize: '1.25rem', 
    fontFamily: 'montserrat',
  }}
>
Time left today
</Typography>        <div className="text-white">
        <Countdown
              date={nextBatchTime}
              renderer={countdownRender}
          />
        </div>
        
        
        
  
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexGrow={1}
        ></Box>
      </Box>
    );
  }
  

}