import { useState, ChangeEvent } from "react";

export const Balance = () => {
  const [wallet, setWallet] = useState("qwedsdk3243kfk323k4");
  const [amount, setAmount] = useState("10000");

  const handleWalletChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWallet(event.target.value);
  };

  return (
    <div>
      <div className="mx-auto flex flex-row rounded-xl bg-[#262017] p-6 w-10/12 md:w-2/3">
        <div className="w-2/3 flex-col">
          <div>
            <p className="text-sm font-extrabold text-stone-500">Address</p>
          </div>
          <div className="flex">
            {/* input wallet */}
            <input
              type="text"
              className="w-full pt-1 pl-2 text-2xl font-sans text-white bg-stone-900 rounded-md border-none shadow-inner focus:border-orange-500"
              value={wallet}
              onChange={handleWalletChange}
            />
          </div>
        </div>
        <div className="w-1/3 text-right">
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
        </div>
      </div>
    </div>
  );
};
