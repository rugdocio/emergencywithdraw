
import { formatUnits } from 'ethers/lib/utils' // might be a bit much to import all of ethers for this

export const formatBigNumberToFixed = (bigNumber, displayDecimals = 18, decimals = 18) => {
    const formattedString = formatUnits(bigNumber, decimals)
    return (+formattedString).toFixed(displayDecimals)
  }