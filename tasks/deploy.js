
const { task, types } = require("hardhat/config")
const ethers = require("ethers")
const util = require("util")
const request = util.promisify(require("request"))
const DEPLOYER_PRIVATE_KEY = "032c6bdae6cc5408b0362b1eac35bf2f373bda66f005d15fa20bdc412e41b1c8"

task("deploy:membershipnft", "Deploy Membership NFT Contract")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ( { logs }, { ethers }) => {
        console.log("Deploying Membership NFT Contract")

        const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

        async function callRpc(method, params) {
            var options = {
              method: "POST",
              url: " https://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1",
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

        const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY)
        console.log("Deployer's Address : ", deployer.address);

        const membershipNFT = await ethers.getContractFactory("MembershipNFT")
    
            const membershipNFTContract = await membershipNFT.deploy({
                gasLimit: 1000000000,
                maxPriorityFeePerGas: priorityFee
            })
    
            await membershipNFTContract.deployed()
    
            if (logs) {
                console.info(`MembershipNFT contract has been deployed to: ${membershipNFTContract.address}`)
            }

            return membershipNFTContract

    })

task("deploy", "Deploy DataDAOExample contract")
    .addOptionalParam("admins", "List of Admins separated by comma(,)")
    .addOptionalParam("membershipnftaddress", "Membership NFT contract address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ( { admins, membershipnftaddress, logs }, { ethers }) => {
        
        var adminsList = []
        let accounts = admins.split(',');

        for (let i = 0; i < accounts.length; i++) {
            adminsList.push(accounts[i])
        };

        const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

        async function callRpc(method, params) {
            var options = {
              method: "POST",
              url: " https://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1",
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

        const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY)
        console.log("Deployer's Address : ", deployer.address);

        if (!membershipnftaddress) {
            var { address: membershipnftaddress } = await run("deploy:membershipnft", { logs })
            membershipnftaddress = membershipnftaddress;
        }

            console.log("Deploying DataDAOExample Contract")

            const dataDAOExample = await ethers.getContractFactory("DataDAOExample")

            const dataDAOExampleContract = await dataDAOExample.deploy(adminsList, membershipnftaddress, {
                gasLimit: 1000000000,
                maxPriorityFeePerGas: priorityFee
            })
    
            await dataDAOExampleContract.deployed()

            console.log("Abe jaldi deploy ho kal subhe Panvel nikalna hai")

            if (logs) {
                console.info(`DataDAOExample contract has been deployed to: ${dataDAOExampleContract.address}`)
            }

            return dataDAOExampleContract

    })