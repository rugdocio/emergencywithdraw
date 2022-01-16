import { List, Divider, ConfigProvider } from "antd";
import { useContext, useReducer } from "react";
import emergencyWithdraw from "../actions/emergencyWithdraw";
import Web3Context from "../contexts/web3Context";
import usePools from "../hooks/usePools";
import { ExperimentOutlined } from '@ant-design/icons';

import Pool from "./Pool";
import revokeApproval from "../actions/revokeApproval";

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <ExperimentOutlined style={{ fontSize: 70, marginBottom:"40px" }} />
    <p style={{fontWeight: "bold", fontSize:35, color:"#7BD0DD"}}>Enter a masterchef address to get started</p>
    <p>Make sure that you're connected to the correct network (Supported: BSC, Polygon, Avalanche, Fantom, IOTEX, Moonriver, Celo, Harmony ONE, KCC, okex and Moonbeam)</p>
    <p></p>
    <p>This is an experimental service, use at your own risk and make sure to double check all contract interactions</p>
  </div>
);

function Pools() {
  const [, forceUpdate] = useReducer(x => x + 1, 0); // used to refresh ui
  const pools = usePools();
  const { web3, chainId } = useContext(Web3Context);

  const onEmergencyWithdraw = async (item) => {
    const doEmergencyWithdraw = emergencyWithdraw(
      web3,
      chainId,
      item.mc,
      item.pid
    );
    doEmergencyWithdraw().then(() => {
        forceUpdate()
    });
  
  };

  const onRevoke = async (item) => {
    const doRevoke = revokeApproval(
      web3,
      chainId,
      item.want,
      item.mc
    );
    doRevoke().then(() => {
        forceUpdate()
    });
  };
  return (
    <>
      <Divider orientation="left">Pools</Divider>

      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <List
          className="demo-loadmore-list"
          size="large"
          itemLayout="horizontal"
          dataSource={pools}
          renderItem={(item) => (
            <Pool
              name={item.name}
              symbol={item.symbol}
              amount={item.amount}
              pid={item.pid}
              chainId={chainId}
              want={item.want}
              depositFee={item.depositFee}
              decimals={item.decimals}
              isFallback={item.isFallback}
              onEmergencyWithdraw={() => onEmergencyWithdraw(item)}
              onRevoke={() => onRevoke(item)}
            ></Pool>
          )}
        />
      </ConfigProvider>
    </>
  );
}
export default Pools;
