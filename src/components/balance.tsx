import { BalanceEth } from "./balanceEth";
import { BalanceCosmo } from "./balanceCosmo";

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



export const Balance = ( { walletETH, walletEVMOS, apiPriceData }:{ walletETH: string, walletEVMOS: string, apiPriceData: ApiPrices | null } ) => {

  return (
    <div className="w-2/3 flex flex-row mx-auto mt-5">
      <BalanceEth walletETH={walletETH}/>
      <BalanceCosmo walletEVMOS={walletEVMOS} apiPriceData={apiPriceData}/>
      
    </div>
  );
};
