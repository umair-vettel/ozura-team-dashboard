// pages/api/getHistoricalMerchantEarnings.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {

    const session = await getServerSession(req, res, authOptions)
    const query = session?.user?.id || req.body.query
    if (!query){
        return res.status(401).json({
            success: false,
            reason: "No query provided."
          });
    }

    const baseURL = process.env.OZP_API;
    const url = new URL(baseURL+ '/auth/resetPassword');
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query
      }),
    });
    const responseData = await response.json();


    

    

    if (response.ok) {
        return res.status(response.status).json(responseData);
    } else {
        return res.status(response.status).json(responseData);
    }
  } catch (err:any) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
};
