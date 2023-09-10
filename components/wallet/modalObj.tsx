// import WalletConnectProvider from "@walletconnect/web3-provider";
// import WalletLink from "@coinbase/wallet-sdk";
// import Web3Modal from "web3modal";

// const INFURA_ID = "0c68a940fc004b15ae7939c322b45d9a";

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider,
//     options: {
//       infuraId: INFURA_ID, // required
//     },
//   },
//   "custom-walletlink": {
//     display: {
//       logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
//       name: "Coinbase",
//       description: "Connect to Coinbase Wallet (not Coinbase App)",
//     },
//     options: {
//       appName: "Coinbase",
//       networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
//       chainId: 1,
//     },
//     package: WalletLink,
//     connector: async (_: any, options: any) => {
//       const { appName, networkUrl, chainId } = options;
//       const walletLink = new WalletLink({
//         appName,
//       });
//       const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
//       await provider.enable();
//       return provider;
//     },
//   },
// };
// let web3Modal: any;
// if (typeof window !== "undefined") {
//   web3Modal = new Web3Modal({
//     network: "rinkeby",
//     cacheProvider: true,
//     providerOptions, // required
//   });
// }

// export default web3Modal;

export {}