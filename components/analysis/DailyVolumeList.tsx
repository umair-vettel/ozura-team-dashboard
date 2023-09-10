import type { NextComponentType } from "next";
import { useContext, useEffect, useState } from "react"
import PuffLoader from 'react-spinners/PuffLoader'
import { HistoricalDataContext } from "../../pages/overview";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const DailyVolumeList: () => JSX.Element | any = () => {
    const [historicalData, setHistoricalData] = useContext(HistoricalDataContext)
    const [chartArrayData, setChartArrayData]: any[] = useState();
    const [loading, setLoading] = useState(false);
    const [requested, setRequested] = useState(false);
    type ExpandedState = { [key: string]: boolean };
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [clicked, setClicked] = useState(false);


    useEffect(() => {
        
        if (historicalData){
            const merchants = Object.keys(historicalData?.data)
            const content = [...historicalData?.data[merchants[0]].Data]
            content.reverse()
            setChartArrayData(content)
            
        }
        
    }, [historicalData])

    const cellStyle = { color: 'white', fontFamily: 'Montserrat', fontWeight: 400, };
    const rowStyle = { borderBottom: '#4a387a',  }; 
    const combinedStyle = { ...cellStyle, ...rowStyle };
    const headerCellStyle = { ...combinedStyle, color: '#503C85', position: 'sticky', top: 0, backgroundColor: '#251C3D', fontWeight: 500, };

    const TransactionsDisplay = () => {
      if (chartArrayData) {
        return (
            <TableContainer
        component={Paper}
        style={{
          backgroundColor: 'transparent',
          maxHeight: 'calc(5 * 3rem + 5 * 4px)',
          overflowY: 'auto',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <Table>
        <TableHead>
            <TableRow style={combinedStyle}>
              <TableCell style={headerCellStyle}>Day</TableCell>
              <TableCell style={headerCellStyle}>Number of Transactions</TableCell>
              <TableCell style={headerCellStyle}>Total Volume</TableCell>
              <TableCell style={headerCellStyle}>Average Order</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
                {chartArrayData.map((day: any) => {
                  const dayOf = new Date(day.day);
                  const dayString =
                    monthNames[dayOf.getUTCMonth()] +
                    " " +
                    dayOf.getUTCDate() +
                    ", " +
                    dayOf.getUTCFullYear();
                  return (
                    <TableRow key={day.day} style={rowStyle}>
                      <TableCell style={combinedStyle}>{dayString}</TableCell>
                      <TableCell style={combinedStyle}>{day.numberOfTransactions}</TableCell>
                      <TableCell style={combinedStyle}>
                        ${Number(Number(day.totalAmount).toFixed(2)).toLocaleString()} USD
                      </TableCell>
                      <TableCell style={combinedStyle}>
                        ${Number(Number(day.dailyAverageOrderSize).toFixed(2)).toLocaleString()} USD
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        );
      } else {
        return (
          <div className=" text-neutral-600 text-left rounded-xl  border-violet-900 drop-shadow-md min-h-[15vh] max-h-[50vw] min-w-[50vw]">
            <div className="flex h-full justify-center items-center m-auto">
              <PuffLoader color="rgba(116, 74, 255, 1)" size="80px" />
            </div>
          </div>
        );
      }
    };
    
    if (chartArrayData) {
      return (
        <div className="mx-auto">
          <TransactionsDisplay />
        </div>
      );
    } else 
      return null;
    }