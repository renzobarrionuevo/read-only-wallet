import React, { useState } from "react";
import Image from 'next/image';
import ExpandDown from '@/../public/assets/expand-down.svg'

type Item = {
  type: string;
  hash: string;
  code: number;
  height: string;
  message: string;
  amount: number;
};

export const Transactions = () => {

  const [showItems, setShowItems] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(false);

  let respuestaAPI: Item[] = [];
  respuestaAPI = [
    {
      type: "recipient",
      hash: "B19D8E753CA2F0E478F42F911933AC85EB1900C68E2EFA6E0A304F649FB9F059",
      code: 0,
      height: "18276286",
      message: "/ethermint.evm.v1.MsgEthereumTx",
      amount: 0.5,
    },
    {
      type: "sender",
      hash: "CB8F4EDF39B80F99D2D846892B78D77CCDF4D0EA361A7E2F96DB0C84A7C34059",
      code: 0,
      height: "18277021",
      message: "/ethermint.evm.v1.MsgEthereumTx",
      amount: 0.01,
    },
    {
      type: "sender",
      hash: "BD703DF53F4DDD3195B1FE8950BCC599005D94B5F6D39BCA56D7BE28380165D8",
      code: 0,
      height: "18277029",
      message: "/ethermint.evm.v1.MsgEthereumTx",
      amount: 0.1,
    },
    {
      type: "recipient",
      hash: "A4AA9A8A389C9D6EF275FEB2708987B01E1B3706BC3962A06FBB806BAC420B84",
      code: 0,
      height: "18277037",
      message: "/ethermint.evm.v1.MsgEthereumTx",
      amount: 0.05,
    },
  ];

  const toggleItems = () => {
    setShowItems(!showItems);
    setButtonPressed(!buttonPressed); // Toggle the state of the button.
  };
  

  return (
    <div className="w-2/3 mx-auto mt-5">
      <div className="flex flex-row rounded-xl bg-[#423D37] py-3 px-5 text-white">
        <div className="w-1/2">
          <p className="text-left font-bold text-stone-900 pt-1">Transactions</p>
        </div>
        <div className="w-1/2 flex justify-end items-center space-x-2">
          <button
            className= {`px-3 py-1 bg-stone-600 text-white rounded-xl ${
                buttonPressed ? 'bg-stone-600' : 'bg-stone-900'
              }`}
            onClick={toggleItems}>
                <Image src={ExpandDown} alt="Expand" className={`w-5 h-5 object-cover"transform ${buttonPressed ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
      </div>

      {showItems && (
        <div className="mt-1 flex-col">
          {respuestaAPI.map((e: Item, i: number) => {
            return (
              <div className="flex flex-row my-1">
                <div className="w-5/6 pt-3 flex-col rounded-l-xl bg-stone-900 px-5 pb-5 text-white">
                  
                    <div className="flex items-baseline space-x-1 mt-1">
                      <p className="text-stone-500">Hash: </p>
                      <p className="text-xs">{e.hash}</p>
                    </div>
                    <div className="flex items-baseline space-x-1 mt-2">
                      <p className="text-stone-500">Type:</p>
                      <p className="bg-orange-500 rounded-full px-2 text-sm text-stone-900">{e.type}</p>
                    </div>
                    <div className="flex items-baseline space-x-1 mt-2">
                      <p className="text-stone-500">Age:</p>
                      <p className="text-ms">{e.height}</p>
                    </div>
                  
                </div>
                <div className="w-1/6 flex-col rounded-r-xl bg-[#262017] px-5 pb-5 text-white">
                  <div className="flex space-x-1 items-baseline pl-5">
                      <p className="text-center mt-12 text-2xl font-bold">{e.amount}</p>
                      <p className="text-center mt-12 text-sm">Evmos</p>        
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    
  );
};
