import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useUmi } from "../utils/useUmi";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TokenForm from "./TokenForm";
import Navbar from "./Navbar";
import {
  createGenericFileFromBrowserFile,
  generateSigner,
  percentAmount,
  publicKey,
  sol,
} from "@metaplex-foundation/umi";
import {
  TokenStandard,
  createAndMint,
} from "@metaplex-foundation/mpl-token-metadata";
import { ToastContainer, toast } from "react-toastify";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";
type TOKEN_METADATA = {
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  tokensToMint: number;
  image: string;
  // retainFreezeAuth: boolean;
  // retainMintAuth: boolean;
  mutableMetadata: boolean;
};

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function TokenCreator() {
  const umi = useUmi();
  const [balance, setBalance] = useState(0);
  const [tokenImg, setTokenImg] = useState("");
  const [tokenImgFile, setTokenImgFile] = useState<any>(null);
  const [formData, setFormData] = useState<TOKEN_METADATA>({
    name: "Mintr",
    symbol: "BL4ZE",
    description: "",
    decimals: 0,
    tokensToMint: 0,
    image: "",
    // retainFreezeAuth: true,
    // retainMintAuth: true,
    mutableMetadata: true,
  });
  const wallet = useWallet();
  const handleImageChange = async (event: any) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      const genericFile = await createGenericFileFromBrowserFile(
        file,
        file?.name
      );
      setTokenImgFile(genericFile);

      setTokenImg(imageUrl);
      setFormData((prevData) => ({ ...prevData, image: imageUrl }));
    } else {
      console.error("No file selected");
    }
  };
  const handleInputChange = (e: any) => {
    let { id, value } = e.target;
    if (
      id == "retainFreezeAuth" ||
      id == "retainMintAuth" ||
      id == "mutableMetadata"
    ) {
      value = value === "true";
    }

    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    createToken(formData);
  };

  const createToken = async (props: TOKEN_METADATA) => {
    try {
      const mint = generateSigner(umi);
      if (tokenImgFile) {
        console.log(tokenImgFile);
        const [imageUri] = await umi.uploader.upload([tokenImgFile]);
        console.log(imageUri);
        const metadataUri = await umi.uploader.uploadJson({
          name: props.name,
          description: props.description,
          image: imageUri,
        });
        // await transferSol(umi, {
        //   destination: publicKey("BLAzeF51TwvzXEyYnVx1vjo39BoMAkijrb7SY21NUEfu"),
        //   amount: sol(1),
        // }).sendAndConfirm(umi);
        await createAndMint(umi, {
          mint,
          authority: umi.identity,
          name: props.name,
          symbol: props.symbol,
          uri: metadataUri,
          sellerFeeBasisPoints: percentAmount(0),
          decimals: props.decimals,
          amount: props.tokensToMint * 10 ** props.decimals,
          tokenOwner: umi.identity.publicKey,
          tokenStandard: TokenStandard.Fungible,
          isMutable: props.mutableMetadata,
        }).sendAndConfirm(umi);
      }
      toast.success(props.tokensToMint + " " + props.name + " minted");

      console.log(props.tokensToMint, mint.publicKey, " minted");
    } catch (error) {
      toast.error("Error creating token:" + error);
      console.error("Error creating token:", error);

      if (
        error instanceof WalletSignTransactionError &&
        error.message.includes("User rejected the request")
      ) {
        toast.error("Transaction rejected by user.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

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
  }, [umi.identity.publicKey, umi.rpc.getEndpoint]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
        background:
          "linear-gradient(0deg, rgba(52,22,80,1) 0%,#60318c 50%, rgba(52,22,80,1) 100%",
      }}
    >
      <Navbar
        wallet={umi.identity.publicKey.toString()}
        balance={balance}
        cluster={umi.rpc.getCluster()}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <ToastContainer style={{ marginLeft: "auto" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            minHeight: "90vh",
            alignItems: "center",
          }}
        >
          {!wallet.connected && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p>
                One single tool for all solana needs. Connect wallet to get
                started
              </p>
              <WalletMultiButtonDynamic
                style={{
                  display: "flex",
                  margin: "auto",
                  marginTop: "1rem",
                }}
              />
            </div>
          )}
          {wallet.connected && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
            <h1 className="header-text"> You will be charged 1 sol per token </h1>

              <TokenForm
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                handleSubmit={handleSubmit}
                formData={formData}
                tokenImg={tokenImg}
              />
            </div>
          )}
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
