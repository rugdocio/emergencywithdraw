// Utility methods to get explorer links

export const explorers = {
      137: "https://polygonscan.com",
      56: "https://bscscan.com",
      321: "https://explorer.kcc.io/en",
  };
export const getAddressLink = (chainId, address) => {
    return explorers[chainId] + "/address/" + address
}