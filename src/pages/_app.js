import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { NotificationsContext } from "@/hooks/useNotifications";
import { useState } from "react";

const { chains, provider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "PeerTube",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const livepeerClient = createReactClient({
  provider: studioProvider({ apiKey: "yourStudioApiKey" }),
});

export default function App({ Component, pageProps }) {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <LivepeerConfig client={livepeerClient}>
          <NotificationsContext.Provider
            value={{ showNotifications, setShowNotifications }}
          >
            <Component {...pageProps} />
          </NotificationsContext.Provider>
        </LivepeerConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
