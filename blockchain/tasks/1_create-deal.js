
const CID = require('cids')
const { task, types } = require("hardhat/config")
const ethers = require("ethers")
const util = require("util")
const request = util.promisify(require("request"))

task("create-deal", "Create a Deal Proposal")
    .addParam("contract", "The address of the DealRewarder contract")
    .addParam("cid", "The piece CID of the data you want to put up a bounty for")
    .addParam("size", "Size of the data you are putting a bounty on")
    .addParam("dealDurationinDays", "Deal duration in Days")
    .addParam("dealStorageFees", "Deal Storage Fees the Member wants to lock")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({contract, cid, size, dealDurationinDays, dealStorageFees}, { ethers }) => {
    
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

        await DataDAOExampleContract.createDataSetDealProposal(cidHex, size, dealDurationinDays, dealStorageFees, {
            value: ethers.utils.parseEther(dealStorageFees),  
            gasLimit: 1000000000,
            maxPriorityFeePerGas: priorityFee
        })

        console.log("Deal created")
    })