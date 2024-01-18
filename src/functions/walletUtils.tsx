export const formatWalletAddress = (wallet: string): string => {
    return wallet.startsWith('0x') ? wallet.slice(2) : wallet;
  };

export function HashString(hash: string): string {
    let inicio = hash.substring(0, 10);
    let fin = hash.substring(hash.length - 10, hash.length - 1);
    return inicio + "..." + fin;
  }