import { BalanceEth } from "./balanceEth";
import { BalanceCosmo } from "./balanceCosmo";
import { ApiPrices } from "@/types/types"; //structure of the API prices response


export const Balance = ( { walletETH, walletEVMOS, apiPriceData }:{ walletETH: string, walletEVMOS: string, apiPriceData: ApiPrices | null } ) => {

  return (
    <div className="w-5/6 space-y-2 mx-auto mt-5 md:space-y-0 md:space-x-4 md:w-2/3 md:flex md:flex-row">
      <BalanceEth walletETH={walletETH} apiPriceData={apiPriceData}/>
      <BalanceCosmo walletEVMOS={walletEVMOS} apiPriceData={apiPriceData}/>
      
    </div>
  );
};
