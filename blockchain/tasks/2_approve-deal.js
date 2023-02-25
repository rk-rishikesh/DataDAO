
const CID = require('cids')
const { task, types } = require("hardhat/config")
const ethers = require("ethers")
const util = require("util")
const request = util.promisify(require("request"))

task("approve-deal", "Approve a Deal Proposal")
    .addParam("contract", "The address of the DealRewarder contract")
    .addParam("decision", "The decision on deal proposal")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({contract, cid, decision}, { ethers }) => {
    
        const contractAddress = contract;

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        const priorityFee = await callRpc("eth_maxPriorityFeePerGas")
    
        async function callRpc(method, params) {
            var options = {
              method: "POST",
              url: "https://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jsonrpc: "2.0",
                method: method,
                params: params,
                id: 1,
              }),
            };
            const res = await request(options);
            return JSON.parse(res.body).result;
          }
    
        const DataDAOExample = await ethers.getContractFactory("DataDAOExample")
        const DataDAOExampleContract = new ethers.Contract(contractAddress, DataDAOExample.interface, signer)

        const cidHexRaw = new CID(cid).toString('base16').substring(1)
        const cidHex = "0x00" + cidHexRaw
        console.log("Bytes are:", cidHex)

        await DataDAOExampleContract.approveOrRejectDataSet(cidHex, "Passed", {
            gasLimit: 1000000000,
            maxPriorityFeePerGas: priorityFee
        })

        console.log("Deal Approved");

})