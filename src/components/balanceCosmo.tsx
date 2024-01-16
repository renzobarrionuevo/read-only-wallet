import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

type Item = {
  name: string;
  token: string;
  amount: string;
  priceUSD: string;
  priceEUR: string;
};

// Definir el tipo de los datos que esperas recibir
type CosmoBalance = {
  balances: Balance[];
  pagination: Pagination;
};

type Balance = {
  denom: string;
  amount: string;
};

type Pagination = {
  next_key: any;
  total: string;
};

// Definir un tipo para los precios de las monedas (posiblemente lo tengo que sacar)
type Prices = {
  [denom: string]: {
    priceUSD: string;
    priceEUR: string;
  };
};

// Defino la estructura del llamado a precios
type ApiPrices = {
  [denom: string]: {
    usd: number;
    eur: number;
  };
  evmos: {
    usd: number;
    eur: number;
  };
  osmosis: {
    usd: number;
    eur: number;
  };
  "usd-coin": {
    usd: number;
    eur: number;
  };
};

export const BalanceCosmo = ({ walletEVMOS, apiPriceData }: { walletEVMOS: string, apiPriceData: ApiPrices | null }) => {
  const [showUSD, setShowUSD] = useState(true);
  const [buttonUSDPressed, setButtonUSDPressed] = useState(true);
  const [buttonEURPressed, setButtonEURPressed] = useState(false);
  const [total, setTotal] = useState(0);
  const [respuestaAPI, setRespuestaAPI] = useState<Item[]>([]);

  // Función para mapear la respuesta de la API
  const mapApiResponse = (balances: Balance[], prices: ApiPrices | null): Item[] => {
  
    console.log('esto es apiPriceData:', apiPriceData)
    return balances.map((balance) => {
      // Convertir "aevmos" a "Evmos"
      const denom = balance.denom === "aevmos" ? "evmos" : balance.denom;
      
      console.log('esto es denom:',denom)
      return {
        name: denom,
        token: denom,
        amount: balance.amount,
        priceUSD: prices?.[denom]?.usd.toString() || "0",
        priceEUR: prices?.[denom]?.eur.toString() || "0",
      };
    });
  };

  // Función para hacer una solicitud GET
  const fetchData = async (walletEVMOS: string) => {
    if (walletEVMOS === "") return { mappedResponseAPI: []};
    try {
      // Realizar la solicitud GET a la URL deseada
      const response: AxiosResponse<CosmoBalance> = await axios.get(
        "https://rest.evmos.lava.build/cosmos/bank/v1beta1/balances/" +
          walletEVMOS
      );

      // Acceder a los datos de la respuesta
      const data: CosmoBalance = response.data;

      return {
        mappedResponseAPI: mapApiResponse(data.balances, apiPriceData),
      };
    } catch (error) {
      // Manejar errores en caso de que la solicitud falle
      console.error("Error al realizar la solicitud GET:", error);
      return { mappedResponseAPI: [] };
    }
  };

  useEffect(() => {
    const fetchDataAndCalculateTotal = async () => {
      try {
        const { mappedResponseAPI } = await fetchData(walletEVMOS);

        if (mappedResponseAPI) {
          // Actualizar el estado con los balances mapeados
          setRespuestaAPI(mappedResponseAPI);

          // Calcular el total basado en la moneda seleccionada
          let sum = 0;
          mappedResponseAPI.forEach((mappedResponseAPI) => {
            sum += showUSD
              ? parseFloat(mappedResponseAPI.amount) * parseFloat(mappedResponseAPI.priceUSD) 
              : parseFloat(mappedResponseAPI.amount) * parseFloat(mappedResponseAPI.priceEUR);
          });

          setTotal(sum);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
        setRespuestaAPI([]); // Manejar el error y establecer respuestaAPI en un arreglo vacío
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
    <div className="w-1/2 ml-1">
      <div className="mx-auto flex flex-row rounded-t-xl bg-[#423D37] px-5 pb-2 pt-3 text-white">
        <div className="w-1/2">
          <p className="text-left font-bold text-stone-900 pt-1">Balance</p>
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
            <div className="flex flex-row pt-4" key={i}>
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
