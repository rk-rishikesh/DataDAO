require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks/deploy") // Your deploy task.
require("./tasks/0_join-dao")
require("./tasks/1_create-deal")
require("./tasks/2_approve-deal")
require("./tasks/3_activate-deal")
require("./tasks/4_collect-reward")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "hyperspace",
    networks: {
        hyperspace: {
            chainId: 3141,
            url: " https://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1",
            accounts: ["5947a528453c1760df54805118dcb0ad2aeda12305c4c1b80a3a445eb4dc74f7"],
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}