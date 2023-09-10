import type { NextPage } from "next";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Select as MuiSelect, MenuItem } from "@mui/material";
import { Switch } from "@mui/material";
import { Typography } from "@mui/material";
import { ThemeContext } from './ThemeContext';
import { lightTheme, darkTheme } from './theme';

import { useSession, getSession, signIn } from "next-auth/react";
import {
  LineChart,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  Label,
} from "recharts";

import Grid from "@mui/material/Unstable_Grid2";
import PuffLoader from "react-spinners/PuffLoader";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

import { Box, Select } from "@mui/material";

import Countdown from "react-countdown";
import { DailyVolumeList } from "../components/analysis/DailyVolumeList";
import { MerchantOverviewStatus } from "../components/analysis/MerchantOverviewStatus";
import { SelectedEntityContext } from "../components/contexts/userContext";

import {
  MerchantOverviewBox,
  StatusBox,
  DailySpendingLimitBox,
  TimeLeftTodayBox,
} from "../components/overview/TopOverviewRow";
import { AverageOrderGraph } from "../components/overview/graphs/Average-Order";
import { TransactionQuantityGraph } from "../components/overview/graphs/Transaction-Quantity";
import { HistoricalVolumeGraph } from "../components/overview/graphs/Historical-Volume";
import { DARSGraph } from "../components/overview/graphs/DARS";

interface PropTypes {}
type merchantData = {
  name: string;
};

// https://react-chartjs-2.js.org/examples/line-chart

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);
const theme = createTheme({
  palette: {
    primary: {
      main: "#251c3d",
    },
    secondary: {
      main: "#494c7d",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #30244f", // Use CSS shorthand for border styling
        },
      },
    },
  },
});

const Days: any = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const Overview: NextPage<PropTypes> = ({}: PropTypes) => {
  const [merchantStats, setMerchantStats]: any = useState();
  const [loadingData, setLoading] = useState<boolean>(false);
  // const [merchantIDValue, setMerchantIDValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const [historicalData, setHistoricalData]: any = useState();
  const [nextBatchTime, setNextBatchTime] = useState<number>();
  const [selectedEntity, setSelectedEntity]: any = useContext(
    SelectedEntityContext
  );
  const [merchantData, setMerchantData]: any = useState();

  const [chartData, setChartData]: any = useState();

  const NA: any = useSession();

  const data02 = [
    { name: "USD", value: 100 },
    { name: "Crypto", value: 0 },
  ];

  const colorMap = {
    USD: "#6fdaa1",
    Crypto: "#5bd8f3",
  };

  useEffect(() => {
    if (!historicalData) {
      return;
    }

    const merchants = Object.keys(historicalData.data);
    const content = historicalData.data[merchants[0]];
    const TwoWeekData = content.Data;

    const todayData = TwoWeekData.pop();
    TwoWeekData.push(todayData);

    const CurrentWeekData = content.Data.slice(7, content.Data.length);

    let thisWeekVolume = 0;
    let thisWeekTransactions = 0;
    for (let i = 0; i < CurrentWeekData.length; i++) {
      thisWeekVolume += Number(CurrentWeekData[i].totalAmount);
      thisWeekTransactions += Number(CurrentWeekData[i].numberOfTransactions);
    }

    let twoWeekVolume = 0;
    let twoWeekTransactions = 0;
    for (let j = 0; j < TwoWeekData.length; j++) {
      twoWeekVolume += Number(TwoWeekData[j].totalAmount);
      twoWeekTransactions += Number(TwoWeekData[j].numberOfTransactions);
    }

    let yesterdayTotalAmount = Number(
      TwoWeekData[TwoWeekData.length - 2]?.totalAmount
    );
    let lastWeekVolume = 0;
    for (let k = TwoWeekData.length - 8; k < TwoWeekData.length - 1; k++) {
      lastWeekVolume += Number(TwoWeekData[k]?.totalAmount);
    }

    const merchantData = {
      merchantName: merchants[0],

      dailyNumOfTransactions: todayData?.numberOfTransactions,
      dailyAverageOrderSize: Number(
        Number(todayData?.dailyAverageOrderSize).toFixed(2)
      ),
      dailyVolume: Number(Number(todayData?.totalAmount).toFixed(2)),

      thisWeekVolume: Number(thisWeekVolume?.toFixed(2)),
      thisWeekTransactions,

      twoWeekVolume: Number(twoWeekVolume.toFixed(2)),
      twoWeekTransactions: Number(twoWeekTransactions),

      totalAmount: Number(Number(todayData?.totalAmount).toFixed(2)),

      dailyVolumeChange:
        yesterdayTotalAmount !== 0
          ? ((todayData?.totalAmount - yesterdayTotalAmount) /
              yesterdayTotalAmount) *
            100
          : 0,
      thisWeekVolumeChange:
        lastWeekVolume !== 0
          ? ((thisWeekVolume - lastWeekVolume) / lastWeekVolume) * 100
          : 0,
    };

    setMerchantStats(merchantData);
  }, [historicalData]);

  const getMerchantStatusData = async () => {
    await fetch("/api/getMerchantData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        merchantID: selectedEntity?.merchantID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMerchantData(data);
        }
      });
  };
  const getAllChartData = async () => {
    if (loadingData || NA.status !== "authenticated") {
      return;
    }

    setLoading(true);

    await fetch("/api/getTxChartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        merchantID: selectedEntity?.merchantID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setLoading(false);
          setHistoricalData(data);

          formatChartData(data.data);
          console.log(data.data);
          return data;
        }
      });
  };

  const formatChartData = (input: any) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayNumbers = [0, 1, 2, 3, 4, 5, 6];

    const today = new Date().getUTCDay();

    while (dayNumbers[0] !== today) {
      const currentDayNumber: any = dayNumbers.shift();
      const currentDayName: any = dayNames.shift();

      dayNumbers.push(currentDayNumber);
      dayNames.push(currentDayName);
    }
    const currentDayNumber: any = dayNumbers.shift();
    const currentDayName: any = dayNames.shift();

    dayNumbers.push(currentDayNumber);
    dayNames.push(currentDayName);

    const merchants = Object.keys(input);
    const content = input[merchants[0]];

    const CurrentWeekVolumeData = content.Data.slice(
      7,
      content.Data.length
    ).map((data: any) => data.totalAmount);
    const LastWeekVolumeData = content.Data.slice(0, 7).map(
      (data: any) => data.totalAmount
    );

    const formattedVolumeData = dayNames.map((dayName, index) => {
      return {
        date: dayName,
        thisWeekTransactionAmount: CurrentWeekVolumeData[index],
        twoWeekTransactionAmount: LastWeekVolumeData[index],
      };
    });

    const CurrentWeekAverageOrderData = content.Data.slice(
      7,
      content.Data.length
    ).map((data: any) => data.dailyAverageOrderSize);
    const LastWeekAverageOrderData = content.Data.slice(0, 7).map(
      (data: any) => data.dailyAverageOrderSize
    );

    const formattedAverageOrderData = dayNames.map((dayName, index) => {
      return {
        date: dayName,
        thisWeekAverageOrderAmount: CurrentWeekAverageOrderData[index],
        twoWeekAverageOrderAmount: LastWeekAverageOrderData[index],
      };
    });

    const CurrentWeekTransactionQtyData = content.Data.slice(
      7,
      content.Data.length
    ).map((data: any) => data.numberOfTransactions);
    const LastWeekTransactionQtyData = content.Data.slice(0, 7).map(
      (data: any) => data.numberOfTransactions
    );

    const formattedTransactionQtyData = dayNames.map((dayName, index) => {
      return {
        date: dayName,
        thisWeekTransactionQtyAmount: CurrentWeekTransactionQtyData[index],
        twoWeekTransactionQtyAmount: LastWeekTransactionQtyData[index],
      };
    });

    setChartData({
      Volume: formattedVolumeData,
      AverageOrder: formattedAverageOrderData,
      TransactionQuantity: formattedTransactionQtyData,
    });
  };

  useEffect(() => {
    if (selectedEntity) {
      getAllChartData();
      getMerchantStatusData();
    }
  }, [selectedEntity]);

  //TOP ROW

  function abbreviateNumber(value: any) {
    let abbrev = "";

    if (value >= 1.0e12) {
      abbrev = (value / 1.0e12).toFixed(2) + "T";
    } else if (value >= 1.0e9) {
      abbrev = (value / 1.0e9).toFixed(2) + "B";
    } else if (value >= 1.0e6) {
      abbrev = (value / 1.0e6).toFixed(2) + "M";
    } else if (value >= 1.0e3) {
      abbrev = (value / 1.0e3).toFixed(2) + "K";
    } else {
      abbrev = value;
    }

    return abbrev;
  }

  const [selectedOption, setSelectedOption] = useState("today");

  let volumeToday, volumeChangeToday, volumeThisWeek, volumeChangeThisWeek;

  if (selectedOption === "today") {
    volumeToday = abbreviateNumber(
      Number(merchantStats?.totalAmount?.toFixed(2))
    );
    volumeChangeToday = merchantStats?.dailyVolumeChange;
  } else if (selectedOption === "thisWeek") {
    volumeThisWeek = abbreviateNumber(
      Number(merchantStats?.thisWeekVolume?.toFixed(2))
    );

    volumeChangeThisWeek = merchantStats?.thisWeekVolumeChange;

    let lastWeekVolume = 0;
    if (historicalData.length > 7) {
      for (let i = 7; i < 14; i++) {
        lastWeekVolume += Number(historicalData[i]?.totalAmount);
      }
    }

    const yesterdayTotalAmount =
      historicalData.length > 1 ? Number(historicalData[1]?.totalAmount) : 0;
  }

  function renderTodayChange() {
    return `${
      merchantStats.dailyVolumeChange >= 0 ? "+" : ""
    }${merchantStats.dailyVolumeChange?.toFixed(2)}%`;
  }

  function renderThisWeekChange() {
    return `${
      merchantStats.thisWeekVolumeChange >= 0 ? "+" : ""
    }${merchantStats.thisWeekVolumeChange?.toFixed(2)}%`;
  }

  let volume;
  if (selectedOption === "today") {
    volume = Number(merchantStats?.totalAmount?.toFixed(2)).toLocaleString();
  } else if (selectedOption === "thisWeek") {
    volume = Number(merchantStats?.thisWeekVolume?.toFixed(2)).toLocaleString();
  }

  function renderChange(volumeChange: number) {
    return `${volumeChange >= 0 ? "+" : ""}${volumeChange?.toFixed(2)}%`;
  }

  function getChangeColor(volumeChange: number) {
    return volumeChange >= 0
      ? "bg-emerald-400 text-emerald-700"
      : "bg-red-400 text-red-700";
  }

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

  const StyledMenuItem = (props: any) => (
    <MenuItem
      {...props}
      sx={{
        color: "white",
        fontWeight: "semibold",
        fontFamily: "Montserrat, sans-serif",
        backgroundColor: "#1F1733",
        "&:hover": {
          backgroundColor: "#2B1E49",
        },
        "&.Mui-selected": {
          backgroundColor: "#19132a",
        },
      }}
    />
  );

  const [selectedTransactionOption, setSelectedTransactionOption] =
    useState("today");

  let transactionsToday,
    transactionsChangeToday,
    transactionsThisWeek,
    transactionsChangeThisWeek;

  if (selectedTransactionOption === "24hr") {
    transactionsToday = abbreviateNumber(
      Number(merchantStats?.totalTransactions?.toFixed(2))
    );
    transactionsChangeToday = merchantStats?.dailyTransactionChange;
  } else if (selectedTransactionOption === "thisWeek") {
    transactionsThisWeek = abbreviateNumber(
      Number(merchantStats?.thisWeekTransactions?.toFixed(2))
    );

    transactionsChangeThisWeek = merchantStats?.thisWeekTransactionChange;
  }

  if (merchantStats) {
    return (
    
      <>
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>

<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
<div style={{backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default, zIndex: -1}}>
   
        <HistoricalDataContext.Provider
          value={[historicalData, setHistoricalData]}
        >
          <MerchantStatusContext.Provider
            value={[merchantData, setMerchantData]}
          >
            <MerchantOverviewStatsContext.Provider
              value={[merchantStats, setMerchantStats]}
            >
              <ChartDataContext.Provider value={[chartData, setChartData]}>
                <div className="min-h-screen w-full pl-12 mx-auto">

            
                    <Grid
                      container
                      rowSpacing={4}
                      columnSpacing={3}
                      spacing={4}
                    >
                      <Grid xs={3}>
                        <MerchantOverviewBox />
                      </Grid>

                      <Grid xs={3}>
                        <StatusBox />
                      </Grid>

                      <Grid xs={3}>
                        <DailySpendingLimitBox />
                      </Grid>

                      <Grid xs={3}>
                        <TimeLeftTodayBox />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      rowSpacing={8}
                      columnSpacing={3}
                      spacing={4}
                    >
                      <Grid xs={4}>
                        <DARSGraph />
                      </Grid>

                      <Grid xs={4}>
                        <TransactionQuantityGraph />
                      </Grid>

                      <Grid xs={4}>
                        <AverageOrderGraph />
                      </Grid>
                    </Grid>

                    {/* //MIDDLE ROW */}

                    <Grid
                      container
                      rowSpacing={5}
                      columnSpacing={3}
                      minHeight={250}
                    >
                      {/* SALES BY CURRENCY BOX  */}

                      <Grid xs={3}>
                        <Box
                          bgcolor="primary.main"
                          height="100%"
                          width="100%"
                          p={3}
                          minHeight={250}
                          borderRadius={8}
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
  Sales (by currency)
</Typography>

                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            maxHeight={250}
                          >
                            <PieChart width={350} height={350}>
                              <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data02}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                fill="none"
                                label
                                stroke="#251C3D"
                              >
                                {data02.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={colorMap[entry.name]}
                                  />
                                ))}
                                
                                <Label
                                  value={`$${
                                    selectedOption === "today"
                                      ? volumeToday
                                      : volumeThisWeek
                                  }`}
                                  position="center"
                                  style={{
                                    fill: "#fff",
                                    fontFamily: "Montserrat",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                  }}
                                />
                              </Pie>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#1F1733",
                                  borderColor: "#4f4761",
                                  borderRadius: "10px",
                                }}
                                labelStyle={{
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                                itemStyle={{ color: "white" }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          <Box display="flex" justifyContent="center">
                            <Box
                              display="flex"
                              alignItems="center"
                              marginRight={2}
                            >
                              <div
                                style={{
                                  width: 10,
                                  height: 10,
                                  backgroundColor: "#6FD9A0",
                                  borderRadius: "50%",
                                  marginRight: 4,
                                }}
                              ></div>
                              <span className="text-white font-regular text-sm">
                                USD
                              </span>
                            </Box>

                            <Box display="flex" alignItems="center">
                              <div
                                style={{
                                  width: 10,
                                  height: 10,
                                  backgroundColor: "#5BD8F3",
                                  borderRadius: "50%",
                                  marginRight: 4,
                                }}
                              ></div>
                              <span className="text-white font-regular text-sm">
                                Crypto
                              </span>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      {/* VOLUME BOX */}

                      <Grid xs={3}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          height="100%"
                          justifyContent="space-between"
                        >
                          <Box
                            bgcolor="primary.main"
                            height="calc(50% - 12px)"
                            width="100%"
                            p={3}
                            borderRadius={8}
                            position="relative"
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
  Volume
</Typography>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1.5rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
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
>                                  $
                                  {selectedOption === "today"
                                    ? volumeToday
                                    : volumeThisWeek}
</Typography>
                                <div
                                  className={`text-xs font-montserrat font-semibold px-2 py-1 ml-2 rounded-full ${getChangeColor(
                                    selectedOption === "today"
                                      ? volumeChangeToday
                                      : volumeChangeThisWeek
                                  )}`}
                                >
                                  {renderChange(
                                    selectedOption === "today"
                                      ? volumeChangeToday
                                      : volumeChangeThisWeek
                                  )}
                                </div>
                              </div>
                            </div>
                            <StyledSelect
                              value={selectedOption}
                              onChange={(e: any) =>
                                setSelectedOption(e.target.value)
                              }
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "12px",
                              }}
                              MenuProps={{
                                sx: {
                                  ".MuiPaper-root": {
                                    backgroundColor: "#1F1733",
                                  },
                                },
                              }}
                            >
                              <StyledMenuItem value="today">
                                Today
                              </StyledMenuItem>
                              <StyledMenuItem value="thisWeek">
                                This Week
                              </StyledMenuItem>
                            </StyledSelect>
                          </Box>

                          {/* Average Order  */}

                          <Box
                            bgcolor="primary.main"
                            height="calc(50% - 12px)"
                            width="100%"
                            p={3}
                            borderRadius={8}
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
>                              Average order value
                            </Typography>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "1.5rem",
                              }}
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
>                                    $
                                {Number(
                                  merchantStats?.dailyAverageOrderSize?.toFixed(
                                    2
                                  )
                                ).toLocaleString()}
                              </Typography>
                            </div>
                          </Box>
                        </Box>
                      </Grid>

                      {/* HISTORICAL VOLUME */}

                      <Grid xs={6}>
                        <HistoricalVolumeGraph />
                      </Grid>
                    </Grid>

                    {/* //BOTTOM ROW  */}

                    <Grid
                      container
                      rowSpacing={5}
                      columnSpacing={3}
                      minHeight={280}
                    >
                      <Grid xs={12}>
                        <Box
                          bgcolor="primary.main"
                          height="100%"
                          width="100%"
                          p={3}
                          minHeight={280}
                          maxHeight={360}
                          borderRadius={8}
                        >
                          <div className="text-white font-medium text-xl">
                            Recent transactions
                          </div>
                          <DailyVolumeList />
                        </Box>
                      </Grid>
                    </Grid>
                    </div>
              
              </ChartDataContext.Provider>
            </MerchantOverviewStatsContext.Provider>
          </MerchantStatusContext.Provider>
        </HistoricalDataContext.Provider>
        </div>
        </ThemeProvider>
                  </ThemeContext.Provider>
                 

           
              
      </>
     
    );
  } else if (NA.status !== "authenticated") {
    return (
      <div className="min-h-screen px-4 sm:px-6 py-24 grid md:place-items-center lg:px-8 my-auto">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Welcome
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-200 tracking-tight sm:text-5xl">
                  Login to Continue
                </h1>
                <p className="mt-1 text-base text-gray-400">
                  This page is not available.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <a onClick={() => signIn()}>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-pink-600">
                    Login
                  </button>
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  } else {
    <PuffLoader />;
  }
};

export const ChartDataContext = createContext<any>(null);
export const MerchantOverviewStatsContext = createContext<any>(null);
export const HistoricalDataContext = createContext<any>(null);
export const MerchantStatusContext = createContext<any>(null);

export default Overview;
