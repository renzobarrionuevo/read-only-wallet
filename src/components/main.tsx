import { Address } from "./address";
import { Balance } from "./balance";
import WalletButtons from "./walletButtons";

export const Main = () => {

  return (
    <div className="bg-black h-screen w-screen absolute">
      <WalletButtons/>
      <Address/>
      <Balance/>
    </div>
  );
};