// endpointStore.ts
import { create } from 'zustand'
interface EndpointStore {
  endpoint: string;
  setEndpoint: (newEndpoint: string) => void;
}

export const useEndpointStore = create<EndpointStore>((set) => ({
  endpoint: "https://restless-snowy-dinghy.solana-mainnet.quiknode.pro/2a34a0e9a6e5339e0e28da760789e10c947465b3/",
  setEndpoint: (newEndpoint) => set({ endpoint: newEndpoint }),
}));
