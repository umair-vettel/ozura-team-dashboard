// import { useContext, useCallback } from "react";
// import Connection from "./Connection";
// import web3Modal from "./modalObj";
// import { providers } from "ethers";

// interface PropTypes {
//   disabled: boolean;
// }

// export default function ConnectButton({ disabled }: PropTypes) {
//   const [state, dispatch] = useContext(Connection);
//   const { provider, web3Provider, address, chainId } = state;

//   const connect = useCallback(async function () {
//     // This is the initial `provider` that is returned when
//     // using web3Modal to connect. Can be MetaMask or WalletConnect.
//     try {
//       const provider = await web3Modal.connect();
//       // We plug the initial `provider` into ethers.js and get back
//       // a Web3Provider. This will add on methods from ethers.js and
//       // event listeners such as `.on()` will be different.
//       const web3Provider = new providers.Web3Provider(provider);
//       const signer = web3Provider.getSigner();
//       const address = await signer.getAddress();
//       const network = await web3Provider.getNetwork();
//       dispatch({
//         type: "SET_WEB3_PROVIDER",
//         provider,
//         web3Provider,
//         address,
//         chainId: network.chainId,
//       });
//     } catch (e: any) {
//       console.log(e.message);
//     }
//   }, []);

//   // First checks if the wallet has already been connected to another account
//   // Then call connect()
//   async function connectWallet() {
//     console.log("poopoo");
//     await connect();
//   }

//   const disconnect = async () => {
//     await web3Modal.clearCachedProvider();
//     if (provider?.disconnect && typeof provider.disconnect === "function") {
//       await provider.disconnect();
//     }
//     dispatch({
//       type: "RESET_WEB3_PROVIDER",
//     });
//   };

//   return (
//     <button
//       onClick={connectWallet}
//       className={`w-full text-center text-2xl font-bold mt-4 py-2 rounded-full ${
//         disabled ? "bg-gray-500 opacity-50" : "bg-indigo-900 hover:opacity-80"
//       }  ${disabled && "disabled"}`}
//       title={
//         disabled
//           ? "Provide info for the fields above before connecting a wallet"
//           : "Connect your wallet"
//       }
//       disabled={disabled}
//     >
//       Connect A Wallet
//     </button>
//   );
// }

export {}