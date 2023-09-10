// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// export default function ProfileMain() {
//   const router = useRouter();
//   const { page } = router.query;

//   // Load data according to what page you're on
//   useEffect(() => {
//     if (!page) {
//       // load normal profile data
//     }
//     if (page == "staking") {
//       // load staking data
//     }
//   }, [page]);

//   type PathQuery = "profile" | "staking" | "airdrops" | "referral" | "settings";

//   return (
//     <div className="w-3/4  bg-opacity-30 ">
//       {/* Top element banner */}
//       <button className="h-72 w-full relative transition ease-in-out hover:scale-105 duration-300">
//         <Image
//           src="/TopBannerMETAHOME.png"
//           alt="Top banner metahome"
//           layout="fill"
//           objectFit="contain"
//         />
//       </button>

//       {/* Main section below */}
//       <div className="w-full bg-profile-bar rounded-3xl flex flex-col items-center border-[#36204E] border-2 mt-4 bg-opacity-60 h-80">
//         <nav className="w-full h-16 flex justify-between border-[#36204E] border-b-2">
//           <button
//             onClick={() =>
//               router.push("/profile", undefined, { shallow: true })
//             }
//             className={`w-full flex justify-center items-center text-lg font-bold hover:opacity-80 ${
//               router.query.page == undefined &&
//               "border-b-4 border-[#8767EE] animate-pulse"
//             }`}
//           >
//             Profile
//           </button>

//           <button
//             onClick={() =>
//               router.push("/profile?page=staking", undefined, { shallow: true })
//             }
//             className={`w-full flex justify-center items-center text-lg font-bold hover:opacity-80 ${
//               (router.query.page as PathQuery) == "staking" &&
//               "border-b-4 border-[#8767EE] animate-pulse"
//             }`}
//           >
//             Staking
//           </button>

//           <button
//             onClick={() =>
//               router.push("/profile?page=airdrops", undefined, {
//                 shallow: true,
//               })
//             }
//             className={`w-full flex justify-center items-center text-lg font-bold hover:opacity-80 ${
//               (router.query.page as PathQuery) == "airdrops" &&
//               "border-b-4 border-[#8767EE] animate-pulse"
//             }`}
//           >
//             Airdrops
//           </button>

//           <button
//             onClick={() =>
//               router.push("/profile?page=referral", undefined, {
//                 shallow: true,
//               })
//             }
//             className={`w-full flex justify-center items-center text-lg font-bold hover:opacity-80 ${
//               (router.query.page as PathQuery) == "referral" &&
//               "border-b-4 border-[#8767EE] animate-pulse"
//             }`}
//           >
//             Referral
//           </button>

//           <button
//             onClick={() =>
//               router.push("/profile?page=settings", undefined, {
//                 shallow: true,
//               })
//             }
//             className={`w-full flex justify-center items-center text-lg font-bold hover:opacity-80 ${
//               (router.query.page as PathQuery) == "settings" &&
//               "border-b-4 border-[#8767EE] animate-pulse"
//             }`}
//           >
//             Settings
//           </button>
//         </nav>
//       </div>
//     </div>
//   );
// }

export {}