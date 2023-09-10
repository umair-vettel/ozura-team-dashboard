// pages/api/getHistoricalMerchantEarnings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";


const secret:any = process.env.JWT_SECRET



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  try {
    var jwt:any = await getToken({ req, secret })
    
  } catch (e: any) {
    console.log("JWT ERROR: "+ e.mesage)
    return res.status(501).send('Unable to verify request'); 
  }

  try {
    
    if (!req.headers.merchantid){
      return res.status(401).json({
        success: false,
        reason: "Invalid ID"
      })
    }
    

    const baseURL = process.env.OZP_API;
    const url = new URL(baseURL+ '/portal/earnings/getHistoricalMerchantEarnings');
    
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": jwt.accessToken!
      },
      body: JSON.stringify({
        merchantIDs: [req.headers.merchantid],
        includeToday: true,
        startDaysAgo: 13
      }),
    });
    const responseData = await response.json();
 
    if (typeof(responseData.success) == "boolean" && !responseData.success){
      return res.status(410).json({
        success: false,
        reason: "Authorization is required for this request. Credentials are invalid."
      })
    }
  

    if (responseData.quantity == 0){
      const todayUTC = new Date().setUTCHours(0,0,0,0)
      const initialDate = new Date(todayUTC)
      initialDate.setDate(initialDate.getDate() - 13)

      const blankData = [];
      for (let i=0; i<14; i++){
        const current = {
          day: initialDate.toUTCString(),
          totalAmount: "0.00",
          numberOfTransactions: 0,
          dailyAverageOrderSize: "0.00"
        }
        blankData.push(current)
        initialDate.setDate(initialDate.getDate() + 1)
      }
    
      const MerchantUrl = new URL(baseURL+ '/portal/merchant/getInfo');

      const merchantResponse = await fetch(MerchantUrl.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwt.accessToken!
        },
        body: JSON.stringify({
          merchantID: req.headers.merchantid,
        
        }),
      });
    
      const merchantData = await merchantResponse.json();
    
      if (merchantData?.success){
        const returnData = {
          total: "0.00",
          quantity: 0,
          data: {
            [merchantData.data.name]: {
              Data: blankData
            }
          }
        }
        
        return res.status(200).json(returnData)
      } else {
        const returnData = {
          total: "0.00",
          quantity: 0,
          data: {
            "Merchant": {
              Data: blankData
            }
          }
      }
      return res.status(200).json(returnData)
    }

    } else if (responseData?.data[Object.keys(responseData?.data)[0]]?.Data.length < 14) {
      const todayUTC = new Date().setUTCHours(0,0,0,0)
      const initialDate = new Date(todayUTC)
      initialDate.setDate(initialDate.getDate() - 13)
      
      const dataArray = responseData?.data[Object.keys(responseData?.data)[0]]?.Data;
     
      const formattedData = [];
      for (let i=0; i<14; i++){
        if (!dataArray.some((element: {day: string}) => new Date(element.day).valueOf() == initialDate.valueOf())){
          const current = {
            day: initialDate.toUTCString(),
            totalAmount: "0.00",
            numberOfTransactions: 0,
            dailyAverageOrderSize: "0.00"
          }
          formattedData.push(current)
          initialDate.setDate(initialDate.getDate() + 1)
        } else {
          
          const index = dataArray.findIndex((element: {day: string}) => new Date(element.day).valueOf() == initialDate.valueOf())
          
          formattedData.push(dataArray[index])
          initialDate.setDate(initialDate.getDate() + 1)
          
        }
        
      }
      
      const returnData = {
        total: responseData.total,
        quantity: responseData.quantity,
        data: {
          [Object.keys(responseData?.data)[0]]: {
            Data: formattedData
          }
        }
      }
      return res.status(200).json(returnData)
      
      
    } 
    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      
      if (!response.ok) {
        return res.status(response.status).json(responseData);
      } else {

        return res.status(200).json(responseData);
      }
    } else {
      const responseText = await response.text();
      console.error('Unexpected Content-Type:', contentType);
      console.error('Response Text:', responseText);
      res.status(response.status).send('Error: Unexpected Content-Type');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
