import { useContext, useEffect, useState } from "react"
import { MerchantStatusContext } from '../../pages/overview'

export const MerchantOverviewStatus: () => JSX.Element | any = () => {

    const [merchantData, setMerchantData] = useContext(MerchantStatusContext)
    useEffect(() => {
        if (merchantData){
            
        }
    }, [merchantData])
    if (merchantData){
        return (
            <div className="flex flex-col w-max grid grid-cols-2 gap-2 text-center">
                <div className="p-8 bg-widgetcolor rounded-3xl drop-shadow-md">
                    <p className="text-white place-content-center mx-auto"> Status</p>
                    <p className={`text-lg font-montserratMedium ${merchantData.active ? "text-emerald-600" : "text-red-600"}`}>{merchantData.active ? "Active" : "Inactive"}</p>
                </div>
                <div className="p-8 bg-widgetcolor text-white rounded-3xl drop-shadow-md">
                    <p>Daily Spending Limit</p>
                    <p className="text-lg font-montserratMedium">${Number(merchantData.dailySpendingLimit.toFixed(2)).toLocaleString()} USD</p>
                </div>
            </div>
        )
    } else {

    }
    
}