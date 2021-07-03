import { notification } from "antd"
import { getDefaultGasPrice, getMasterchefContract } from "../utils/contractHelper"

const emergencyWithdraw = (web3, chainId, masterchefAddress, pid) => {
    return async () => {
        try {
            const masterchefContract = getMasterchefContract(web3, chainId, masterchefAddress)
            const tx = await masterchefContract.methods.emergencyWithdraw(pid).send({
                from: web3.currentProvider.selectedAddress,
                gasPrice: getDefaultGasPrice(web3, chainId)
            })
            const receipt = await tx.wait()

            notification.open({
                message: 'Transaction Succeeded'
            })
            return receipt.status
        } catch (e) {
            console.error(e)
            notification.open({
                message: 'Transaction failed'
            })
        }
    }
}
export default emergencyWithdraw