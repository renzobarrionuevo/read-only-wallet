import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import metamaskLogo from "../../public/assets/metamask-logo.png";
import keplerLogo from "../../public/assets/kepler-logo.png";
import { getKeplrAddress, getMetamaskAddress } from "./wallet";

const WalletButtons = ({
  setWallet,
}: {
  setWallet: Dispatch<SetStateAction<string>>;
}) => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [keplerConnected, setKeplerConnected] = useState(false);

  const handleMetamaskClick = async () => {
    const wallet = await getMetamaskAddress();
    setWallet(wallet);
    setMetamaskConnected(!metamaskConnected);
    setKeplerConnected(false);
  };

  const handleKeplerClick = async () => {
    const wallet = await getKeplrAddress();
    setWallet(wallet);
    setKeplerConnected(!keplerConnected);
    setMetamaskConnected(false);
  };

  return (
    <div className="flex justify-end space-x-4 w-5/6 mx-auto m-2 mt-5 md:w-2/3">
      <button
        className={`rounded-full  text-white p-2 border-stone-300 border focus:outline-none transform transition-all ${
          metamaskConnected ? "w-50 bg-[#262017]" : "w-10"
        }`}
        onClick={handleMetamaskClick}
      >
        {metamaskConnected ? (
          <span>Metamask connected</span>
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src={metamaskLogo}
              alt="Metamask"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </button>
      <button
        className={`rounded-full border-stone-300 border text-white p-2 focus:outline-none transform transition-all ${
          keplerConnected ? "w-50 bg-[#262017]" : "w-10"
        }`}
        onClick={handleKeplerClick}
      >
        {keplerConnected ? (
          <span>Kepler connected</span>
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src={keplerLogo}
              alt="Kepler"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default WalletButtons;
