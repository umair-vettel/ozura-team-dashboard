import { useContext, useEffect, useState } from "react";
import { SelectedEntityContext } from "../contexts/userContext";

import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  IconButton
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Skeleton } from "@mui/lab";

const cellStyle = {
  color: "white",
  fontFamily: "Montserrat",
  fontWeight: 400,
  border: "none",
  borderBottom: "none",
  borderTop: 'none',
};
const rowStyle = { borderBottom: "none", borderTop: 'none', border: "transparent" }; 
const combinedStyle = { ...cellStyle, ...rowStyle };
const headerCellStyle = {
  ...combinedStyle,
  color: "#503C85",
  position: "sticky",
  top: 0,
  backgroundColor: "#251C3D",
  fontWeight: 500,
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#251c3d",
    },
    secondary: {
      main: "#494c7d",
    },
  },
});

export default function Component() {
  const tableRows = [1, 2, 3]; 

  return (
    <div className="h-screen w-full pl-12 mx-auto">
      <ThemeProvider theme={theme}>
      <Box
  bgcolor="primary.main"
  height="30%"
  width="100%"
  borderRadius={5}
  display="flex"
  flexDirection="column"
  justifyContent="start "
  className="w-full"
  mb={2}
>
  <div className="pl-8 pt-8 pb-4">
<div className="text-sidebartext font-montserrat">
    View customer information
  </div>
  <div className="text-white font-medium text-xl font-montserrat">
    John Smith
  </div>
  </div>

  <Grid container rowSpacing={2} columnSpacing={2} spacing={4}>
    <Grid item xs={12} md={6}>
      <div className="pl-8 font-montserrat text-sm text-sidebartext">
        Username
        <Box className="bg-box w-11/12 text-white rounded-xl p-2.5">DD5384500</Box>
      </div>
    </Grid>
    <Grid item xs={12} md={6}>
      <div className="pl-8 font-montserrat text-sm text-sidebartext">
        Account
        <Box className="bg-box w-11/12 text-white rounded-xl p-2.5">DD5384500</Box>
      </div>
    </Grid>
    <Grid item xs={12} md={6}>
      <div className="pl-8 font-montserrat text-sm text-sidebartext">
        Email
        <Box className="bg-box w-11/12 text-white rounded-xl p-2.5">placeholderemail@email.com</Box>
      </div>
    </Grid>
  
  </Grid>
  
</Box>
       
          <Box
            bgcolor="primary.main"
            height="100%"
            width="100%"
            borderRadius={5}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            className="w-full"
          >
            <TableContainer component={Paper} className="w-full max-w-screen bg-transparent">
              <Table style={{ width: '100%', borderTop: 'none' }}>
                <TableHead style={{border: 'none', borderBottom: 'none' }}>
                  <TableRow>
                    <TableCell className="text-white" style={{border: 'none', borderBottom: 'none' }}>
                    <div className="text-sidebartext font-medium 4defont-montserrat">
                        Customer transactions
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow className="relative z-10">
                  <TableCell style={headerCellStyle}>ACTIONS</TableCell>
                  <TableCell style={headerCellStyle}>ID</TableCell>
                  <TableCell style={headerCellStyle}>TYPE</TableCell>
                  <TableCell style={headerCellStyle}>PROCESSOR</TableCell>
                  <TableCell style={headerCellStyle}>RECIPIENT INFO</TableCell>
                  <TableCell style={headerCellStyle}>CUSTOMER REF</TableCell>
                  <TableCell style={headerCellStyle}>MERCHANT REF</TableCell>
                  <TableCell style={headerCellStyle}>AMOUNT</TableCell>
                  <TableCell style={headerCellStyle}>UPDATED</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody className="">
                  {tableRows.map((_, index) => {
                    return (
                      <TableRow key={index}>
                         <TableCell style={combinedStyle}>Placeholder Cell</TableCell>
                         <TableCell style={combinedStyle}>Placeholder Cell</TableCell>
                         <TableCell style={combinedStyle}>Placeholder Cell</TableCell>
                         <TableCell style={combinedStyle}>Placeholder Cell</TableCell>
                         <TableCell style={combinedStyle}>Placeholder Cell</TableCell>
                     
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
      </ThemeProvider>
    </div>
  );
}
const TransactionRow: () => JSX.Element | any = () => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Skeleton variant="text" />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" />
      </TableCell>
    </TableRow>
  );
};