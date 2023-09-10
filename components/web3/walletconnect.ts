// import {
//     EthereumClient,
//     modalConnectors,
//     walletConnectProvider,
// } from "@web3modal/ethereum";

// import { useContext, useEffect } from "react";


// import { Web3Modal } from "@web3modal/react";

// import {configureChains, createClient, WagmiConfig } from "wagmi";

// //let chains = [chain.mainnet, chain.polygon, chain.polygonMumbai, chain.sepolia];
// import { polygon, sepolia, mainnet, polygonMumbai } from 'wagmi/chains'
// let chainsAr = [mainnet, polygon, polygonMumbai, sepolia]


// // Wagmi client
// const { provider, chains, webSocketProvider } = configureChains(chainsAr, [
//     walletConnectProvider({ projectId: "459093c3783480e7b886cff342b1d94c" }),
// ]);

// export const wagmiClient = createClient({
//     autoConnect: true,
//     connectors: modalConnectors({appName: "OzuraPay", chains}),
//     provider,
// });

// // Web3Modal Ethereum Client
// export const ethereumClient = new EthereumClient(wagmiClient, chains);


export {}