import { useUmi } from '@/utils/useUmi';
import { fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata';
import { publicKey } from '@metaplex-foundation/umi';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const TokenCard = ({ token }: any) => {
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const umi = useUmi();

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const fetchedTokenInfoX = await fetchDigitalAsset(umi, publicKey(token?.BaseMint));
        const fetchedTokenInfoY = await fetchDigitalAsset(umi, publicKey(token?.QuoteMint));
        setTokenInfo({fetchedTokenInfoX,fetchedTokenInfoY});
      } catch (error) {
        console.error('Error fetching token info:', error);
      }
    };

    // Check if tokenInfo is not already fetched
    if (!tokenInfo?.fetchedTokenInfoX || !tokenInfo?.fetchedTokenInfoY) {
        fetchTokenInfo();
      }
  }, [tokenInfo, umi]);

  return (
    <div className="token-card">
      {tokenInfo && (
        <>
          <h2>${tokenInfo?.fetchedTokenInfoX?.metadata?.symbol?.toString()} - ${tokenInfo?.fetchedTokenInfoY?.metadata?.symbol?.toString()} </h2>
          <p>Base Token: <Link href={`https://solscan.io/address/${token?.BaseMint}`} target="_blank">{token?.BaseMint} </Link></p>
          <p>Quote Token: <Link href={`https://solscan.io/address/${token?.QuoteMint}`} target="_blank">{token?.QuoteMint} </Link></p>
          <p>LP Token: <Link href={`https://solscan.io/address/${token?.RAY_LP_ID}`} target="_blank">{token?.RAY_LP_ID} </Link></p>
        </>
      )}
    </div>
  );
};

export default TokenCard;
