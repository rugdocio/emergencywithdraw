import { Avatar, List, Button } from "antd";
import { getAddressLink } from "../config/constants/explorers";

// The pool component is an entry in the pools list that represents a masterchef pool
// When the emergencyWithdraw button is pressed, the injected "onEmergencyWithdraw" method is called.
function Pool(props) {
  const { name, symbol, amount, pid, chainId, want, onEmergencyWithdraw } = props;

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar src="https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=010" />
        }
        title={<a target="_blank" rel="noreferrer" href={getAddressLink(chainId,want)}>{name} - pid: {pid}</a>}
        description={amount + " " + symbol}
      />

      <div>
        {" "}
        <Button type="primary" danger onClick={onEmergencyWithdraw}>
          Emergency Withdraw
        </Button>
      </div>
    </List.Item>
  );
}
export default Pool;
