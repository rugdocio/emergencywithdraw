import { BSC_CHAIN_ID } from "../config";
import contracts from "../config/constants/contracts";

export const getAddress = (address, chainId) => {
  return address[chainId] ? address[chainId] : address[BSC_CHAIN_ID];
};

export const getFetcherAddress = (chainId) => {
  return getAddress(contracts.fetcher, chainId);
};

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
