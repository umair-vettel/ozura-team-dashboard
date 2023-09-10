import type { NextPage } from "next";
import { GetServerSideProps } from "next";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
import PuffLoader from "react-spinners/PuffLoader";
import {
  AiFillInfoCircle,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineSearch,
} from "react-icons/ai";

interface PropTypes {}
type merchantData = {
  name: string;
};

const Overview: NextPage<PropTypes> = (prop: PropTypes) => {
  const [merchant, setMerchant] = useState(false);
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  type ExpandedState = { [key: string]: boolean };
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const { userName } = router.query;

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getMerchantTransactions = async () => {
      setLoading(true);
      await fetch("/api/getMerchantTransactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          merchantid: "",
        },
        body: JSON.stringify({
          merchantUser: userName,
        }),
      })
        .then((res) => res.json())
        .then((revData) => {
          if (revData.success == true) {
            setLoading(false);
            setTransactions(revData.transactions);
            return revData;
          }
        });
    };
    getMerchantTransactions();
  }, []);

  console.log(transactions);

  const getStateColor = (stateType) => {
    switch (stateType) {
      case "success":
        return "bg-emerald-500 text-white px-2 py-1 rounded-full drop-shadow-sm hover:bg-emerald-400 transition-all duration-150";
      case "pending":
        return "bg-amber-400 text-white px-2 py-1 rounded-full drop-shadow-sm hover:bg-amber-300 transition-all duration-150";
      case "fail":
        return "bg-rose-500 text-white px-2 py-1 rounded-full drop-shadow-sm hover:bg-rose-400 transition-all duration-150";
      case "refund":
        return "bg-sky-500 text-white px-2 py-1 rounded-full drop-shadow-sm hover:bg-sky-400 transition-all duration-150";
    }
  };
  const GetStateIcon = (prop: any) => {
    switch (prop.stateType) {
      case "success":
        return <AiFillCheckCircle className="fill-white relative top-1" />;
      case "pending":
        return <AiFillInfoCircle className="fill-white relative top-1" />;
      case "fail":
        return <AiFillCloseCircle className="fill-white relative top-1" />;
      case "refund":
        return <AiFillInfoCircle className="fill-white relative top-1" />;
    }
  };

  const TransactionsDisplay = () => {
    if (transactions) {
      return (
        <div className="bg-neutral-100 text-neutral-600 text-center rounded-xl border border-2 border-violet-900 drop-shadow-md min-w-[50vw]">
          <div className="grid grid-cols-4 bg-indigo-500 text-slate-100 rounded-t-lg gap-4 p-3 text-xl">
            <p>WorldPay ID</p>
            <div>
              <p>Time</p>
            </div>

            {/* <p>Subtotal</p> */}
            <p>Total</p>
            <p>Status</p>
          </div>

          <hr className="p-[0.08vh] bg-white border-0" />
          {transactions.map((transaction) => {
            // console.log(transaction)
            if (filter !== "all") {
              if (transaction.stateType == filter) {
                return (
                  <div
                    className="grid grid-cols-4 gap-4 p-3 hover:bg-slate-300/50 rounded-xl transition-all duration-150"
                    key={transaction.trxID}
                  >
                    <p>{transaction.trxID}</p>
                    <div>
                      <p>{new Date(transaction.createdAt).toUTCString()}</p>
                    </div>
                    {/* <p>${transaction.subtotalAmount.toFixed(2)} USD</p> */}
                    <p>${transaction.total.toFixed(2)} USD</p>
                    <div
                      className={`${getStateColor(
                        transaction.stateType
                      )} flex mx-auto gap-2`}
                    >
                      <p>{transaction.state}</p>
                      <GetStateIcon stateType={transaction.stateType} />
                    </div>
                  </div>
                );
              }
            } else {
              return (
                // needed to convert expanded to an object where each property represents the ID of the tx and it's corresponding expanded state
                // this is so that when you expand one, it doesn't expand all of them
                // change the color of the expanded tx to be different from the rest
                <div
                  onClick={() =>
                    setExpanded({
                      ...expanded,
                      [transaction.id]: !expanded[transaction.id],
                    })
                  }
                >
                  <div
                    className={`grid grid-cols-4 gap-4 p-3 rounded-xl duration-150 ${
                      expanded[transaction.id]
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-slate-300/50"
                    }`}
                  >
                    <p>{transaction.trxID}</p>
                    <div>
                      <p>{new Date(transaction.createdAt).toUTCString()}</p>
                    </div>
                    {/* <p>${transaction.subtotalAmount} USD</p> */}
                    <p>${transaction.total} USD</p>
                    <div
                      className={`${getStateColor(
                        transaction.stateType
                      )} flex mx-auto gap-2`}
                    >
                      <p>{transaction.state}</p>
                      <GetStateIcon stateType={transaction.stateType} />
                    </div>
                  </div>
                  {expanded[transaction.id] && (
                    <div className="p-3 bg-gray-100 rounded-b-xl">
                      <div className="bg-white rounded-xl p-4 shadow-md">
                        <p className="text-gray-500 text-left py-1">
                          <span className="text-black font-medium">Tx ID:</span>{" "}
                          {transaction.id}
                        </p>
                        <p className="text-gray-500 text-left py-1">
                          <span className="text-black font-medium">
                            Tx Hash:
                          </span>{" "}
                          {transaction.txHash}
                        </p>
                        <p className="text-gray-500 text-left py-1">
                          <span className="text-black font-medium">
                            Tx Destination Address:
                          </span>{" "}
                          {transaction.address}
                        </p>
                        <p className="text-gray-500 text-left py-1">
                          <span className="text-black font-medium">Time:</span>{" "}
                          {new Date(transaction.createdAt).toUTCString()}
                        </p>
                        <p className="text-gray-500 text-left py-1">
                          <span className="text-black font-medium">Total:</span>{" "}
                          ${transaction.total} USD
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return (
        <div className="bg-neutral-100 text-neutral-600 text-center rounded-xl border border-2 border-violet-900 drop-shadow-md min-h-[15vh] max-h-[50vw] min-w-[50vw]">
          <div className="flex h-full justify-center items-center m-auto">
            <PuffLoader color="rgba(116, 74, 255, 1)" size="80px" />
          </div>
        </div>
      );
    }
  };

  const MerchantSearch = () => {
    return (
      <div className="mx-auto w-full">
        <div className="flex gap-20 w-full">
          <div className="basis-1/2">
            <div className="flex">
              <p className="text-xl relative top-2 mr-2">Filter: </p>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-2/3 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value=""
                      name="list-radio"
                      onClick={() => setFilter("all")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-license"
                      className="w-2/3 py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      All{" "}
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value=""
                      name="list-radio"
                      onClick={() => setFilter("success")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-license"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Success{" "}
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-id"
                      type="radio"
                      value=""
                      name="list-radio"
                      onClick={() => setFilter("pending")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-id"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Pending
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-id"
                      type="radio"
                      value=""
                      name="list-radio"
                      onClick={() => setFilter("refund")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-id"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Refunded
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-millitary"
                      type="radio"
                      value=""
                      name="list-radio"
                      onClick={() => setFilter("fail")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-millitary"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Failed
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex basis-1/2 mx-auto relative left-10">
            <select className="text-slate-500 rounded-tl-xl rounded-bl-xl text-center">
              <option>ID</option>
              {/* <option>Subtotal</option> */}
            </select>
            <input className="p-1 text-black" placeholder="63d..." />
            <div className="flex rounded-tr-xl rounded-br-xl text-slate-100 bg-indigo-500 p-2 hover:bg-indigo-400 transition-all duration-150">
              <button className="mr-3">Search</button>
              <AiOutlineSearch className="relative top-2" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DisplayMux = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        {/* <MerchantDisplay /> */}
        <MerchantSearch />
        <TransactionsDisplay />
      </div>
    );
  };

  return (
    <>
      <div></div>
      <div className="min-h-screen pt-16 mx-16 flex justify-between gap-12">
        <div className="mx-auto">
          <DisplayMux />
        </div>
      </div>
    </>
  );
};

export default Overview;
