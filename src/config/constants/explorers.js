// Utility methods to get explorer links

export const explorers = {
      1："https://etherscan.io",
      100:"https://blockscout.com/xdai/mainnet",
      137: "https://polygonscan.com",
      56: "https://bscscan.com",
      321: "https://explorer.kcc.io/en",
      250:"https://ftmscan.com",
      1285: "https://blockscout.moonriver.moonbeam.network",
      4689: "https://v2.iotexscan.io",
      43114: "https://avascan.info/blockchain/c",
      42161:"https://arbiscan.io",
      10:"https://optimistic.etherscan.io",
      42220: "https://explorer.celo.org",
      1666600000: "https://explorer.harmony.one",
      66: "https://www.oklink.com/okexchain",
  };
export const getAddressLink = (chainId, address) => {
    return explorers[chainId] + "/address/" + address
}
