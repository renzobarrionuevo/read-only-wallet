import React, { useState, useEffect } from "react";
import Image from "next/image";
import ExpandDown from "@/../public/assets/expand-down.svg";
import { getTransactionCount } from "@wagmi/core";
import { config } from "../contracts/config";
import axios, { AxiosResponse } from "axios";
import { TxHistory, TxResponse } from "@/types/txType";
import { divideAmount } from "../functions/utils";
import { HashString } from "@/functions/walletUtils";
import { useMediaQuery } from "@chakra-ui/react";

type Itemtx = {
  type: [];
  hash: string;
  age: string;
};

export const Transactions = ({ walletEVMOS }: { walletEVMOS: string }) => {
  const [showItems, setShowItems] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [respuestaAPI, setRespuestaAPI] = useState<Itemtx[]>([]);
  const [isSmallScreen] = useMediaQuery("(max-width: 1037px)");

  const mapApiResponse = (tx_responses: TxResponse[]): Itemtx[] => {
    return tx_responses.map((txres) => {
      const typeMessage =
        //@ts-ignoreignore
        txres.tx.body.messages;
      console.log("typeMessages:", typeMessage);
      return {
        type: typeMessage,
        hash: txres.txhash,
        age: txres.timestamp,
      };
    });
  };

  const fetchData = async (walletEVMOS: string) => {
    if (walletEVMOS === "") return { mappedResponseAPI: [] };
    try {
      // Make the GET request to the desired URL
      const response: AxiosResponse<TxHistory> = await axios.get(
        "https://rest.evmos.lava.build/cosmos/tx/v1beta1/txs?events=transfer.recipient='" +
          walletEVMOS +
          "'&order_by=2"
      );
      console.log("response", response);

      const data: TxHistory = response.data;

      console.log("data", data);
      return {
        mappedResponseAPI: mapApiResponse(data.tx_responses),
      };
    } catch (error) {
      // Handle errors in case the request fails
      console.error("Error al realizar la solicitud GET:", error);
      return { mappedResponseAPI: [] };
    }
  };

  useEffect(() => {
    //Function that executes fetchData and calculates the total of the balances in USD or EUR
    const fetchDataAndCalculateTotal = async () => {
      try {
        const { mappedResponseAPI } = await fetchData(walletEVMOS);
        console.log("Mapped Response API:", mappedResponseAPI);
        if (mappedResponseAPI) {
          // Update the state with the mapped balances
          setRespuestaAPI(mappedResponseAPI);

          // Calculate the total based on the selected currency
        }
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
        setRespuestaAPI([]); // Handle the error and set responseAPI to an empty array
      }
    };

    fetchDataAndCalculateTotal();
  }, [walletEVMOS]);

  const toggleItems = () => {
    setShowItems(!showItems);
    setButtonPressed(!buttonPressed); // Toggle the state of the button.
  };

  return (
    <div className="w-5/6 mx-auto mt-5 md:w-2/3">
      <div className="flex flex-row rounded-xl bg-[#262017] py-3 px-5 text-white">
        <div className="w-1/2">
          <p className="text-left font-bold text-[#ED4E33] pt-1">
            TRANSACTIONS
          </p>
        </div>
        <div className="w-1/2 flex justify-end items-center space-x-2">
          <button
            className={`px-3 py-1 bg-stone-600 text-white rounded-xl ${
              buttonPressed ? "bg-stone-600" : "bg-stone-900"
            }`}
            onClick={toggleItems}
          >
            <Image
              src={ExpandDown}
              alt="Expand"
              className={`w-5 h-5 object-cover"transform ${
                buttonPressed ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>

      {showItems && (
        <div className="mt-1 flex-col">
          {respuestaAPI.map((e: Itemtx, i: number) => {
            return (
              <div className="flex flex-row my-1" key={"transactions" + i}>
                <div className="w-full pt-3 flex-col rounded-xl bg-stone-900 px-5 pb-5 text-white">
                  <div className="flex items-baseline space-x-1 mt-1">
                    <p className="text-stone-500">Hash: </p>
                    {isSmallScreen ? (
                      // Only apply HashString if screen is smaller than 767px           
                      <a href={`https://escan.live/tx/` + e.hash} target="_blank">
                      <p>{HashString(e.hash)}</p>
                    </a>
                    ) : (
                      // For larger screens
                      <a href={`https://escan.live/tx/` + e.hash} target="_blank">
                      <p>{e.hash}</p>
                    </a>
                    )}
                  </div>
                  <div className="flex items-baseline space-x-1 mt-2">
                    <p className="text-stone-500">Type:</p>
                    <div className="w-5/6 py-2 bg-stone-800 rounded-md md:w-2/3">
                      {e.type.map((item, index: number) => (
                        <p
                          key={"type" + index}
                          className="rounded-full px-2 text-sm text-stone-400"
                        >
                          {item["@type"]}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-1 mt-2">
                    <p className="text-stone-500">Age:</p>
                    <p className="text-ms">{e.age}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
