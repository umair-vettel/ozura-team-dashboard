import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {MdOutlineErrorOutline, MdOutlineCheckCircle} from 'react-icons/md'
import { useRouter } from 'next/router'

import { signOut, useSession } from "next-auth/react";

const Settings: NextPage<any> = () => {

    const NA:any = useSession();
    const router = useRouter()

    useEffect(() => {
        if (router.query){
            if (router.query.userID && typeof(router.query.userID) == "string"){
                setUserID(router?.query?.userID)
            }
            if (router.query.access && typeof(router.query.access) == "string"){
                setCurrentPassword(router?.query?.access)
            }
        }
    }, [router])

    const [userID, setUserID] = useState<string>();
    const [currentPassword, setCurrentPassword] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();

    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [successMessage, setSuccessMessage] = useState<string | undefined>();

    const handleUserID = (e:any) => {
        setUserID(e.target.value)
    }

    const handleCurrentPassword = (e:any) => {
        setCurrentPassword(e.target.value)
    }
    const handleNewPassword = (e:any) => {
        setNewPassword(e.target.value)
    }
    

    const handleSubmit = async () => {
        setErrorMessage(undefined)
        if (!currentPassword && !newPassword && (NA.status !== "authenticated" && !userID)) {
            setErrorMessage("Please enter all fields.")
        }
        if (!currentPassword && !newPassword) {
            setErrorMessage("Please enter your current password and a new password to continue.")
        }
        if (!currentPassword && newPassword) {
            setErrorMessage("Please enter your current password.")
        } 
        if (currentPassword && !newPassword) {
            setErrorMessage("Please enter a new password.")
        } 
        if (NA.status !== "authenticated" && !userID){
            setErrorMessage("Please enter your User ID")
        }

        const body = {
            oldPassword: currentPassword,
            newPassword
        }
        if (userID){
            Object.assign(body, {userID})
        }
        await fetch('/api/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then((res) => res.json())
            .then((revData) => {
                if (revData.success == true) {
                    
                    if (NA.status == 'authenticated'){
                        setSuccessMessage("Password changed. Signing out in 5 seconds...")
                        setTimeout(() => {
                            signOut()
                            return;
                        }, 5000)   
                    } else {
                        setSuccessMessage("Password changed.")
                        setCurrentPassword("")
                        setNewPassword("")
                    }
                    
                } else {
                    setErrorMessage(revData.reason || revData.error || "Something went wrong. Check your credentials and try again.")
                    setCurrentPassword("")
                    setNewPassword("")
                }
            })

        
        

    }

    return ( 
        <div className=" min-h-screen px-4 sm:px-6 py-24 grid md:place-items-center lg:px-8 my-auto">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
        
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <p className="text-4xl font-extrabold sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Change your Password
                </p>
              <p className="mt-1 text-base text-gray-400">
                    Reset your password using either your existing password or a temporary code.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              
            </div>
          </div>


        
        </main>

            <div className="text-gray-100">
    
                {errorMessage ? 
                <div className="w-full p-3 bg-red-500 rounded-xl mb-5 flex gap-4">
                    <div className="my-auto">
                        <MdOutlineErrorOutline size="1.5em"/>
                    </div>
                    {errorMessage}
                </div>
                : <></>}

                {successMessage ? 
                <div className="w-full p-3 bg-emerald-500 rounded-xl mb-5 flex gap-4">
                    <div className="my-auto">
                        <MdOutlineCheckCircle size="1.5em"/>
                    </div>
                    {successMessage}
                </div>
                : <></>}

                <form>
                    {NA.status !== "authenticated" ? 
                    <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">User ID:</label>
                    <input onChange={handleUserID} value={userID} type="text" id="userID" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                    </div> : <></>}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Your current password:</label>
                        <input onChange={handleCurrentPassword} value={currentPassword} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">New Password:</label>
                        <input onChange={handleNewPassword} value={newPassword} type="password" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                    </div>
                    
                    
                </form>
                <button onClick={handleSubmit} className="text-white bg-violet-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>



            </div>
      </div>
    </div>
    )
}


export default Settings;