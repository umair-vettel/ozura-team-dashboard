import { Grid, Box } from "@mui/material";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { styled } from "@mui/system";
import { Select as MuiSelect, MenuItem } from "@mui/material";
import { useState } from "react";
import { AverageOrderGraph } from "./graphs/Average-Order";
import { TransactionQuantityGraph } from "./graphs/Transaction-Quantity";

const [selectedTransactionOption, setSelectedTransactionOption] =
    useState("today");

export const MiddleOverviewRow = () => {

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

      const StyledMenuItem = (props:any) => (
        <MenuItem
        {...props}
        sx={{
          color: 'white', 
          fontWeight: 'semibold', 
          fontFamily: 'Montserrat, sans-serif', 
          backgroundColor: '#1F1733', 
          '&:hover': {
            backgroundColor: '#2B1E49', 
          },
          '&.Mui-selected': {
            backgroundColor: '#19132a',
          },
        }}
      />
    );

    return ( 
        <Grid container rowSpacing={8} columnSpacing={3} spacing={4} maxHeight={50}>
                  
                  <TransactionQuantityGraph />

                  <TransactionQuantityGraph />


                  <AverageOrderGraph />


                </Grid>
    )
}