import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import { UmiProvider } from "../utils/UmiProvider";
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import {useEndpointStore} from "../utils/endpointStore"

// import dynamic from "next/dynamic";
// export default dynamic(()=>Promise.resolve(App),{ssr:false}) //to disabled any hydration errors just uncomment this
// function App({ Component, pageProps }: AppProps) {
export default function App({ Component, pageProps }: AppProps) {
  const { endpoint } = useEndpointStore();

  let network = WalletAdapterNetwork.Mainnet;


  const wallets = useMemo(
    () =>
     []
     ,
    []
  );

  return (
    <div>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={"Mintr(Beta)"} />
        <meta property="og:description" content="An all in one solana utility" />
        <meta name="description" content="Mint website" />
        {/* 
        <meta
          property="og:image"
          content={image}
        /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mintr(Beta)</title>
        <link rel="icon" href="/fire.png" />
      </Head>

      <WalletProvider wallets={wallets}>
          <UmiProvider endpoint={endpoint}>
            <WalletModalProvider>
              <Component {...pageProps} />
            </WalletModalProvider>
          </UmiProvider>
      </WalletProvider>
    </div>
  );
}
