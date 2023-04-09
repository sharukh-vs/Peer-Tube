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
import { NotificationsContext, VideoContext } from "@/hooks/useNotifications";
import { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

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
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API }),
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/name/mohdziyadc/peer-tube-v2",
});

export default function App({ Component, pageProps }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [videos, setVideos] = useState([]);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <ApolloProvider client={apolloClient}>
          <LivepeerConfig client={livepeerClient}>
            <VideoContext.Provider value={{ videos, setVideos }}>
              <NotificationsContext.Provider
                value={{ showNotifications, setShowNotifications }}
              >
                <Component {...pageProps} />
              </NotificationsContext.Provider>
            </VideoContext.Provider>
          </LivepeerConfig>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
