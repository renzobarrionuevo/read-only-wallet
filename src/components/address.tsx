import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useClipboard } from "@chakra-ui/react";


export const Address = ({
  wallet,
  setWallet,
  walletETH,
  walletEVMOS,
}: {
  wallet: string;
  setWallet: Dispatch<SetStateAction<string>>;
  walletETH: string;
  walletEVMOS: string;
}) => {
  //Function to change the state of the wallet based on the input.
  const handleWalletChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWallet(event.target.value);
  };

  //Hook to copy to clipboard
  const { onCopy: onCopyETH, hasCopied: hasCopiedETH } = useClipboard(walletETH);
  const { onCopy: onCopyEVMOS, hasCopied: hasCopiedEVMOS } = useClipboard(walletEVMOS);


  return (
    <div>
      <div className="mx-auto flex flex-row rounded-xl pt-1 w-10/12 md:w-2/3">
        <div className="w-full">
          <div>
            <p className="text-3xl font-extrabold text-stone-200">Address</p>
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
            <button
              onClick={onCopyETH}
              className="text-xs ml-2 px-2 py-1 rounded-md bg-stone-700 text-stone-300"
            >
              {hasCopiedETH ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="flex items-baseline space-x-1 mt-1">
            <p className="text-stone-500">bech32:</p>
            <p className="text-xs text-stone-300">{walletEVMOS}</p>
            <button
              onClick={onCopyEVMOS}
              className="text-xs ml-2 px-2 py-1 rounded-md bg-stone-700 text-stone-300"
            >
              {hasCopiedEVMOS ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
