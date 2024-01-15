import { Address } from "./address";
import { Balance } from "./balance";
import { Transactions } from "./transactions";
import WalletButtons from "./walletButtons";

export const Main = () => {

  return (
    <div className="bg-black w-screen min-h-screen absolute">
      <WalletButtons/>
      <Address/>
      <Balance/>
      <Transactions/>
    </div>
  );
};