import { Avatar, List, Button, Space } from "antd";
import { getAddressLink } from "../config/constants/explorers";
import { formatBigNumberToFixed } from "../utils/decimals";

// The pool component is an entry in the pools list that represents a masterchef pool
// When the emergencyWithdraw button is pressed, the injected "onEmergencyWithdraw" method is called.
//https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=010
function Pool(props) {
  const { name, symbol, amount, pid, chainId, want, depositFee, decimals, isFallback, onEmergencyWithdraw, onRevoke } = props; // consider restructuring this
  let decAmount = formatBigNumberToFixed(amount, decimals, decimals);
  if (decAmount > 1) {
    decAmount = formatBigNumberToFixed(amount, 2, decimals);
  } else if (decAmount > 0.1) {
    decAmount = formatBigNumberToFixed(amount, 3, decimals);
  } else if (decAmount > 0.001) {
    decAmount = formatBigNumberToFixed(amount, 5, decimals);
  }

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar src="https://rugdoc.io/assets/placeholder.png" />
        }

        title={<a target="_blank" rel="noreferrer" href={getAddressLink(chainId, want)}>{name} - PID: {pid} [ {(isFallback ? "??.??" : formatBigNumberToFixed(depositFee, 2, 2)) + "%"} ]</a>}
        description={(amount === "0" ? "0" : decAmount) + " " + symbol}
      />

      <div>
        {" "}
        <Space>
          <Button type="primary" danger onClick={onEmergencyWithdraw}>
            Emergency Withdraw
          </Button>
          <Button type="primary" onClick={onRevoke}>
            Revoke
          </Button>
        </Space>
      </div>
    </List.Item>
  );
}
export default Pool;
