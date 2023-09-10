import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import {MdOutlineErrorOutline, MdOutlineCheckCircle} from 'react-icons/md'

function redirect(url:string) {
  var ua        = navigator.userAgent.toLowerCase(),
      isIE      = ua.indexOf('msie') !== -1,
      version   = parseInt(ua.substr(4, 2), 10);

  // Internet Explorer 8 and lower
  if (isIE && version < 9) {
      var link = document.createElement('a');
      link.href = url;
      document.body.appendChild(link);
      link.click();
  }

  // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
  else { 
      window.location.href = url; 
  }
}

export default function SignIn() {


    const NA:any = useSession();
    
    const [userID, setUserID] = useState<string>();
    const [password, setPassword] = useState<string>();

    const router = useRouter()

    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
      if (NA.status == 'authenticated'){
        redirect('/')
      }
    }, [NA])

    useEffect(() => {
        if (router.query){
            console.log(router.query)
            console.log(router?.query?.error == 'CredentialsSignin')
            if (router?.query?.error && typeof(router.query.error) == "string"){
                switch (router?.query?.error){
                    case "CredentialsSignin":
                        setErrorMessage("Invalid credentials.")
                        break;
                    default:
                        setErrorMessage("Something went wrong. Try again or contact support.")    
                        break;
                      
                }
                
            }
            
        }
    }, [router])

    const handleUserID = (e:any) => {
        setUserID(e.target.value)
    }

    const handlePassword = (e:any) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        await signIn("credentials", { username: userID, password, redirect: false } ).then((res: any) => {
          if (res?.ok){
            redirect('/')
          }
        })
    }

    


  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-lg w-full bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-6">Sign in</h2>

        {errorMessage ? 
                <div className="w-full p-3 bg-red-500 rounded-xl mb-5 flex gap-4 text-white">
                    <div className="my-auto">
                        <MdOutlineErrorOutline size="1.5em"/>
                    </div>
                    {errorMessage}
                </div>
        : <></>}

        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="sr-only">User ID</label>
            <input name="username" onChange={handleUserID} type="text" id="username" className="w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="User ID" required />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input name="password" onChange={handlePassword} type="password" id="password" className="w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Password" required />
          </div>
        </form>
        <button type="submit" onClick={handleSubmit} className="w-full mt-6 py-2 px-4 text-center bg-violet-600 text-white font-bold rounded-md hover:bg-violet-700 focus:outline-none">Submit</button>
        <a href="/auth/forgot-password">
            <p className="text-center italic text-violet-600 hover:text-violet-700 hover:font-bold mt-5 transition-all">Forgot Password</p>
        </a>
        
      </div>
    </div>
  )
}

