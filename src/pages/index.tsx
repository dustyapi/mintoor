import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useUmi } from "../utils/useUmi";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const SAMPLE_TOKEN_METADATA: TOKEN_METADATA = {
  name: "Just a Test Token",
  symbol: "TEST",
  description: "This is a test token developed from ",
  decimals: 9,
  tokensToMint: 100000,
  image: "https://URL_TO_YOUR_IMAGE.png",
  retainFreezeAuth: true,
  retainMintAuth: true,
};
type TOKEN_METADATA = {
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  tokensToMint: number;
  image: string;
  retainFreezeAuth: boolean;
  retainMintAuth: boolean;
};

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const umi = useUmi();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const bal = await umi.rpc.getBalance(umi.identity.publicKey);
        setBalance(Number(bal.basisPoints) / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    getBalance();
    return () => {};
  }, [umi.identity.publicKey]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        background: 
        "linear-gradient(0deg, rgba(52,22,80,1) 0%,#60318c 50%, rgba(52,22,80,1) 100%",
        minHeight:"90vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding:"1rem",
          }}
        >
          <p>We mint tokens and shit</p>
          <WalletMultiButtonDynamic
            style={{ display: "flex", margin: "auto",marginTop:"1rem" }}
          />
        </div>
      </div>
      <Footer
        wallet={umi.identity.publicKey.toString()}
        balance={balance}
        cluster={umi.rpc.getCluster()}
      />
    </div>
  );
}
