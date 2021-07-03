import { useEffect, useState } from "react";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "5b7ed00b5a864d5797572f8cfcc5052e", // required, TODO: still needs to be set to our infura_id.
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const useWeb3 = () => {
  //todo: useWeb3Provider
  const [provider, setProvider] = useState();
  const [web3info, setWeb3Info] = useState({
    web3: undefined,
    chainId: undefined,
  });
  useEffect(() => {
    const connect = async () => {
      const provider_ = await web3Modal.connect();
      setProvider(provider_);
      const web3 = new Web3(provider_);
      const chainId = await web3.eth.net.getId();
      return { web3, chainId };
    };
    connect().then((info) => {
      setWeb3Info(info);
    });
  }, [provider]);

  // const disconnect = async () => {
  //   // explicitly close when wallet connect is used
  //   if (provider && provider.close) {
  //     await provider.close();
  //   }
  //   web3Modal.clearCachedProvider();

  //   setProvider(undefined);
  //   setWeb3Info(undefined);
  // };

  return web3info;
};

export default useWeb3;
