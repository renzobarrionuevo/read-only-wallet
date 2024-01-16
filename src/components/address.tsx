import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

export const Address = ({
  wallet,
  setWallet,
  walletETH,
  walletEVMOS
}: {
  wallet: string;
  setWallet: Dispatch<SetStateAction<string>>;
  walletETH: string;
  walletEVMOS: string;
}) => {
  const [amount, setAmount] = useState("10000");
  const [buttonUSDPressed, setButtonUSDPressed] = useState(true);
  const [buttonEURPressed, setButtonEURPressed] = useState(false);

  const handleWalletChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWallet(event.target.value);
  };

  {/*// Modify the booleans to determine whether the values are in Bech32 or Hex
  const handleBechClick = () => {
    setButtonUSDPressed(true);
    setButtonEURPressed(false);
  };

  const handleHexClick = () => {
    setButtonUSDPressed(false);
    setButtonEURPressed(true);
  };*/}

  return (
    <div>
      <div className="mx-auto flex flex-row rounded-xl pt-5 pb-4 w-10/12 md:w-2/3">
        <div className="w-full">
          <div>
            <p className="text-sm font-extrabold text-stone-200">Address</p>
          </div>
          <div className="flex">
            {/* input wallet */}
            <input
              type="text"
              className="w-full pt-1 pl-2 pb-1 text-xl font-sans text-stone-400 bg-stone-900 rounded-md border-none shadow-inner focus:border-orange-500"
              value={wallet}
              onChange={handleWalletChange}
            />
          </div>
          <div className="flex items-baseline space-x-1 mt-1">
                      <p className="text-stone-500">hex: </p>
                      <p className="text-xs text-stone-300">{walletETH}</p>
          </div>
          <div className="flex items-baseline space-x-1 mt-1">
                      <p className="text-stone-500">bench32:</p>
                      <p className="text-xs text-stone-300">{walletEVMOS}</p>
          </div>
        </div>

        {/*<div className="w-1/3 text-right">
          <div>
            <div className="pt-4 align-end">
              <div className="float-right ml-1">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline">
                  Send
                </button>
              </div>
              <div className="float-right mr-1">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline">
                  Receive
                </button>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
};
