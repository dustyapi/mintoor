import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { useWallet } from "@solana/wallet-adapter-react";
import { ReactNode } from "react";
import { UmiContext } from "./useUmi";
import {
  createNoopSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import {
  irysUploader,
  IrysUploaderOptions,
} from "@metaplex-foundation/umi-uploader-irys"; // Import IrysUploaderOptions

export const UmiProvider = ({
  endpoint,
  children,
  irysUploaderOptions,
}: {
  endpoint: string;
  children: ReactNode;
  irysUploaderOptions?: IrysUploaderOptions; // Make it optional
}) => {
  const wallet = useWallet();
  const umi = createUmi(endpoint).use(mplTokenMetadata());

  if (wallet.publicKey === null) {
    const noopSigner = createNoopSigner(
      publicKey("11111111111111111111111111111111")
    );
    umi.use(signerIdentity(noopSigner));
  } else {
    umi.use(walletAdapterIdentity(wallet));
  }

  umi.use(irysUploader(irysUploaderOptions));
  umi.use(mplTokenMetadata());


  return <UmiContext.Provider value={{ umi }}>{children}</UmiContext.Provider>;
};
