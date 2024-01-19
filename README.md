# Read-only-wallet

Develop a basic read-only wallet for Evmos blockchain mainnet.

This project utilizes Next.js for building web applications with React, and Tailwind CSS for customizable styling.

## Requirements

Make sure you have the following installed in your development environment:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Evmos.js](https://github.com/evmos/evmosjs)
- [WAGMI](https://wagmi.sh/react/installation)

## Start project

Follow these steps to start the project:

- Create a repository on GitHub and clone it.
- Inside the cloned folder, we are going to create a Next.js project.

```jsx
npx create-next-app read-only-wallet --typescript

```

If you want it to look the same as this repository, I recommend using the following configuration.
EsLint: yes
Tailwind CSS: yes
'src/' directory: yes
App Router: no
customize import alias: no

- We install Tailwind CSS and configure it.

```
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- To check that everything is working correctly, let's open a terminal, navigate to the project folder, and run:

```jsx
npm run dev
```

or

```jsx
yarn dev
```

At [http://localhost:3000/](http://localhost:3000/), we can see our project as we build it.

# Structure

Let's define the structure of the project:

- Inside the src folder, we are going to create a folder called /components.
- Inside the components folder, we are going to create a file called [main.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/main.tsx). In Main, we are going to build the entire base structure of our project.

```tsx
export const Main = () => {
  return (
    <div>
      <h1>Hello! I am Main</h1>
    </div>
  );
};
```

- We look for index.tsx and delete its content. Let's import Main, and it will look like the following:

```tsx
import { Main } from "@/components/main";

export default function Home() {
  return (
    <div>
      <Main />
    </div>
  );
}
```

- Depending on how we want to structure different components. In this example, we create the following: address.tsx, balance.tsx, transactions.tsx, and walletButtons.tsx.
- We are going to import all these components into Main, and they will form the structure of our project.
- With HTML and Tailwind, we are going to build the visual part of the project, or you can copy the aforementioned components and start editing them. I'll leave you the [documentation for Tailwind](https://tailwindcss.com/docs/).

# Get Data

In this example, we are going to connect to Metamask or Keplr to retrieve the balance they have on the Evmos blockchain, both in Cosmos format and for ETH (ERC20 token).

For this point, you need to have the following two libraries installed:

- [Evmos.js](https://github.com/evmos/evmosjs)
- [WAGMI](https://wagmi.sh/react/installation)

You can do it this way.

```arduino
npm install @evmos/<package>
npm install wagmi viem@2.x @tanstack/react-query
```

## Connect Wallet

We create a file in the components folder that is going to be called [wallet.ts](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/wallet.ts) and we are going to paste the following code:

```tsx
declare global {
  interface Window {
    ethereum?: any;
    keplr?: any;
    getOfflineSigner?: any;
  }
}
// Connect the Kepler wallet
export async function getKeplrAddress() {
  try {
    await window.keplr.enable("evmos_9001-2");
    const offlineSigner = window.getOfflineSigner("evmos_9001-2");
    const wallets = await offlineSigner.getAccounts();
    return wallets[0].address;
  } catch (e) {
    alert("Enable evmos on kepler");
    return "";
  }
}

// Connect the Metamask wallet
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
```

We will be able to call these functions from any component by importing them to connect either of our 2 wallets.

What I did in this project was to create a component called walletButtons.tsx in which I created 2 buttons that execute the functions to connect the wallet.

In [main.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/main.tsx) I imported the button component and imported the functions we created in the wallet file.

```tsx
import WalletButtons from "./walletButtons";
import { getKeplrAddress, getMetamaskAddress } from "./wallet";
```

When you press the button to connect, the connection to the corresponding wallet is executed and we get the result, which is the wallet address.

With the obtained result and in the [main.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/main.tsx) file, we use the useMemo hook to assign the wallet value to a constant variable and for this variable to be updated every time we connect with a different wallet.

As we want to support wallets of the hex type and bech32, we create 2 constant variables that are going to be called "walletETH" (hex) and "walletEVMOS" (bech32). The code looks like this:

```tsx
const walletETH = useMemo(() => {
  if (!wallet.startsWith("0x") && !wallet.startsWith("evmos")) {
    return "";
  }
  if (wallet.startsWith("0x")) {
    return wallet;
  } else {
    return evmosToEth(wallet); //wallet converter
  }
}, [wallet]);

const walletEVMOS = useMemo(() => {
  if (!wallet.startsWith("0x") && !wallet.startsWith("evmos")) {
    return "";
  }
  if (wallet.startsWith("evmos")) {
    return wallet;
  } else {
    return ethToEvmos(wallet); //wallet converter
  }
}, [wallet]);
```

If we look at the code, what I did was that when calling the keplr or Metamask wallet it does a check. If the wallet address starts with "0x" it saves it in walletETH and if it starts with "evmos" it saves it in walletEVMOS.

However, as we are interested in completing the 2 variables since we are going to need them to check the balances in both chains, when for example a hex wallet or "0x" enters walletEVMOS instead of leaving walletEVMOS empty, we convert the wallet to a bech32 type. The same in the opposite case.
To convert it we use 2 functions from Evmos.js

```tsx
evmosToEth(wallet);
ethToEvmos(wallet);
```

This is going to be very important since we are going to use this variable in the rest of the components to make the calls to the balance and transactions API. You can see an example in the [main.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/main.tsx) and walletButtons.tsx components.

## Get Balance

Continuing with the code and having WalletETH and WalletEVMOS, we are going to use these variables in the [balance.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/balance.tsx) component. To import these values into [main.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/main.tsx) where they are stored, we do the following with the call to the <Balance/> component.

```tsx
<Balance walletETH={walletETH} walletEVMOS={walletEVMOS} />
```

In this way, we are going to introduce these variables with their values to the balance component or any component that we are going to need them, such as the [transactions.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/transactions.tsx) component.

To work on the balance, I decided to divide it into 2 sub-components: [balanceCosmo.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/balanceCosmo.tsx) and [balanceETH.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/balanceEth.tsx).

### balanceCosmo.tsx

To obtain the balances of the coins in Cosmos from our wallet, we are going to use **[Cosmos gRPC & REST**](https://docs.evmos.org/develop/api/cosmos-grpc) and the [endpoints provided by Evmos](https://api.evmos.org/)

The first thing we are going to need is a public node to be able to connect to the network. [List of public nodes](https://chainlist.org/chain/9001)
In this example, we use: [https://rest.evmos.lava.build](https://rest.evmos.lava.build/)

The endpoint we are going to use: /cosmos/bank/v1beta1/balances/[address]

In order to be able to assemble and run it in our call, we are going to need to install the Axios library. Axios is going to allow us to make get and post type calls in our Typescript project. It is installed in the following way using the terminal:

```tsx
  npm install axios
```

Then we import it into the component where we are going to use it, in this case [balanceCosmo.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/balanceCosmo.tsx)

```tsx
import axios, { AxiosResponse } from "axios";
```

The complete call to get the balances will be as follows:

```tsx
const response: AxiosResponse<CosmoBalance> = await axios.get(
  "https://rest.evmos.lava.build/cosmos/bank/v1beta1/balances/" + walletEVMOS
);
```

In the field where the wallet goes, we assign it the constant variable walletEVMOS that we had obtained when connecting the wallet.

In the `response` variable, we will have the response saved so that we can use it and display it on the screen. You can see how I used it in the [balanceCosmo.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/balanceCosmo.tsx) component.

### balanceETH.tsx

To obtain the balances of the ERC20 coins in Evmos for our wallet, we are going to use [WAGMI](https://wagmi.sh/react/getting-started) and the [endpoints that Evmos provides us](https://api.evmos.org/)

> Important: Do not skip any of the following steps or the call will not work correctly as happened to me in my first attempt.

**Set up WAGMI:**

First, we are going to execute the following line in the terminal:

```tsx
npm install wagmi viem@2.x @tanstack/react-query
```

Then we are going to create a file called config.ts. In my project, within components I created a folder called contracts and created it inside.

It will have the following code:

```tsx
import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http("https://evmos.lava.build"),
  },
});
```

The [mainnet.id](http://mainnet.id/) that we are using is the same public node that we used in the previous call.

Finally, so that we can use Wagmi's hooks in our project, we need to enter our index.tsx file and modify it so that it looks like the following.

```tsx
import { Main } from "@/components/main";
import { config } from "@/contracts/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

export default function Home() {
  return (
    //WagmiProvider and QueryClientProvider are the ones that enable the Wagmi hooks to work in any component called within them
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div>
          <Main />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

**WAGMI Hooks** :

To get the balances of the ERC20s using WAGMI, we are going to use the following Hook called **useBalance** in our project and within the [balanceETH.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/balanceEth.tsx) component.

```tsx
const walletAddress = formatWalletAddress(walletETH);

// Use the 'useBalance' hooks to retrieve wallet balances using Wagmi
const balanceEvmos = useBalance({
  address: `0x${walletAddress}`,
  token: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
});
```

To get our wallet balance, we are going to have to use as many useBalance as ERC20 coin that we want to display from our wallet. In this example, we have the ERC20 of the Evmos token.

The data that we have to pass to it are the address and the contract address of the token that we want to consult.

For this particular case and because of the format in which we are receiving the wallet, I had to create the function formatWalletAddress(). What this function does is simply extract the 0x in front of the wallet address that I want to consult. This is due to the type of format that it accepts in the address field if we use a variable. It will end up looking like this when we assign it to the address field: 0x${walletAddress}

For each token, we have to perform a new useBalance. You can see what they look like in the [balanceETH.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/balanceEth.tsx) component of my repository.

To use the results in the same way that I used them in [balanceCosmo.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/balanceCosmo.tsx), I put together an array that groups the responses of all my **useBalance** that ended up looking like this:

```tsx
const balances: Balance[] = [
  { denom: "Evmos", amount: balanceEvmos?.data?.value.toString() || "0" },
  { denom: "USDC.axl", amount: balanceUSDC?.data?.value.toString() || "0" },
  { denom: "WETH-axl", amount: balanceWETH?.data?.value.toString() || "0" },
  { denom: "OSMO", amount: balanceOSMO?.data?.value.toString() || "0" },
  { denom: "USDT.axl", amount: balanceUSDT?.data?.value.toString() || "0" },
];
```

## Get Prices

Just like in balanceCosmos.tsx we are going to use Axios and, in this case, the coingecko api with the following endpoint that we put together.

```tsx
const response: AxiosResponse<ApiPrices> = await axios.get(
  "https://api.coingecko.com/api/v3/simple/price?ids=evmos%2Cosmosis%2Cusd-coin&vs_currencies=usd%2Ceur"
);
```

In this case, I run it in the [main.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/main.tsx) file because I use it in multiple components and because I am interested in it running only once each time I load the page to avoid unnecessary calls to the API.

The result of this call will give us the prices of Evmos, USDC, WETH, OSMO, and USDT in dollars (USD) and euros (EUR).

## Get Transactions

In the [transactions.tsx](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/src/components/transactions.tsx) component, we are going to use Axios and Cosmos gRPC just like in balanceCosmos.tsx.

```tsx
const response: AxiosResponse<TxHistory> = await axios.get(
  "https://rest.evmos.lava.build/cosmos/tx/v1beta1/txs?events=transfer.recipient='" +
    walletEVMOS +
    "'&order_by=2"
);
```

It will return all the transactions made with the wallet, with all their data. In the example, I decided to show only 3 data points which are the hash, the types of messages (an array of messages), and the date it was issued.

# Format

At this point, we have all the data to be able to assemble our wallet. In my case, I decided to give it a simple but quick-read design. Where we can see the balances for each type of token and all the transactions that were made with the wallet. It also functions as a hex to bech32 format converter and vice versa; and you can also enter a wallet without the need to connect Metamask or Keplr to see its status.

![screen.png](https://github.com/renzobarrionuevo/read-only-wallet/blob/main/public/assets/screen.png)

# Documentation:

[https://wagmi.sh/react/getting-started](https://wagmi.sh/react/getting-started)

[https://github.com/evmos/evmosjs](https://github.com/evmos/evmosjs)

[https://tailwindcss.com/docs](https://tailwindcss.com/docs)

[https://docs.evmos.org/develop/api/ethereum-json-rpc](https://docs.evmos.org/develop/api/ethereum-json-rpc)
