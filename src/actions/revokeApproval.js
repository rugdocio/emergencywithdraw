import { notification } from "antd"
import { getDefaultGasPrice, getGasPrice, getTokenContract } from "../utils/contractHelper"

const revokeApproval = (web3, chainId, tokenAddress, masterchefAddress) => {
    return async () => {
        try {
           
            let gasPrice = getDefaultGasPrice(web3, chainId);
            try {
                gasPrice = await getGasPrice(web3);
            } catch {}
            const tokenContract = getTokenContract(web3, chainId, tokenAddress)
            const tx = await tokenContract.methods.approve(masterchefAddress, 0).send({
                from: web3.currentProvider.selectedAddress,
                gasPrice: gasPrice
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
export default revokeApproval