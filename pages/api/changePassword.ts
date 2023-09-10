// pages/api/getHistoricalMerchantEarnings.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {

    const session = await getServerSession(req, res, authOptions)
    const userID = session?.user?.id || req.body.userID
    if (!userID){
        return res.status(401).json({
            success: false,
            reason: "No userID provided."
          });
    }

    const baseURL = process.env.OZP_API;
    const url = new URL(baseURL+ '/auth/changePassword');
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userID,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
      }),
    });
    const responseData = await response.json();


    

    

    if (responseData.success){
      return res.status(200).json(responseData)
    } else {
      return res.status(response.status).json(responseData)
    }
  } catch (err:any) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
};
