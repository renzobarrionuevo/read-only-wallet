declare global {
    interface Window {
      ethereum?: any;
      keplr?: any;
      getOfflineSigner?: any;
    }
  }
  
  export async function getKeplrAddress() {
    try {
      await window.keplr.enable("evmos_9001-2");
      const offlineSigner = window.getOfflineSigner("evmos_9001-2");
      const wallets = await offlineSigner.getAccounts();
      return wallets[0].address;
    } catch (e) {
        alert('Enable evmos on kepler')
      return "";
    }
  }
  
  export async function getMetamaskAddress() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (e) {
      return "";
    }
  }