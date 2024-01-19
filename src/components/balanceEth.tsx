import React, { useState, useEffect } from "react";
import { useBalance } from "wagmi";
import { formatWalletAddress } from "../functions/walletUtils";
import { divideAmount } from "../functions/utils";
import { ApiPrices, ETHBalance, Balance, Item } from "@/types/types";
import { useRouter } from "next/router";

export const BalanceEth = ({
  walletETH,
  apiPriceData,
}: {
  walletETH: string;
  apiPriceData: ApiPrices | null;
}) => {
  const [showUSD, setShowUSD] = useState(true);
  const [buttonUSDPressed, setButtonUSDPressed] = useState(true);
  const [buttonEURPressed, setButtonEURPressed] = useState(false);
  const [total, setTotal] = useState(0);
  const [respuestaAPI, setRespuestaAPI] = useState<Item[]>([]);

  const walletAddress = formatWalletAddress(walletETH);

  // Use the 'useBalance' hooks to retrieve wallet balances using Wagmi
  const balanceEvmos = useBalance({
    address: `0x${walletAddress}`,
    token: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
  });

  const balanceUSDC = useBalance({
    address: `0x${walletAddress}`,
    token: "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
    //axelas
  });

  const balanceWETH = useBalance({
    address: `0x${walletAddress}`,
    token: "0x50dE24B3f0B3136C50FA8A3B8ebc8BD80a269ce5",
    //axelas
  });

  const balanceOSMO = useBalance({
    address: `0x${walletAddress}`,
    token: "0xFA3C22C069B9556A4B2f7EcE1Ee3B467909f4864",
  });

  const balanceUSDT = useBalance({
    address: `0x${walletAddress}`,
    token: "0xe01C6D4987Fc8dCE22988DADa92d56dA701d0Fe0",
    //axelas
  });

  // Function that takes the results from the API Prices and Wagmi's useBalance and returns them mapped.
  const mapApiResponse = (
    balances: Balance[],
    prices: ApiPrices | null
  ): Item[] => {
    return balances.map((balance) => {
      const denom =
        balance.denom === "Evmos"
          ? "evmos"
          : balance.denom === "OSMO"
          ? "osmosis"
          : balance.denom === "USDC.axl"
          ? "usd-coin"
          : balance.denom === "WETH.axl"
          ? "weth"
          : balance.denom === "USDT.axl"
          ? "tether"
          : balance.denom;

      return {
        //The format is the same for both ETH and Cosmo.
        name: balance.denom,
        token: denom,
        amount: divideAmount(balance.amount, balance.denom),
        priceUSD: prices?.[denom]?.usd.toString() || "0",
        priceEUR: prices?.[denom]?.eur.toString() || "0",
      };
    });
  };

  //Function to fetch data from the APIs and return them mapped
  const fetchData = async (walletETH: string) => {
    if (walletETH === "") return { mappedResponseAPI: [] };
    try {
      // Create an array of balances to handle responses in the same way as in Cosmos
      const balances: Balance[] = [
        { denom: "Evmos", amount: balanceEvmos?.data?.value.toString() || "0" },
        {
          denom: "USDC.axl",
          amount: balanceUSDC?.data?.value.toString() || "0",
        },
        {
          denom: "WETH-axl",
          amount: balanceWETH?.data?.value.toString() || "0",
        },
        { denom: "OSMO", amount: balanceOSMO?.data?.value.toString() || "0" },
        {
          denom: "USDT.axl",
          amount: balanceUSDT?.data?.value.toString() || "0",
        },
      ];

      // data: object of type ETHBalance that stores the balances array.
      const data: ETHBalance = { balances };

      return {
        mappedResponseAPI: mapApiResponse(data.balances, apiPriceData),
      };
    } catch (error) {
      console.error("Error al obtener datos de saldos:", error);
      return { mappedResponseAPI: [] };
    }
  };

  //This hook executes fetchData every time there is a change in the wallet and updates the values
  useEffect(() => {
    //Function that executes fetchData and calculates the total of the balances in USD or EUR
    const fetchDataAndCalculateTotal = async () => {
      try {
        const { mappedResponseAPI } = await fetchData(walletETH);

        if (mappedResponseAPI) {
          setRespuestaAPI(mappedResponseAPI);

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
        console.error("Error al obtener datos y calcular total:", error);
        setRespuestaAPI([]);
      }
    };

    fetchDataAndCalculateTotal();
  }, [showUSD, walletETH]);

  //Function that modifies the state when pressing USD and EUR buttons
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
          <p className="text-left font-bold text-[#ED4E33] pt-1">BALANCE ETH</p>
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
        {respuestaAPI
          .filter((e) => parseFloat(e.amount) !== 0)
          .map((e: Item, i: number) => (
            <div className="flex flex-row pt-4" key={"balanceETH" + i}>
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
          ))}
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
