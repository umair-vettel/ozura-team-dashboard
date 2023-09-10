import { Grid, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartDataContext, MerchantOverviewStatsContext } from "../../../pages/overview";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";

import { Typography } from "@mui/material";
import { ThemeContext } from '../../../pages/ThemeContext';
import { lightTheme, darkTheme } from '../../../pages/theme';
import { Switch } from '@mui/material';



export const HistoricalVolumeGraph = () => {
  const [merchantStats, setMerchantStats] = useContext(MerchantOverviewStatsContext)
  const [chartData, setChartData] = useContext(ChartDataContext)

  const [chartTicks, setChartTicks]: any[] = useState([]);
  const [domainMax, setDomainMax]: any = useState();

  function getChangeColor(volumeChange:number) {
    return volumeChange >= 0
      ? "bg-emerald-400 text-emerald-700"
      : "bg-red-400 text-red-700";
  }

  

  function renderThisWeekChange() {
    return `${
      merchantStats.thisWeekVolumeChange >= 0 ? "+" : ""
    }${merchantStats.thisWeekVolumeChange?.toFixed(2)}%`;
  }
 


  
  useEffect(() => {
    if (!chartData?.Volume) {
      return;
    }
    const maxValue = Math.max(
      ...chartData?.Volume.map((item: {thisWeekTransactionAmount: number, twoWeekTransactionAmount: number}) => Math.max(item.thisWeekTransactionAmount, item.twoWeekTransactionAmount))
    );
    
    setDomainMax(maxValue + (maxValue * 0.1));
      
    const numberOfTicks = 5;
    const tickValue = Math.ceil(domainMax / (numberOfTicks - 1) / 5000) * 5000;
    const ticks = Array.from({length: numberOfTicks}, (_, i) => i * tickValue);
    setChartTicks(ticks)
  
  }, [chartData]);

  const [darkMode, setDarkMode] = useState(false);


  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

    <Box
      bgcolor="primary.main"
      height="100%"
      width="100%"
      p={3}
      minHeight={350}
      borderRadius={8}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div className="flex items-center">
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
  Historical Volume
</Typography>
          <div
            className={`text-xs font-montserrat font-semibold px-2 py-1 ml-2 rounded-full ${getChangeColor(
              merchantStats?.thisWeekVolumeChange
            )}`}
          >
            {renderThisWeekChange()}
          </div>
        </div>
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginRight={2}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: "#f47f31",
                borderRadius: "50%",
                marginRight: 4,
              }}
            ></div>
              <Typography
  variant="h4"
  component="div"
  sx={{ 
    color: 'text.primary', 
    fontWeight: 'medium',
    fontSize: '.9rem', 
    fontFamily: 'montserrat',
  }}
>
  This week
</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: "#ed1c91",
                borderRadius: "50%",
                marginRight: 4,
              }}
            ></div>
 <Typography
  variant="h4"
  component="div"
  sx={{ 
    color: 'text.primary', 
    fontWeight: 'medium',
    fontSize: '.9rem', 
    fontFamily: 'montserrat',
  }}
>
  Last week
</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={1}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData.Volume}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" stroke="#7c65b1" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#634aa4", fontSize: 12, fontWeight: "semibold" }}
              stroke="#30244f"
              interval={0}
              tickSize={5}
              height={30}
            />
            <YAxis
              tick={{ fill: "#634aa4", fontSize: 12, fontWeight: "semibold" }}
              domain={[0, domainMax]}
              stroke="#30244f"
              width={30}
              tickSize={3}
              interval={0}
              ticks={chartTicks}
              tickFormatter={(value) => {
                return value >= 1000 ? `${value / 1000}k` : value;
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F1733",
                borderColor: "#4f4761",
                borderRadius: "10px",
              }}
              labelStyle={{ color: "white", fontWeight: "bold" }}
              itemStyle={{ color: "white" }}
              formatter={(value, name, props) => {
                const labels = {
                  thisWeekTransactionAmount: "Current week",
                  twoWeekTransactionAmount: "Last week",
                };
                const formattedValue = `$${new Intl.NumberFormat().format(
                  value
                )}`;
                return [formattedValue, labels[name]];
              }}
            />
            <Line
              type="monotone"
              dataKey="thisWeekTransactionAmount"
              stroke="#f47f31"
              dot={false}
              strokeWidth={2} 
            />
            <Line
              type="monotone"
              dataKey="twoWeekTransactionAmount"
              stroke="#ed1c91"
              dot={false}
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      
    </Box>
    </ThemeProvider>


  );
};
function getChangeColor(thisWeekVolumeChange: any) {
  throw new Error("Function not implemented.");
}

function renderThisWeekChange(): import("react").ReactNode {
  throw new Error("Function not implemented.");
}

