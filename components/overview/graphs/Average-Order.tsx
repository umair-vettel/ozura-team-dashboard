import { Grid, Box, Select } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { lightTheme, darkTheme } from '../../../pages/theme';
import { Typography } from "@mui/material";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";

import { useContext, useState } from "react";
import { MerchantOverviewStatsContext, ChartDataContext } from "../../../pages/overview";
import { styled } from "@mui/system";
import { Select as MuiSelect, MenuItem } from "@mui/material";



export const AverageOrderGraph = () => {
    const [merchantStats, setMerchantStats] = useContext(MerchantOverviewStatsContext)
    const [chartData, setChartData] = useContext(ChartDataContext)

    if (!chartData?.AverageOrder){
       return <div>Loading</div> 
    }


    const [darkMode, setDarkMode] = useState(false);

    const getWeeklyChartData = (input: any) => {
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const merchants = Object.keys(input);
      const content = input[merchants[0]];
      const CurrentWeekVolumeData = content.Data.slice(
        7,
        content.Data.length
      ).map((data: any) => data.totalAmount);
    
      const formattedVolumeData = dayNames.map((dayName, index) => {
        return {
          date: dayName,
          volume: CurrentWeekVolumeData[index],
        };
      });
    
      setChartData(formattedVolumeData); // Set this week's chart data to the state
    };
    

    const StyledSelect = styled(MuiSelect)({
      color: "#503c85",
      width: "120px",
      fontSize: "0.8rem",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
  
      textAlign: "right",
      "& .MuiSvgIcon-root": {
        color: "#503c85",
        fontSize: "1.2rem",
      },
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "transparent",
        },
        "&:hover fieldset": {
          borderColor: "transparent",
        },
        "&.Mui-focused fieldset": {
          borderColor: "transparent",
          boxShadow: "none",
        },
      },
    });

    return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

      <Box
        bgcolor="primary.main"
        height="100%" 
        width="100%"
        p={3}
        borderRadius={8}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        position="relative"
        overflow="hidden" 
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
 Average order value
</Typography>       
 <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexGrow={1}
        >
 <Typography
  variant="h4"
  component="div"
  sx={{ 
    color: 'text.primary', 
    fontWeight: 'bold',
    fontSize: '1.8rem', 
    fontFamily: 'montserrat',
  }}
>                 ${merchantStats?.dailyAverageOrderSize.toLocaleString()}
          </Typography>
        </Box>
        {/* <StyledSelect
          value={selectedOrderValueOption}
          onChange={(e: any) => setSelectedOrderValueOption(e.target.value)}
          style={{ position: "absolute", top: "5px", right: "12px" }}
          MenuProps={{
            sx: {
              ".MuiPaper-root": {
                backgroundColor: "#1F1733",
              },
            },
          }}
        >
          <StyledMenuItem value="24hr">24 Hours</StyledMenuItem>
          <StyledMenuItem value="thisWeek">This Week</StyledMenuItem>
        </StyledSelect> */}
     
      </Box>
      </ThemeProvider>
    );
    
};
