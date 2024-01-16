import React, { useState, useEffect, useMemo } from "react";
import axios, { AxiosResponse } from "axios";

type Item = {
  name: string;
  token: string;
  amount: string;
  priceUSD: string;
  priceEUR: string;
};

export const BalanceEth = ({ walletETH }: { walletETH: string }) => {
  const [showUSD, setShowUSD] = useState(true);
  const [buttonUSDPressed, setButtonUSDPressed] = useState(true);
  const [buttonEURPressed, setButtonEURPressed] = useState(false);
  const [total, setTotal] = useState(0);

  let respuestaAPI: Item[] = [
    {
      name: "Evmos",
      token: "Evmos",
      amount: "100",
      priceUSD: "0.11",
      priceEUR: "0.10",
    },
    {
      name: "USD Coin",
      token: "USDC",
      amount: "10",
      priceUSD: "1.1",
      priceEUR: "0.9",
    },
    {
      name: "Osmosis",
      token: "Osmo",
      amount: "1",
      priceUSD: "1.8",
      priceEUR: "1.6",
    },
  ];

  useEffect(() => {
    // Calculate the total based on the selected fiat
    let sum = 0;
    respuestaAPI.forEach((e: Item) => {
      sum += showUSD
        ? parseFloat(e.priceUSD) * parseFloat(e.amount)
        : parseFloat(e.priceEUR) * parseFloat(e.amount);
    });
    setTotal(sum);
  }, [showUSD, respuestaAPI]);

  // Modify the booleans to determine whether the values are in USD or EUR
  const handleUSDClick = () => {
    setShowUSD(true);
    setButtonUSDPressed(true);
    setButtonEURPressed(false);
  };

  const handleEURClick = () => {
    setShowUSD(false);
    setButtonUSDPressed(false);
    setButtonEURPressed(true);
  };

  return (
      <div className="w-1/2">
        <div className="mx-auto flex flex-row rounded-t-xl bg-[#423D37] px-5 pb-2 pt-3 text-white">
          <div className="w-1/2">
            <p className="text-left font-bold text-stone-900 pt-1">Balance ETH</p>
          </div>
          <div className="w-1/2 flex justify-end space-x-2">
            <button
              className={`px-3 py-1 bg-stone-700 text-white rounded-xl ${
                buttonUSDPressed
                  ? "bg-stone-900 text-stone-600"
                  : "bg-stone-600"
              }`}
              onClick={handleUSDClick}
            >
              USD
            </button>
            <button
              className={`px-3 py-1 bg-stone-700 text-white rounded-xl ${
                buttonEURPressed
                  ? "bg-stone-900 text-stone-600"
                  : "bg-stone-600"
              }`}
              onClick={handleEURClick}
            >
              EUR
            </button>
          </div>
        </div>
        <div className="mx-auto flex-col bg-stone-900 px-5 pb-5 text-white">
          {respuestaAPI.map((e: Item, i: number) => {
            return (
              <div className="flex flex-row pt-4" key={i}>
                <div className="w-1/2">
                  <p className="text-left">{e.name}</p>
                </div>
                <div className="w-1/2">
                  <p className="text-right">
                    {showUSD
                      ? (parseFloat(e.priceUSD) * parseFloat(e.amount)).toFixed(
                          2
                        )
                      : (parseFloat(e.priceEUR) * parseFloat(e.amount)).toFixed(
                          2
                        )}{" "}
                    {showUSD ? "USD" : "EUR"}
                  </p>
                  <p className="text-right text-xs text-stone-500">
                    {e.amount} {e.token}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mx-auto flex flex-row rounded-b-xl bg-[#262017] px-5 py-4 text-white">
          <div className="w-1/2">
            <p className="text-left font-bold text-white">Total</p>
          </div>
          <div className="w-1/2 flex justify-end items-center space-x-2">
            <p>
              {total.toFixed(2)} {showUSD ? "USD" : "EUR"}
            </p>
          </div>
        </div>
      </div>
  );
};
