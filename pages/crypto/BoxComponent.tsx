import React, { useContext } from 'react';
import TextContext from './TextProvider';
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
  import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
  import { styled } from "@mui/system";

  import {
    BsPerson,
    BsQuestionLg,
    BsCurrencyDollar,
    BsBoxArrowInDown,
    BsBoxArrowUp
    
  } from "react-icons/bs";

const StyledIcon = styled(PaidOutlinedIcon)({
  color: '#ffffff',
  fontSize: '2em',
});


function BoxComponent() {

  return (
    <Grid
                      container
                      rowSpacing={0}
                      columnSpacing={0}
                      spacing={0}
                    >
    <Grid xs={4}>
    
    <Box
      bgcolor="primary.main"
      height="20%"
      width="100%"
      p={3}
      borderRadius={8}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      position="relative"
      overflow="hidden"
      minHeight={170}
      mb={2}
    >
<div style={{ display: 'flex', alignItems: 'center' }}>
<div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
   < BsCurrencyDollar className="w-6 h-6 text-sidebartext" />
        </div>   
        <div className="text-sidebartext pl-4 font-medium">
    Current balance ($USD)
  </div>
</div>
                              </Box>
   
    </Grid>
   <Grid xs={4}>
    
   <Box
     bgcolor="primary.main"
     height="20%"
     width="100%"
     p={3}
     borderRadius={8}
     display="flex"
     flexDirection="column"
     justifyContent="flex-start"
     position="relative"
     overflow="hidden"
     minHeight={170}

   >
   <div style={{ display: 'flex', alignItems: 'center' }}>
   <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
   <BsBoxArrowInDown className="w-6 h-6 text-sidebartext" />
        </div>
        <div className="text-sidebartext pl-4 font-medium">
              Today's deposits
  </div>
</div>
   </Box>
  
   </Grid>
   <Grid xs={4}>
    
    <Box
      bgcolor="primary.main"
      height="20%"
      width="100%"
      p={3}
      borderRadius={8}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      position="relative"
      overflow="hidden"
      minHeight={170}

    >
    <div style={{ display: 'flex', alignItems: 'center' }}>
<div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
   <BsBoxArrowUp className="w-6 h-6 text-sidebartext" />
        </div>  <div className="text-sidebartext pl-4 font-medium">
    Today's withdrawals
  </div>
</div>
    </Box>
   
    </Grid>
   </Grid>
  );
}


export default BoxComponent;
