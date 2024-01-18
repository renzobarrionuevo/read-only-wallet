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
