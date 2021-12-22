import { notification } from "antd"
import { getDefaultGasPrice, getGasPrice, getMasterchefContract } from "../utils/contractHelper"

const emergencyWithdraw = (web3, chainId, masterchefAddress, pid) => {
    return async () => {
        try {
            let gasPrice = getDefaultGasPrice(web3, chainId);
            try {
                gasPrice = await getGasPrice(web3);
            } catch {}
            const masterchefContract = getMasterchefContract(web3, chainId, masterchefAddress)
            const tx = await masterchefContract.methods.emergencyWithdraw(pid).send({
                from: web3.currentProvider.selectedAddress,
                gasPrice: gasPrice,
            })
            console.log("executed " + tx)

            notification.open({
                message: 'Transaction Succeeded'
            })
            return tx
        } catch (e) {
            console.error(e)
            let errormsg = e.data
            notification.open({
                message: 'Transaction failed',
                description: errormsg

            })
        }
    }
}
export default emergencyWithdraw