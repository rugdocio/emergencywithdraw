import { useContext, useMemo } from "react";
import Web3Context from "../contexts/web3Context";
import {
  getFetcherContract,
} from "../utils/contractHelper";

export const useFetcher = () => {
  const { web3, chainId } = useContext(Web3Context);
  return useMemo(() => getFetcherContract(web3, chainId), [web3, chainId]);
};