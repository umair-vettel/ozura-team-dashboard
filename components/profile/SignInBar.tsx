
// import { useState, useEffect } from "react";
// import CreateAccButton from "./CreateAccButton";

// // Handles sign up and sign in
// export default function SignInBar() {
//   const [signUp, setSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [connectButtonDisabled, setConnectButtonDisabled] = useState(true);
//   const [createAccDisabled, setCreateAccDisabled] = useState(true);

//   // Show the connect wallet button if fields are filled out
//   useEffect(() => {
//     if (email && username && password && email.includes("@")) {
//       setConnectButtonDisabled(false);
//     } else {
//       setConnectButtonDisabled(true);
//     }
//   }, [email, username, password]);

//   async function handleSignUp() {
//     console.log("SUBMITTING:", email, username, password);
//   }

//   async function handleSignIn() {}

//   return (
//     <div className="h-fit w-1/4 bg-profile-bar rounded-3xl flex flex-col items-center border-[#36204E] border-2 mb-12">
//       <div className="w-full px-4 mt-10 flex items-center justify-center flex-col">
//         <h1 className="text-3xl font-bold">Welcome to Ozura</h1>

//         {/* Sign Up or Sign In*/}
//         <div className="inline-flex gap-8 mt-6">
//           <button
//             type="button"
//             className={`inline-flex items-center px-5 py-2 border-transparent text-base font-medium rounded-full shadow-sm text-white hover:opacity-80   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
//               signUp
//                 ? "bg-indigo-700 border border-indigo-300"
//                 : "opacity-50 border border-indigo-700"
//             }`}
//             onClick={() => setSignUp(true)}
//           >
//             Sign Up
//           </button>

//           <button
//             type="button"
//             className={`inline-flex items-center px-5 py-2 border-transparent text-base font-medium rounded-full shadow-sm text-white hover:opacity-80   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
//               !signUp
//                 ? "bg-indigo-700 border border-indigo-300"
//                 : "opacity-50 border border-indigo-700"
//             }`}
//             onClick={() => setSignUp(false)}
//           >
//             Sign In
//           </button>
//         </div>

//         {/* Display "Create an Account" or "Welcome Back"*/}
//         <h3 className="mt-6 text-2xl font-bold">
//           {signUp ? "Create an Account" : "Sign In"}
//         </h3>

//         {signUp && (
//           <>
//             <div className="space-y-5 w-full mt-2 mb-5">
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block mb-2 text-sm font-medium text-gray-200"
//                 >
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   autoComplete="off"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//                   placeholder="Your account name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-gray-200"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   autoComplete="off"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//                   placeholder="example@ozura.io"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-gray-200"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   autoComplete="off"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="shadow-sm bg-sidebar-purple mb-4 bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//                   placeholder="GoodguyAtThat456"
//                   required
//                 />
//               </div>

//               <ConnectButton disabled={connectButtonDisabled} />

//               <CreateAccButton
//                 disabled={createAccDisabled}
//                 handleSignUp={handleSignUp}
//               />
//             </div>
//           </>
//         )}

//         {!signUp && (
//           <>
//             <form className="space-y-8 w-full mt-2" onSubmit={handleSignIn}>
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block mb-2 text-sm font-medium text-gray-200"
//                 >
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   autoComplete="off"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//                   placeholder="Username"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-gray-200"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   autoComplete="off"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//                   placeholder="Email"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-gray-200"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   autoComplete="off"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
//                   placeholder="Password"
//                   required
//                 />
//               </div>
//               sign in button
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

export {}