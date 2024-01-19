import { useEffect, useMemo, useState } from "react";
import { Address } from "./address";
import { Balance } from "./balance";
import { Transactions } from "./transactions";
import WalletButtons from "./walletButtons";
import { ethToEvmos, evmosToEth } from "@evmos/address-converter";
import axios, { AxiosResponse } from "axios";
import { ApiPrices } from "@/types/types";

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

  // Function to make a GET Price request
  const fetchData = async () => {
    try {
      // Make the GET request to the coingecko URL
      const response: AxiosResponse<ApiPrices> = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=evmos%2Cosmosis%2Cusd-coin&vs_currencies=usd%2Ceur"
      );

      // Access response data
      const data: ApiPrices = response.data;
      setApiPriceData(data); //Store the data in the state

      return data;
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
      return { data: [] };
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when component is mounted
  }, []); // The second argument is a dependency array. If empty, useEffect is only executed once.

  return (
    <div className="bg-black w-screen min-h-screen absolute">
      <WalletButtons setWallet={setWallet} />
      <Address
        wallet={wallet}
        setWallet={setWallet}
        walletETH={walletETH}
        walletEVMOS={walletEVMOS}
      />
      <Balance
        walletETH={walletETH}
        walletEVMOS={walletEVMOS}
        apiPriceData={apiPriceData}
      />
      <Transactions walletEVMOS={walletEVMOS} />
    </div>
  );
};
