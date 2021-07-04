import { List, Divider, ConfigProvider } from "antd";
import { useContext } from "react";
import emergencyWithdraw from "../actions/emergencyWithdraw";
import Web3Context from "../contexts/web3Context";
import usePools from "../hooks/usePools";
import { ExperimentOutlined } from '@ant-design/icons';

import Pool from "./Pool";

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <ExperimentOutlined style={{ fontSize: 70, marginBottom:"40px" }} />
    <p style={{fontWeight: "bold"}}>Enter a masterchef address to get started</p>
    <p>Make sure that you're connected to the correct network</p>
  </div>
);


function Pools() {
  const pools = usePools();
  const { web3, chainId } = useContext(Web3Context);

  const onEmergencyWithdraw = async (item) => {
    const doEmergencyWithdraw = emergencyWithdraw(
      web3,
      chainId,
      item.mc,
      item.pid
    );
    doEmergencyWithdraw();
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
              onEmergencyWithdraw={() => onEmergencyWithdraw(item)}
            ></Pool>
          )}
        />
      </ConfigProvider>
    </>
  );
}
export default Pools;
