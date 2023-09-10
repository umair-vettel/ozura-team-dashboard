import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import ContextLayout from "../components/ContextLogic";
import { useEffect, useReducer } from "react";
import Sidebar from "../components/Sidebar";

import { useCallback, useContext, useState, createContext } from "react";


import { SessionProvider } from "next-auth/react"






function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {


  return (
      <SessionProvider session={session}>
        
            <ContextLayout>
              <Layout >
                  <Component {...pageProps} />
              </Layout>
            </ContextLayout>
          
      </SessionProvider>
  );
}



export default MyApp;
