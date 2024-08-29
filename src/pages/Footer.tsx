import React, { useState } from "react";
import {useEndpointStore} from "../utils/endpointStore"

const Navbar: React.FC<any> = ({ wallet, balance, cluster }) => {
  const [newCluster, setNewCluster] = useState(cluster);
  const { setEndpoint } = useEndpointStore();
  const handleClusterChange = (event: any) => {
    const updatedCluster = event.target.value;
    setNewCluster(updatedCluster);
    setEndpoint(updatedCluster);
  };

  return (



      <div className="footer">
          <div>
            Wallet : {wallet?.slice(0, 5)}..{wallet?.slice(-5)}
          </div>
          <div>
            {"Balance :"}
            {balance} SOL
          </div>
          <div>
            Cluster: 
            <select className="cluster-select" defaultValue={newCluster} onChange={handleClusterChange} >
              <option value="https://restless-snowy-dinghy.solana-mainnet.quiknode.pro/2a34a0e9a6e5339e0e28da760789e10c947465b3/">
                mainnet
              </option>
              <option value="https://devnet.helius-rpc.com/?api-key=6c645f91-addf-42b3-b53a-b57a000de499">devnet</option>
            </select>
          </div>
      </div>
  );
};

export default Navbar;
