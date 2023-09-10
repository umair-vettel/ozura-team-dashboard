/* This example requires Tailwind CSS v2.0+ */
import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, MenuIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { GrOverview, GrUserAdmin, GrSettingsOption } from "react-icons/gr";
import {
  GiMagnifyingGlass,
  GiAbstract047,
  GiAbstract053,
  GiBigGear,
} from "react-icons/gi";
import { BiBarChartSquare } from "react-icons/bi";
import { IoIosSwap } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { RxGear } from "react-icons/rx";
import { IconButton, Button, Menu, MenuItem, Avatar, Box } from "@mui/material";
import gradients from "../styles/Gradients.module.css";
import { lightTheme, darkTheme } from "../pages/theme";
import { ThemeContext } from "../pages/ThemeContext";
import { Switch } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

type navigationPoint = {
  name: string;
  href: string;
  icon: {
    current: string;
    noncurrent: string;
  };
  current: boolean;
};

const overviewIcon = () => {
  return <GrOverview />;
};

const OverviewIcon: any = [
  <div key="Overview">
   <IconButton aria-label="overview" sx={{ color: "primary.main ", backgroundColor: "primary.main",}}>
    <BarChartIcon 
  fontSize="large"
   />
</IconButton>
  </div>,
];
const LookupIcon: any = [
  <div key="Lookup">
<IconButton aria-label="overview" sx={{ color: "primary.main ", backgroundColor: "primary.main",}}>
    <SearchIcon
  fontSize="large"
   />
</IconButton>  </div>,
];
const AdminIcon: any = [
  <div key="Admin">
    <GiAbstract053 size={"1.5em"} color="#8778A4" />
  </div>,
];
const RecentTransactionsIcon: any = [
  <div key="Settings">
<IconButton aria-label="overview" sx={{ color: "primary.main ", backgroundColor: "primary.main",}}>
    <SwapHorizIcon
  fontSize="large"
   />
</IconButton>   </div>,
];

export default function Sidebar() {
  const { data: session, status }: any = useSession();

  const [darkMode, setDarkMode] = useState(false);

  const NA: any = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   console.log("session: "+session)
  // }, [status])

  const [navigation, setNavigation]: navigationPoint[] | any[] = useState();

  const setNavBarItems = () => {
    if (status !== "authenticated") {
    } else {
      if (session?.role) {
        switch (session.role) {
          case "ADMIN":
            setNavigation([
              {
                name: "Overview",
                href: "/overview",
                icon: OverviewIcon,
                current: true,
              },
              {
                name: "Transactions",
                href: "/recentTransactions",
                icon: RecentTransactionsIcon,
                current: false,
              },
              {
                name: "Transaction Search",
                href: "/lookup",
                icon: LookupIcon,
                current: false,
              },
              {
                name: "Admin Portal",
                href: "/admin",
                icon: AdminIcon,
                current: false,
              },
            ]);
            break;
          default:
            // if (navigation.some((element: {name: string;}) => element.name === "Admin Portal")){
            //   const adminIndex = navigation.findIndex((element: {name: string;}) => element.name === "Admin Portal");
            //   navigation.splice(adminIndex, 1);
            // }
            setNavigation([
              {
                name: "Overview",
                href: "/overview",
                icon: OverviewIcon,
                current: true,
              },
              {
                name: "Transactions",
                href: "/recentTransactions",
                icon: RecentTransactionsIcon,
                current: false,
              },
              {
                name: "Lookup",
                href: "/lookup",
                icon: LookupIcon,
                current: false,
              },
            ]);
            break;
        }
      }
    }
  };

  useEffect(() => {
    setNavBarItems();
  }, [session]);

  const AuthButton = () => {
    if (status == "authenticated") {
      return (
        <div className="">
          <div className="flex gap-2">
            {session?.user?.image ? (
              <Image
                src={session?.user?.image || ""}
                alt="Profile Picture"
                height={25}
                width={25}
                className="rounded-full relative bottom-1"
              />
            ) : (
              <></>
            )}

            <p className="text-sm font-medium text-white">
              {session?.user?.name}
            </p>
          </div>

          <a onClick={() => signOut()}>
            <p className="text-xs font-medium text-indigo-200 group-hover:text-white">
              Sign out
            </p>
          </a>
        </div>
      );
    } else if (status == "unauthenticated") {
      return (
        <div className="ml-3">
          <a onClick={() => signIn()}>
            <p className="text-xs font-medium text-indigo-200 group-hover:text-white">
              Sign In
            </p>
          </a>
        </div>
      );
    } else {
      return (
        <div className="ml-3">
          <p className="text-xs font-medium text-indigo-200 group-hover:text-white">
            Loading...
          </p>
        </div>
      );
    }
  };

  const DisplayNavItems = () => {
    if (navigation?.length > 0) {
      return (
        <div className="flex flex-col justify-between">
          {navigation.map((item: any, i: number) => (
          <Link href={item.href} key={item.name}>
          <button className={"flex text-md text-sidebartext font-montserratRegular w-full rounded-lg transition-all"}>
            <div className="flex justify-center items-center gap-4 px-10 p-3 w-full">
              <div className="place-items-center">{item.icon}</div>
            </div>
          </button>
        </Link>
          ))}
          <Link href={"/settings"}>
            <button
              className={
                "flex py-2 px-1 w-max justify-center text-lg font-medium rounded-lg rounded-l-lg hover:bg-slate-200/50"
              }
            >
              <div className="flex rounded-l-lg gap-2">
                <div className="my-auto rounded-l-lg">
                  <div key="Settings">
                    <GiBigGear size={"1.5em"} color="white" />
                  </div>
                </div>
                <p className="">Settings</p>
              </div>
            </button>
          </Link>
        </div>
      );
    }
  };

  const DisplayMobileNavItems: any = () => {
    if (navigation?.length > 0) {
      return (
        <div className="flex flex-col justify-between">
          {navigation.map((item: any, i: number) => (
            <Link href={item.href} key={item.name}>
              <button
                onClick={() => setSidebarOpen(false)}
                key={i}
                className={
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                }
              >
                <Image
                  src={
                    router.pathname == item.href
                      ? item.icon.current
                      : item.icon.noncurrent
                  }
                  alt={item.name}
                  height="60"
                  width="60"
                />
              </button>
            </Link>
          ))}
        </div>
      );
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const handleAccountMenuClick = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <div>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-sidebar-purple">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className=" flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <nav className="flex-1 flex flex-col justify-between items-center space-y-3 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                      <Image
                        className="h-8 w-auto"
                        src="/OZCurrencyAmount.png"
                        alt="Ozura Icon"
                        height="50"
                        width="50"
                      />
                    </div>

                    <DisplayMobileNavItems />
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}

        <div className="hidden md:flex md:w-46 md:flex-col pl-8 pt-8 pb-8 md:fixed md:inset-y-0">
          {/* Sidebar component */}

          <Box
            bgcolor="primary.main"
            height='100%'
            width="80%"
            p={3}
            borderRadius={8}
            position="relative"
          >

            <nav className="flex-1 flex flex-col text-center justify-between gap-12 overflow-y-auto">

              <div
                className={`flex flex-shrink-0 px-4 pb-12  relative ${
                  NA?.status == "authenticated" ? "" : ""
                }`}
              >

              </div>

              {navigation?.map((item: any, i: number) => (
                <Link href={item.href} key={item.name}>
    <button className={"flex justify-center items-center text-md w-full rounded-lg transition-all"}>
                <div className="place-items-center">{item.icon}</div>
            
            </button>
                </Link>
              ))}

              {status === "authenticated" ? (
                <div className="relative">
                  <div className="border-t border-textoverlay w-2/3 mx-auto py-5 my-4" />
                  <Link href={"/settings"}>
                    <button
                      className={
                        "flex px-1 w-full text-md text-sidebartext font-montserratRegular rounded-lg  pr-2 transition-all"
                      }
                    >
                      <div className="flex text-left gap-4 px-10 p-3 w-full">
                        <div className="place-items-start">
                          <RxGear size={"1.3em"} color="sidebartext" />
                        </div>
                      </div>
                    </button>
                  </Link>
                  {/* Account Menu Button */}
                </div>
              ) : null}
            </nav>
            <div className="flex-shrink-0 flex pt-44 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    {/*<img*/}
                    {/*  className="inline-block h-9 w-9 rounded-full"*/}
                    {/*  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
                    {/*  alt=""*/}
                    {/*/>*/}
                  </div>
                  {/* <AuthButton /> */}
                  {status == "authenticated" ? (
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      className="w-full rounded-lg hover:bg-sidebarbutton p-3"
                      style={{
                        color: "#8b7da9",
                        fontFamily: "'Montserrat', sans-serif",
                        textTransform: "none",
                        fontWeight: 400,
                      }}
                      id="account-button"
                    >
                      Account
                    </Button>
                  ) : (
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={() => signIn()}
                      className="w-full rounded-lg hover:bg-sidebarbutton p-3"
                      style={{
                        color: "#8b7da9",
                        fontFamily: "'Montserrat', sans-serif",
                        textTransform: "none",
                        fontWeight: 400,
                      }}
                      id="account-button"
                    >
                      Sign In
                    </Button>
                  )}

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    MenuListProps={{
                      className: "text-sidebartext font-montserratRegular",
                    }}
                    PaperProps={{
                      style: {
                        backgroundColor: "#1f1733", // Background color of the popup menu
                        border: "1px solid #4f4761", // Border around the popup menu
                      },
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      className="text-md hover:bg-sidebarbutton p-2"
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className="text-md hover:bg-sidebarbutton p-2"
                    >
                      Switch account
                    </MenuItem>
                    <MenuItem
                      onClick={() => signOut()}
                      className="text-md hover:bg-sidebarbutton p-2"
                    >
                      Sign out
                    </MenuItem>
                  </Menu>
                </div>
              </a>
            </div>
          </Box>
        </div>
        <div className="md:pl-40 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className=" -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Main stuff goes in here*/}
        </div>
      </ThemeProvider>
    </div>
  );
}
