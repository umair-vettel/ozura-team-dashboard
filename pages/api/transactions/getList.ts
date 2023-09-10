import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
const secret = process.env.JWT_SECRET


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    var jwt:any = await getToken({ req, secret })
  } catch (e: any) {
    console.log("JWT ERROR: "+ e.mesage)
    return res.status(501).send('Unable to verify request'); 
  }
  try {

    const baseURL = process.env.OZP_API;
    const url = new URL(baseURL+ '/portal/tx/getMerchantTransactions');

    if (!req.body.quantity && !req.body.skip){
      
      return res.status(401).json({
        success: false,
        reason: "Incorrect formatting for request."
      });
    }
    
    if (req.body.merchantID == undefined){

    }
    
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": jwt.accessToken!
      },
      body: JSON.stringify({
        merchantID: req.body.merchantID,
        "quantity": Number(req.body.quantity),
        "skip": Number(req.body.skip)
      }),
    });
    const responseData = await response.json();


    

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      if (!response.ok) {
        return res.status(response.status).json(responseData);
      } else {
        if (responseData.success){
          return res.status(200).json(responseData);
        }

        return res.status(501).json({
          success: false,
          reason: "Unable to find API product."
        });
      }
    } else {
      const responseText = await response.text();
      console.error('Unexpected Content-Type:', contentType);
      console.error('Response Text:', responseText);
      res.status(response.status).send('Error: Unexpected Content-Type');
    }

  } catch (e: any) {
    res.status(500).json({ success: "false", error: e.message });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500kb",
    },
  },
};
