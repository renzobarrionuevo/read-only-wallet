import React, { useState } from 'react';
import Image from 'next/image';
import metamaskLogo from '../../public/assets/metamask-logo.png';
import keplerLogo from '../../public/assets/kepler-logo.png';

const WalletButtons = () => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [keplerConnected, setKeplerConnected] = useState(false);

  const handleMetamaskClick = () => {
    setMetamaskConnected(!metamaskConnected);
    setKeplerConnected(false);
  };

  const handleKeplerClick = () => {
    setKeplerConnected(!keplerConnected);
    setMetamaskConnected(false);
  };

  return (
    <div className="flex justify-end space-x-4 w-2/3 mx-auto m-3">
      <button
        className={`rounded-full bg-orange-500 text-white p-3 focus:outline-none transform transition-all ${
          metamaskConnected ? 'w-50' : 'w-12'
        }`}
        onClick={handleMetamaskClick}
      >
        {metamaskConnected ? (
          <span className="hidden md:inline-block">Metamask connected</span>
        ) : (
          <div className="flex items-center justify-center">
            <Image src={metamaskLogo} alt="Metamask" className="w-full h-full object-cover" />
          </div>
        )}
      </button>
      <button
        className={`rounded-full bg-blue-500 text-white p-3 focus:outline-none transform transition-all ${
          keplerConnected ? 'w-50' : 'w-12'
        }`}
        onClick={handleKeplerClick}
      >
        {keplerConnected ? (
          <span className="hidden md:inline-block">Kepler connected</span>
        ) : (
          <div className="flex items-center justify-center">
            <Image src={keplerLogo} alt="Kepler" className="w-full h-full object-cover" />
          </div>
        )}
      </button>
    </div>
  );
};

export default WalletButtons;