import { Input } from "antd";

const { Search } = Input;

// Masterchef input component that calls the injected onStart method with the masterchef address as parameter
function MasterchefSearch(props) {
  const { onStart } = props;
  return (
    <Search
      placeholder="Masterchef"
      allowClear
      enterButton="Start"
      size="large"
      onSearch={onStart}
    />
  );
}

export default MasterchefSearch;
