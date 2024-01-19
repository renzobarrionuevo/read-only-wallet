import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { divideAmount } from "../functions/utils";
import { ApiPrices } from "@/types/types"; //structure of the API prices response
import { CosmoBalance, Balance, Item } from "@/types/types";

export const BalanceCosmo = ({
  walletEVMOS,
  apiPriceData,
}: {
  walletEVMOS: string;
  apiPriceData: ApiPrices | null;
}) => {
  const [showUSD, setShowUSD] = useState(true);
  const [buttonUSDPressed, setButtonUSDPressed] = useState(true);
  const [buttonEURPressed, setButtonEURPressed] = useState(false);
  const [total, setTotal] = useState(0);
  const [respuestaAPI, setRespuestaAPI] = useState<Item[]>([]);

  // Function to map the API response
  const mapApiResponse = (
    balances: Balance[],
    prices: ApiPrices | null
  ): Item[] => {
    return balances.map((balance) => {
      // Convert "aevmos" a "evmos"
      const denom =
        balance.denom === "aevmos"
          ? "evmos"
          : balance.denom === "uosmo"
          ? "osmosis"
          : balance.denom === "uusdc"
          ? "usd-coin"
          : balance.denom === "weth-wei"
          ? "weth"
          : balance.denom === "uusdt"
          ? "tether"
          : balance.denom;

      return {
        name: denom,
        token: denom,
        amount: divideAmount(balance.amount, balance.denom),
        priceUSD: prices?.[denom]?.usd.toString() || "0",
        priceEUR: prices?.[denom]?.eur.toString() || "0",
      };
    });
  };

  // Function to make a GET request and return a mapped response
  const fetchData = async (walletEVMOS: string) => {
    if (walletEVMOS === "") return { mappedResponseAPI: [] };
    try {
      // Make the GET request to the desired URL
      const response: AxiosResponse<CosmoBalance> = await axios.get(
        "https://rest.evmos.lava.build/cosmos/bank/v1beta1/balances/" +
          walletEVMOS
      );

      // // data: object of type CosmoBalance that stores the balances array.
      const data: CosmoBalance = response.data;

      return {
        mappedResponseAPI: mapApiResponse(data.balances, apiPriceData),
      };
    } catch (error) {
      // Handle errors in case the request fails
      console.error("Error al realizar la solicitud GET:", error);
      return { mappedResponseAPI: [] };
    }
  };
  //This hook executes fetchData every time there is a change in the wallet and updates the values
  useEffect(() => {
    //Function that executes fetchData and calculates the total of the balances in USD or EUR
    const fetchDataAndCalculateTotal = async () => {
      try {
        const { mappedResponseAPI } = await fetchData(walletEVMOS);

        if (mappedResponseAPI) {
          // Update the state with the mapped balances
          setRespuestaAPI(mappedResponseAPI);

          // Calculate the total based on the selected currency
          let sum = 0;
          mappedResponseAPI.forEach((mappedResponseAPI) => {
            sum += showUSD
              ? parseFloat(mappedResponseAPI.amount) *
                parseFloat(mappedResponseAPI.priceUSD)
              : parseFloat(mappedResponseAPI.amount) *
                parseFloat(mappedResponseAPI.priceEUR);
          });

          setTotal(sum);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
        setRespuestaAPI([]); // Handle the error and set responseAPI to an empty array
      }
    };

    fetchDataAndCalculateTotal();
  }, [showUSD, walletEVMOS]);

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
    <div className="w-full md:w-1/2">
      <div className="mx-auto flex flex-row rounded-t-xl bg-[#262017] px-5 pb-2 pt-3 text-white">
        <div className="w-1/2">
          <p className="text-left font-bold text-[#ED4E33] pt-1">
            BALANCE COSMO
          </p>
        </div>
        <div className="w-1/2 flex justify-end space-x-2">
          <button
            className={`px-3 py-1 bg-stone-700 text-white rounded-xl ${
              buttonUSDPressed ? "bg-stone-900 text-stone-600" : "bg-stone-600"
            }`}
            onClick={handleUSDClick}
          >
            USD
          </button>
          <button
            className={`px-3 py-1 bg-stone-700 text-white rounded-xl ${
              buttonEURPressed ? "bg-stone-900 text-stone-600" : "bg-stone-600"
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
            <div className="flex flex-row pt-4" key={"balanceCosmo" + i}>
              <div className="w-1/2">
                <p className="text-left">{e.name}</p>
              </div>
              <div className="w-1/2">
                <p className="text-right">
                  {showUSD
                    ? (parseFloat(e.priceUSD) * parseFloat(e.amount)).toFixed(2)
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
