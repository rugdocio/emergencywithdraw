// list of contracts
// Fetcher: Helper contract that is essential for a chain to work. It fetches all the pool data and returns it in a single call
const contracts = {
  fetcher: {
    321: "0x4fd9016c5ff784709e8CcF0f6E8aDd357803bf91", // KCC
    137: "0x8ef5eB0522F8771286c7012abBFE7cDFC03A6b7d", // Polygon
    56: "0xD19D7a09d444304f9A57f5297a2d6f684E430238", // BSC
    250: "0x4fd9016c5ff784709e8CcF0f6E8aDd357803bf91", // FTM
    1285: "0x4fd9016c5ff784709e8CcF0f6E8aDd357803bf91", // MOONRIVER
    4689: "0x7FA4b073CCf898c97299ac5aCEb5dE8d5Ef2c7f6", // IOTEX
    43114: "0x4fd9016c5ff784709e8CcF0f6E8aDd357803bf91", // AVAX
    42220: "0x17AB272c26D5193f4343609C7352e133EBd720cc", // CELO
    1666600000: "0x3fE5B475da4814b7dBef4776e1b6df9769256B8b", // HARMONY shard zero
    66: "0x4fd9016c5ff784709e8CcF0f6E8aDd357803bf91", // OKEX
  },
};

export default contracts
