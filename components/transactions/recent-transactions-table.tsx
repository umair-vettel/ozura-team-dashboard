import { useContext, useEffect, useState } from "react";
import { SelectedEntityContext } from "../contexts/userContext";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  IconButton,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  Grid,
  Skeleton 
} from "@mui/material";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";

import {
  AiFillInfoCircle,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { FaRegEnvelope } from "react-icons/fa";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

//<TransactionListContext.Provider value={[transactionList, setTransactionList]}>
export const RecentTransactionsTable: () => JSX.Element | any = () => {
  const [transactionList, setTransactionList] = useState<any>();
  const [selectedEntity, setSelectedEntity] = useContext(SelectedEntityContext);

  const [quantity, setQuantity] = useState(25);
  const [skip, setSkip] = useState(0);

  const [loading, setLoading] = useState(false);
  const [totalQty, setTotalQty] = useState(0);

  const fetchRecentTransactions = async (param: {
    quantity: number;
    skip: number;
  }) => {
    setLoading(true);
    await fetch("/api/transactions/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchantID: selectedEntity?.merchantID,
        quantity: param.quantity,
        skip: param.skip,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setTransactionList(data.transactions);
          setTotalQty(data.total);
        }
      });
  };
  

  useEffect(() => {
    if (!selectedEntity) {
      return;
    }
  }, []);

  useEffect(() => {
    if (!selectedEntity) {
      return;
    }
    fetchRecentTransactions({
      quantity,
      skip,
    });
  }, [quantity, skip]);

  useEffect(() => {
    if (!selectedEntity) {
      return;
    }
    fetchRecentTransactions({
      quantity,
      skip,
    });
  }, [selectedEntity]);

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


  if (selectedEntity) {
    return (
      <div className="h-screen w-full py-8 pl-12 mx-auto">
        <ThemeProvider theme={theme}>
          <Grid container rowSpacing={4} columnSpacing={3} spacing={4}>
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
  <TableContainer
    component={Paper}
    className="w-full max-w-screen bg-transparent"
  >
<Table style={{ width: '100%', borderTop: 'none' }}>
<TableHead style={{border: 'none', borderBottom: 'none' }}>
                    <TableRow>
                      
                    
                      <TableCell className="text-white" style={{border: 'none', borderBottom: 'none' }}>
                        <div className="flex gap-4 relative left-5">
                          
                          <div>
                            {skip} - {quantity + skip} of {totalQty}
                          </div>
                          <a
                            className="hover:bg-neutral-200/50 rounded-full"
                            onClick={() => {
                              if (skip - quantity >= 0) {
                                setSkip(skip - quantity);
                              }
                            }}
                          >
                            <MdOutlineKeyboardArrowLeft size="2em" />
                          </a>
                          <a
                            className="hover:bg-neutral-200/50 rounded-full"
                            onClick={() => {
                              setSkip(skip + quantity);
                            }}
                          >
                            <MdOutlineKeyboardArrowRight size="2em" />
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                  <TableRow style={combinedStyle} className="relative z-10">
    <TableCell style={headerCellStyle}>
      Creation Date (UTC)
    </TableCell>
    <TableCell style={headerCellStyle}>Order ID</TableCell>
    <TableCell style={headerCellStyle}>
      Sub Total ($USD)
    </TableCell>
    <TableCell style={headerCellStyle}>
      Total ($USD)
    </TableCell>
    <TableCell style={headerCellStyle}>Status</TableCell>
    <TableCell style={headerCellStyle} /> {/* This is for the dropdown arrow */}
  </TableRow>
</TableHead>
<TableBody className={`${loading ? "animate-pulse" : ""}`}>
  {transactionList?.map((transaction: any) => {
    return (
      <TransactionRow
        key={transaction.trxID}
        tx={transaction}
      />
    );
  })}
</TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-max grid grid-cols-2 gap-2 text-center"></div>
  );
};

const TransactionRow: (props: any) => JSX.Element | any = (props: any) => {
  const transaction = props.tx;
  const [openCell, setOpenCell] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    return new Promise(resolve => setTimeout(resolve, 1000)); 
  };

  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, []);

  const dayOf = new Date(transaction.createdAt);
  const dayString =
    monthNames[dayOf.getUTCMonth()] +
    " " +
    dayOf.getUTCDate() +
    ", " +
    dayOf.getUTCFullYear();
  const timeString = () => {
    const formatNumber = (num: any) => {
      if (Number(num) < 10) {
        num = num.toString();
        return "0" + num;
      } else {
        return num;
      }
    };
    return (
      formatNumber(dayOf.getUTCHours()) +
      ":" +
      formatNumber(dayOf.getUTCMinutes())
    );
  };
  

  const MoreDetails = () => {
    return (
      <Grid container spacing={3} className="text-white py-10 px-4 font-montserratRegular">
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} className="d-flex align-items-center">
            <div>
          

          </div>
               Transaction ID: {transaction.trxID}
                <span className={`${getStateColor(transaction.stateType)} w-fit ml-2 align-items-center gap-8`}>{transaction.state}</span>
                {transaction?.client?.cardHolderName && (
              <div className="text-xl">{transaction?.client?.cardHolderName} </div>
            )}
            {transaction?.client?.email && (
              <div className="pb-4">
                <FaRegEnvelope/> 
                <span>{transaction?.client?.email} </span>
                </div> 
            )}
            </Grid>
          </Grid>
        </Grid>
   

        <Grid item xs={12} md={3}>
  <div>
  <div className="text-sidebartext pb-2 text-bold">Payment method:</div>
<div className="d-flex align-items-center">
  {transaction?.card?.type && transaction?.card?.last4 && (
    <div>
      {transaction?.card?.type}...
      <span className="bg-box w-fit text-white rounded-full p-1 px-2.5 ml-2">
        {transaction?.card?.last4}
      </span>
    </div>
  )}
</div>
            
         
          </div>
        </Grid>
        <Grid item xs={12} md={6} >
        {transaction?.address && (
            <div className="w-fit font-montserrat">
              <div className="font-montserrat text-sidebartext">Wallet Address: <div className="bg-box w-fit text-white rounded-2xl p-2.5">{transaction?.address}</div></div>
            </div>
          )}
          {transaction?.txHash && (
            <div className="font-montserrat pt-4 text-sidebartext">Transaction Hash: <div className="bg-box w-fit text-white rounded-2xl p-2.5">{transaction?.txHash} </div></div>
          )}
          
          
        </Grid>
        <Grid item xs={12} md={3}>
          <div>
          <p className="text-sidebartext font-bold">Total: ${transaction?.total}</p>

          <p className="font-extralight">Subtotal: ${transaction?.subtotal}</p>

          <p className="">Processing Fee: -${transaction.merchantFee}</p>

            <p>Client Fees: ${transaction?.clientFee}</p>
          </div>
        </Grid>
    
      </Grid>
    );
  };
  


// CELLS 

if (loading) {
  return (
    <TableRow 
    className="transition-all hover:bg-neutral-200/5 rounded-2xl"
    style={{ borderBottom: 'none',  border: 'none', borderTop: 'none'}} 
  >      <TableCell component="th" scope="row">
        <Skeleton variant="text" />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" height='30px' />
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
} else {

return (
  <>
    <TableRow
      key={transaction.trxID}
      style={combinedStyle}
      className={`transition-all hover:bg-neutral-200/5 rounded-2xl`}
    >
      <TableCell style={combinedStyle}>
        {dayString} - {timeString()}
      </TableCell>
      <TableCell style={combinedStyle}>{transaction.trxID}</TableCell>
      <TableCell style={combinedStyle}>
        ${Number(Number(transaction.subtotal).toFixed(2)).toLocaleString()}{" "}
        USD
      </TableCell>
      <TableCell style={combinedStyle}>
        ${Number(Number(transaction.total).toFixed(2)).toLocaleString()} USD
      </TableCell>
      <TableCell style={combinedStyle}>
        <div
          className={`${getStateColor(
            transaction.stateType
          )} w-fit flex mx-auto gap-2`}
        >
          <p>{transaction.state}</p>
          <GetStateIcon stateType={transaction.stateType} />
        </div>
      </TableCell>
      <TableCell style={combinedStyle}>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpenCell(!openCell)}
          className="text-white font-montserratRegular"
        >
          {openCell ? (
            <MdKeyboardArrowUp size="1.2em" />
          ) : (
            <MdKeyboardArrowDown size="1.2em" />
          )}
        </IconButton>
      </TableCell>
    </TableRow>

    <TableRow
      key={transaction.trxID + " extended"}
      style={combinedStyle}
      className={`transition-all rounded-2xl  bg-moredetails`}
    >
      <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none'}} colSpan={6}>
        <Collapse in={openCell} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <MoreDetails />
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
);
};
};
const getStateColor = (stateType: string) => {
  switch (stateType) {
    case "success":
      return "bg-emerald-500 text-white px-2 py-1 rounded-full drop-shadow-sm hover:bg-emerald-400 transition-all duration-150";
    case "pending":
      return "bg-amber-400 text-white px-2 py-1 rounded-full drop-shadow-sm hover:bg-amber-300 transition-all duration-150";
    case "fail":
      return "bg-rose-500 text-white px-2 py-1 rounded-full drop-shadow-sm hover:bg-rose-400 transition-all duration-150";
    case "refund":
      return "bg-sky-500 text-white px-2 py-1 rounded-full drop-shadow-sm hover:bg-sky-400 transition-all duration-150";
  }
};
const GetStateIcon: any = (prop: { stateType: string }) => {
  switch (prop.stateType) {
    case "success":
      return <AiFillCheckCircle className="fill-white relative top-1" />;
    case "pending":
      return <AiFillInfoCircle className="fill-white relative top-1" />;
    case "fail":
      return <AiFillCloseCircle className="fill-white relative top-1" />;
    case "refund":
      return <AiFillInfoCircle className="fill-white relative top-1" />;
  }
};
