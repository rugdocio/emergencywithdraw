// list of contracts
// Fetcher: Helper contract that is essential for a chain to work. It fetches all the pool data and returns it in a single call
const contracts = {
  fetcher: {
    321: "0x4fd9016c5ff784709e8CcF0f6E8aDd357803bf91", // KCC
    137: "0x8ef5eB0522F8771286c7012abBFE7cDFC03A6b7d", // Polygon
    56: "0xD19D7a09d444304f9A57f5297a2d6f684E430238", // BSC
    250: "0x4fd9016c5ff784709e8CcF0f6E8aDd357803bf91", // FTM
    43114: "0x4fd9016c5ff784709e8CcF0f6E8aDd357803bf91", // AVAX
  },
};

export default contracts
