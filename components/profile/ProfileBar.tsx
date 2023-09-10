// import Image from "next/image";
// import { useState, useEffect, useContext } from "react";
// import type { Reward } from "../../types/profile";
// import styles from "../../styles/ProfileBar.module.css";
// import Link from "next/link";
// import SignInBar from "./SignInBar";

// interface PropTypes {
//   credits: number;
//   username: string;
//   group: string;
//   pfp: any;
//   level: number;
//   xp: {
//     achieved: number;
//     nextLevel: number;
//   };
//   rewards: Reward[];
// }

// export default function ProfileBar({
//   credits,
//   username,
//   group,
//   pfp,
//   level,
//   xp,
//   rewards,
// }: PropTypes) {
//   const [xpPercent, setXpPercent] = useState("0%");
//   const signedIn = false; // TODO!

//   // Format the xp achieved % for the progress bar
//   useEffect(() => {
//     setXpPercent(
//       Math.floor((xp.achieved / xp.nextLevel) * 100).toString() + "%"
//     );
//   }, [xp.achieved, xp.nextLevel, level]);

//   if (!signedIn) {
//     return <SignInBar />;
//   } else {
//     return (
//       <div className=" w-1/4 bg-profile-bar rounded-3xl flex flex-col items-center border-[#36204E] border-2 mb-12 ">
//         <div className="w-full px-4">
//           <div className="bg-[#1C0E2F] rounded-2xl border-[#36204E] border-2  container py-6 flex justify-center items-center gap-4 tracking-wider w-full  mt-6">
//             <Image
//               src="/OZCurrencyAmount.png"
//               alt="OZ Currency"
//               height="35"
//               width="35"
//             />
//             <p className="text-xl font-bold">
//               {credits.toLocaleString("en-US")}
//             </p>
//           </div>
//         </div>
//         <h3 className="text-center text-3xl font-bold tracking-wider mt-5">
//           {username}
//         </h3>
//         <h3 className="text-center text-xl tracking-wider mt-3 text-gray-500">
//           {group}
//         </h3>
//         <div className="mt-6 relative">
//           <Image src={pfp} alt="Profile Picture" height="130" width="130" />
//           <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-5 py-1 bg-orange-500 rounded-full flex items-center justify-center gap-1">
//             <span className="text-sm ">LVL</span>
//             <span className="text-lg font-bold">{level}</span>
//           </div>
//         </div>

//         <div className="flex mt-8 w-full gap-4 justify-between items-center text-[#634783]">
//           <p className="pl-5">{level}</p>
//           <div className="bg-[#160C25] w-full rounded-full h-2.5">
//             <div
//               className={`${styles.progressGradient} h-2.5 rounded-full`}
//               style={{
//                 width: xpPercent,
//               }}
//             ></div>
//           </div>
//           <p className="pr-5">{level + 1}</p>
//         </div>
//         <p className="text-[#634783]">
//           ({xp.achieved} / {xp.nextLevel})
//         </p>

//         <div className="mt-6 border-t-2 border-[#36204E] w-full">
//           <h3 className="text-center text-2xl font-bold my-4">
//             AIRDROP REWARDS
//           </h3>
//           {rewards.map((reward: Reward, i: number) => (
//             <AirdropReward reward={reward} i={i} key={reward.id}/>
//           ))}
//         </div>

//         <div className="mt-6 border-t-2 border-[#36204E] w-full flex justify-center items-center">
//           <Link href="/metahomes">
//             <button className="text-center text-2xl font-bold my-4 py-2 px-8 rounded-2xl bg-indigo-500 hover:opacity-80">
//               MY METAHOMES
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

// function AirdropReward({ reward, i }: { reward: Reward; i: number }) {
//   let progressPercent =
//     Math.floor(
//       (reward.progress.achieved / reward.progress.total) * 100
//     ).toString() + "%";

//   return (
//     <div className="w-full mt-4" key={i}>
//       <div className="mx-6 flex flex-col text-center">
//         <div className="flex gap-4 items-center">
//           <div className="bg-yellow-100 blur-sm p-1 rounded-full"> </div>
//           <p>{reward.name}</p>
//         </div>
//         <div className="flex gap-4">
//           <div className="bg-[#160C25] w-full rounded-full h-2.5 mt-2">
//             <div
//               className={`${styles.progressGradient} h-2.5 rounded-full`}
//               style={{
//                 width: progressPercent,
//               }}
//             ></div>
//           </div>
//           <p className="tracking-widest">
//             {reward.progress.achieved}/{reward.progress.total}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
export {}