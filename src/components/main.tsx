import { useEffect, useMemo, useState } from "react";
import { Address } from "./address";
import { Balance } from "./balance";
import { Transactions } from "./transactions";
import WalletButtons from "./walletButtons";
import { ethToEvmos, evmosToEth } from "@evmos/address-converter";
import axios, { AxiosResponse } from "axios";

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
  weth: {
    usd: number;
    eur: number;
  };
  tether: {
    usd: number;
    eur: number;
  };
};

export const Main = () => {
  const [wallet, setWallet] = useState("");
  const [apiPriceData, setApiPriceData] = useState<ApiPrices | null>(null);

  const walletETH = useMemo(() => {
    if (!wallet.startsWith("0x") && !wallet.startsWith("evmos")) {
      return "";
    }
    if (wallet.startsWith("0x")) {
      return wallet;
    } else {
      return evmosToEth(wallet);
    }
  }, [wallet]);

  const walletEVMOS = useMemo(() => {
    if (!wallet.startsWith("0x") && !wallet.startsWith("evmos")) {
      return "";
    }
    if (wallet.startsWith("evmos")) {
      return wallet;
    } else {
      return ethToEvmos(wallet);
    }
  }, [wallet]);

  // Función para hacer una solicitud GET
  const fetchData = async () => {
    try {
      // Realizar la solicitud GET a la URL de coingecko
      const response: AxiosResponse<ApiPrices> = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=evmos%2Cosmosis%2Cusd-coin&vs_currencies=usd%2Ceur"
      );

      // Acceder a los datos de la respuesta
      const data: ApiPrices = response.data;
      setApiPriceData(data); //almaceno los datos en el estado
      console.log(data)
      console.log(apiPriceData)
      return data; //Devuelvo los datos para 
      

    } catch (error) {
      // Manejar errores en caso de que la solicitud falle
      console.error("Error al realizar la solicitud GET:", error);
      return { data: [] };
    }
  };

  useEffect(() => {
    fetchData(); // Llamar a fetchData cuando se monte el componente
  }, []); // El segundo argumento es un arreglo de dependencias. Si está vacío, useEffect solo se ejecuta una vez.


  return (
    <div className="bg-black w-screen min-h-screen absolute">
      <WalletButtons setWallet={setWallet} />
      <Address wallet={wallet} setWallet={setWallet} walletETH={walletETH} walletEVMOS={walletEVMOS} />
      <Balance walletETH={walletETH} walletEVMOS={walletEVMOS} apiPriceData={apiPriceData}/>
      <Transactions />
    </div>
  );
};
