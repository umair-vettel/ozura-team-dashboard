import { useContext, useEffect, useState } from "react";
import { SelectedEntityContext } from "../contexts/userContext";
import { stepLabelClasses } from '@mui/material/StepLabel';

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
  TextField,
  Skeleton 
} from "@mui/material";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";

import {
  RxMagnifyingGlass} 
  from "react-icons/rx";

  import {
    HiOutlineIdentification } 
    from "react-icons/hi";
  

  import { RiExchangeDollarFill } 
    from "react-icons/ri";


import {
  AiFillInfoCircle,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineSearch,
  AiOutlineShop,
} from "react-icons/ai";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import {
  BsPerson,
  BsQuestionLg,
  BsCurrencyDollar,
  BsBoxArrowInDown,
  BsBoxArrowUp
} from "react-icons/bs";

import {
  BiCube
} from "react-icons/bi";

import { Step, StepButton, StepConnector, StepIcon, StepLabel, Stepper } from '@mui/material';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { stepConnectorClasses } from '@mui/material/StepConnector';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useRouter } from 'next/router'

import TextProvider from './TextProvider';
import BoxComponent from './BoxComponent';

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
  
  const steps = ['Pending', 'Processing', 'Completed'];

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));
  
  const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: '#ffffff', 
           display: 'flex',
      height: 22,
      alignItems: 'center',
      ...(ownerState.active && {
        color: '#784af4',
      }),
      '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
      },
      '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      },
    }),
  );
  const WhiteTextStepLabel = styled(StepLabel)(({ theme }) => ({
    [`&.${stepLabelClasses.root}`]: {
      color: '#ffffff',
    },
    [`&.${stepLabelClasses.active}`]: {
      color: '#ffffff', 
      [`& .${stepLabelClasses.label}`]: {
        color: '#ffffff',
      },
    },
    [`&.${stepLabelClasses.completed}`]: {
      color: '#ffffff', 
      [`& .${stepLabelClasses.label}`]: {
        color: '#ffffff', 
      },
    },
  }));
  
  
  
  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  function Transaction() {
    return (
        <div className="h-screen w-full pl-12 mx-auto">
        <ThemeProvider theme={theme}>
      <BoxComponent />
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
              <Grid container rowSpacing={4} columnSpacing={3} spacing={4}>
        <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
                {/* First Column for the Order */}
                <Grid item xs={4} className="d-flex align-items-center">
                    <div className='text-white text-lg'>
                        ORDER #4445455 - DEPOSIT
                    </div>
                </Grid>
                {/* Second Column for the Stepper */}
                <Grid item xs={8}>
                    <div>
                    <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
  {steps.map((label) => (
    <Step key={label}>
      <WhiteTextStepLabel StepIconComponent={QontoStepIcon}>{label}</WhiteTextStepLabel>
    </Step>
  ))}
</Stepper>
                    </div>
                </Grid>
            </Grid>
       
    </Grid>
        

      <Grid container item xs={12} md={4} alignItems="center">
      <Grid item >
  <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
    <BsPerson className="w-8 h-8 text-sidebartext" />
  </div>
  
</Grid>

  <Grid item>
    <div className="w-full ml-4 font-montserrat">
      <div className="font-montserrat text-lg font-bold text-sidebartext">
        John Smith 
        <div className=" text-sidebartext/80 text-md font-light">Customer</div>
      </div>
    </div>
  </Grid>
  
</Grid>
<Grid container item xs={12} md={4} alignItems="center">
      <Grid item>
  <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
    <RxMagnifyingGlass className="w-8 h-8 text-sidebartext" />
  </div>
  
</Grid>

  <Grid item>
    <div className="w-full ml-4 font-montserrat">
      <div className="font-montserrat text-lg font-semibold text-sidebartext">
        4546434
        <div className=" text-sidebartext/80 text-md font-light">Customer ref</div>
      </div>
    </div>
  </Grid>
</Grid>
<Grid container item xs={12} md={4} alignItems="center">
      <Grid item>
  <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
    <BsQuestionLg className="w-8 h-8 text-sidebartext" />
  </div>
  
</Grid>

  <Grid item>
    <div className="w-full ml-4 font-montserrat">
      <div className="font-montserrat text-md font-semibold text-sidebartext">
        Deposit
        <div className=" text-sidebartext/80 text-md font-light">Type</div>
      </div>
    </div>
  </Grid>
</Grid>

       
     
          
       

       
    
      

      </Grid>
      <div className="border-t mt-12 pb-12 border-textoverlay/30"></div>


      <Grid container>
  {/* The left-most column */}
  <Grid item xs={4}>
    {/* First grid container item */}
    <Grid container item xs={12}       mb={3}
 alignItems="center" direction="row">
      <Grid item>
        <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
          <BsPerson className="w-8 h-8 text-sidebartext" />
        </div>
      </Grid>
      <Grid item>
        <div className="w-full ml-4 font-montserrat">
          <div className="font-montserrat text-lg font-semibold text-sidebartext">
            Bitcoin ClockCypher
          </div>
          <div className="text-sidebartext/80 text-md font-light">Processor</div>
        </div>
      </Grid>
    </Grid>

    <Grid container       mb={3}
 item xs={12} alignItems="center" direction="row">
      <Grid item>
        <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
          <AiOutlineShop className="w-8 h-8 text-sidebartext" />
        </div>
      </Grid>
      <Grid item>
        <div className="w-full ml-4 font-montserrat">
          <div className="font-montserrat text-lg font-semibold text-sidebartext ">
            DSI
          </div>
          <div className=" text-sidebartext/80 text-md font-light">Merchant</div>
        </div>
      </Grid>
    </Grid>
  </Grid>

  {/* The remaining two columns */}
  <Grid item xs={4}>
  <Grid container       mb={4}
 item xs={12} alignItems="center" direction="row">
      <Grid item>
        <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
          <HiOutlineIdentification className="w-8 h-8 text-sidebartext" />
        </div>
      </Grid>
      <Grid item>
        <div className="w-full ml-4 font-montserrat">
          <div className="font-montserrat text-lg font-semibold text-sidebartext ">
            M4563454
          </div>
          <div className=" text-sidebartext/80 text-md font-light">Merchant ref</div>
        </div>
      </Grid>
    </Grid>
    <Grid container       mb={4}
 item xs={12} alignItems="center" direction="row">
      <Grid item>
        <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
          <BiCube className="w-8 h-8 text-sidebartext" />
        </div>
      </Grid>
      <Grid item>
        <div className="w-full ml-4 font-montserrat">
          <div className="font-montserrat text-lg font-semibold text-sidebartext ">
            0x0000000000000 
          </div>
          <div className=" text-sidebartext/80 text-md font-light">Transaction hash</div>
        </div>
      </Grid>
    </Grid>  </Grid>
  <Grid item xs={4}>
  <Grid container       mb={4}
 item xs={12} alignItems="center" direction="row">
      <Grid item>
        <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
          <BsCurrencyDollar className="w-8 h-8 text-sidebartext" />
        </div>
      </Grid>
      <Grid item>
        <div className="w-full ml-4 font-montserrat">
          <div className="font-montserrat text-lg font-bold text-sidebartext ">
            2.23
          </div>
          <div className=" text-sidebartext/80 text-md font-light">Fee paid </div>
        </div>
      </Grid>
    </Grid>
    <Grid container item xs={12} alignItems="center" direction="row">
      <Grid item>
        <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
          <RiExchangeDollarFill className="w-8 h-8 text-sidebartext" />
        </div>
      </Grid>
      <Grid item>
        <div className="w-full ml-4 font-montserrat">
          <div className="font-montserrat text-lg font-semibold text-sidebartext ">
            0.55 
          </div>
          <div className=" text-sidebartext/80 text-md font-light">Processor fee</div>
        </div>
      </Grid>
    </Grid>   </Grid>
</Grid>


            </Box>
        </ThemeProvider>
    </div>
 
    );
}

export default Transaction;
