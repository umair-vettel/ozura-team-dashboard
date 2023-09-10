import { Grid, Box } from "@mui/material";
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

import { styled } from "@mui/system";
import { Select as MuiSelect, MenuItem } from "@mui/material";
import { Typography } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import {
  MerchantOverviewStatsContext,
  ChartDataContext,
} from "../../../pages/overview";
import { SelectedEntityContext } from "../../contexts/userContext";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";







const HoursLabel: string[] = ["<1", "1", "2", '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

export const DARSGraph = () => {
    const [selectedEntity, setSelectedEntity]:any = useContext(SelectedEntityContext);
  const [merchantStats, setMerchantStats] = useContext(
    MerchantOverviewStatsContext
  );
  const [chartData, setChartData] = useContext(ChartDataContext);


  const [selectedTransactionOption, setSelectedTransactionOption] = useState(
    "a"
  );
  const [chartTicks, setChartTicks]: any[] = useState([]);

  const [HourlyTransactions, setHourlyTransactions]: any[] = useState();
  const [numberOfTransactions, setNumberOfTransactions]:any = useState(0)


  const reformatDataForThisWeek = (data: any[]) => {
    return data.map((item: any) => ({
      date: item.date,
      thisWeekTransactionQtyAmount: item.thisWeekTransactionQtyAmount,
    }));
  };

  const [historicalData, setHistoricalData] = useState([]);
  const [todayData,  ] = useState([]);

  const get24HourTotal = (input: any) => {
    let total: any = 0;

    const values = Object.values(input);
    values.forEach((num: any) => {
      total += num.hourlyTransactions;
    });

    return total;
  };




  const [transactionsChangeToday, setTransactionsChangeToday]: Number = useState();

  const [transactionsChangeThisWeek, setTransactionsChangeThisWeek]: Number = useState();
  useEffect(() => {

    if (selectedTransactionOption === "24hr" && chartData) {

      const todayTxQty = chartData?.TransactionQuantity[chartData?.TransactionQuantity?.length-1]?.thisWeekTransactionQtyAmount
      const yesterdayTxQty = chartData?.TransactionQuantity[chartData?.TransactionQuantity?.length-2]?.thisWeekTransactionQtyAmount
      
      const change = Number(((todayTxQty/yesterdayTxQty)*100).toFixed(2))
      console.log(change)
      
      setTransactionsChangeToday(change)
      
    } else if (selectedTransactionOption === "thisWeek") {
      const thisWeekTxQty = merchantStats.thisWeekTransactions
      const lastWeekTxQty = merchantStats.twoWeekTransactions - thisWeekTxQty
      console.log({thisWeekTxQty, lastWeekTxQty})

      const change = Number(((1-(lastWeekTxQty/thisWeekTxQty))*100).toFixed(2))
      
      setTransactionsChangeThisWeek(change)
    }

  }, [chartData, merchantStats, selectedTransactionOption])
  
    
    console.log(merchantStats)
  useEffect(() => {
    if (!chartData?.TransactionQuantity) {
      return;
    }

    setNumberOfTransactions(merchantStats.thisWeekTransactions)
        var maxValue = Math.max(
          ...chartData?.TransactionQuantity.map((item: {thisWeekTransactionAmount: number, twoWeekTransactionAmount: number}) => Math.max(item.thisWeekTransactionAmount, item.twoWeekTransactionAmount))
        );
    const domainMax = maxValue + (maxValue * 0.1);
        
    const numberOfTicks = 5;
    const tickValue = Math.ceil(domainMax / (numberOfTicks - 1) / 5000) * 5000;
    const ticks = Array.from({length: numberOfTicks}, (_, i) => i * tickValue);
    setChartTicks(ticks)


    const reformatDataForThisWeek = (data: any[]) => {
      return data.map((item: any) => ({
        date: item.date,
        thisWeekTransactionQtyAmount: item.thisWeekTransactionQtyAmount,
      }));
    };
  
  
  }, [chartData, selectedTransactionOption, HourlyTransactions]);

  const fetchTXperHour = async () => {
    await fetch("/api/transactions/getTransactionsPerHour", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchantID: selectedEntity?.merchantID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          const formattedHourlyQtyData = HoursLabel.map(
            (hour: any, index: number) => {
              return {
                hour,
                hourlyTransactions: data.data[index],
              };
            }
          );

          setHourlyTransactions(formattedHourlyQtyData);
          setSelectedTransactionOption("24hr");
        }
      });
  };
  const calculateDomainAndTicks = (
    data: Array<number>,
    numberOfTicks: number
  ) => {
    const maxValue = Math.max(...data);
    const domainMax = maxValue + maxValue * 0.1;
    const tickValue = Math.ceil(domainMax / (numberOfTicks - 1) / 5000) * 5000;
    const ticks = Array.from(
      { length: numberOfTicks },
      (_, i) => i * tickValue
    );

    return { domainMax, ticks };
  };
  const { domainMax, ticks } = calculateDomainAndTicks(
    chartData.Volume.map((item) => item.thisWeekTransactionAmount),
    5
  );

  useEffect(() => {
    fetchTXperHour();
  }, []);
    
function getChangeColor(volumeChange:number) {
  if (selectedTransactionOption === "24hr") {
    return transactionsChangeToday >= 0
    ? "bg-emerald-400 text-emerald-700"
    : "bg-red-400 text-red-700";
  } else {
    return transactionsChangeThisWeek >= 0
    ? "bg-emerald-400 text-emerald-700"
    : "bg-red-400 text-red-700";
  }
  
}

useEffect(() => {
  if (!chartData?.TransactionQuantity) {
    return;
  }

  switch (selectedTransactionOption) {
    case "24hr":
      if (HourlyTransactions) {
        const total = get24HourTotal(HourlyTransactions);
        setNumberOfTransactions(total);
        var maxValue = Math.max(HourlyTransactions.hourlyTransactions);
      }

      break;
    case "thisWeek":
      setNumberOfTransactions(merchantStats.thisWeekTransactions);
      var maxValue = Math.max(
        ...chartData?.TransactionQuantity.map(
          (item: {
            thisWeekTransactionAmount: number;
            twoWeekTransactionAmount: number;
          }) =>
            Math.max(
              item.thisWeekTransactionAmount,
              item.twoWeekTransactionAmount
            )
        )
      );
      break;
}});
function renderChange() {
  if (selectedTransactionOption === "24hr") {
    return `${transactionsChangeToday >= 0 ? "+" : ""}${transactionsChangeToday?.toFixed(2)}%`;
  } else {
    return `${transactionsChangeThisWeek >= 0 ? "+" : ""}${transactionsChangeThisWeek?.toFixed(2)}%`;
  }
}


  if (!chartData?.TransactionQuantity) {
    return <div>Loading</div>;
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
  const [darkMode, setDarkMode] = useState(false);


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
  justifyContent="flex-start"
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
 DARs
</Typography>  
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
>      
      {numberOfTransactions.toLocaleString()}
    </Typography>
    <div
      className={`text-xs font-montserrat font-semibold px-2 py-1 ml-2 rounded-full ${getChangeColor()}`}
    >
      {renderChange()}
      </div>
      </div>
   

      <StyledSelect
        value={selectedTransactionOption}
        onChange={(e: any) => setSelectedTransactionOption(e.target.value)}
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
      </StyledSelect>
      <Box mt={4}> 

      <ResponsiveContainer width="100%" height={120} >
        {selectedTransactionOption == "24hr" ? (
          <LineChart
            data={HourlyTransactions}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" stroke="#7c65b1" />
            <XAxis
              dataKey="hour"
              tick={{ fill: "#634aa4", fontSize: 9, fontWeight: "semibold" }}
              stroke="#30244f"
              interval={0}
              tickSize={1}
            />
            <YAxis
              tick={{ fill: "#634aa4", fontSize: 12, fontWeight: "semibold" }}
              domain={[
                0,
                Math.max(HourlyTransactions.hourlyTransactions) * 1.1,
              ]}
              stroke="#30244f"
              width={30}
              tickSize={1}
              interval={0}
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
                };
                const formattedValue = `$${new Intl.NumberFormat().format(
                  value
                )}`;
                return [formattedValue, labels[name]];
              }}
            />
            <Line
              type="monotone"
              dataKey="hourlyTransactions"
              stroke="#5BD8F3"
              dot={false}
              strokeWidth={2} 

            />
          </LineChart>
        ) : (

          <LineChart
          data={reformatDataForThisWeek(chartData.TransactionQuantity)}
          margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" stroke="#7c65b1" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#634aa4", fontSize: 12, fontWeight: "semibold" }}
              stroke="#30244f"
              interval={0}
              tickSize={5}
            />
            <Line
              type="monotone"
              dataKey="thisWeekTransactionQtyAmount"
              stroke="#f47f31"
              dot={false}
              strokeWidth={2} 

            />
            <YAxis
              tick={{ fill: "#634aa4", fontSize: 12, fontWeight: "semibold" }}
              domain={["auto", "auto"]}
              stroke="#30244f"
              width={50}
              height={100}
              tickSize={3}
              interval={0}
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
                const labels: {
                  thisWeekTransactionQtyAmount: string;
                } = {
                  thisWeekTransactionQtyAmount: "Current week",
                };
                const formattedValue = `${new Intl.NumberFormat().format(
                  value
                )}`;
                return [formattedValue, labels[name]];
              }}
            />

            <Line type="monotone" dataKey="" stroke="#f47f31" dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
      </Box>

    </Box>
   </ThemeProvider>
  );
};
