// pages/api/getHistoricalMerchantEarnings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";
const secret = process.env.JWT_SECRET

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    var jwt:any = await getToken({ req, secret })
  } catch (e: any) {
    console.log("JWT ERROR: "+ e.mesage)
    return res.status(501).send('Unable to verify request'); 
  }

  try {
    const baseURL = process.env.OZP_API;
    const url = new URL(baseURL+ '/portal/merchant/getInfo');
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": jwt.accessToken!
      },
      body: JSON.stringify({
        merchantID: req.headers.merchantid
      }),
    });
    const responseData = await response.json();



    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      if (!response.ok) {
        return res.status(response.status).json(responseData);
      } else {
        if (responseData.data.enrolledProducts.some((element: {product: string}) => element.product == 'degenAPI')){
          const index = responseData.data.enrolledProducts.findIndex((element: {product: string}) => element.product == 'degenAPI')
          const returnData = responseData.data.enrolledProducts[index]
          return res.status(200).json(returnData);
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
  } catch (err:any) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
};
