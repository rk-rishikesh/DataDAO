// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./DataDAO.sol";
import "../openzeppelin/contracts/token/ERC721/IERC721.sol";

contract DataDAOExample is DataDAO {

    IERC721 public membershipNFT;

    mapping(bytes => mapping(address => uint256)) public fundings;
    mapping(bytes => uint256) public dealStorageFees;
    mapping(bytes => uint64) public dealClient;

    constructor(address[] memory admins, address _membershipNFT) DataDAO(admins) {
        membershipNFT = IERC721(_membershipNFT);
    }

    /// @dev Function to allow members with membership NFT to join the DAO
    function joinDAO() public {
        require(membershipNFT.balanceOf(msg.sender) > 0, "You are not the holder of DataDAO NFT");
        addUser(msg.sender, MEMBER_ROLE);
    }

    /// @dev Creates a new deal proposal. 
    /// @param _cidraw: cid for which the deal proposal is to be created.
    /// @param _size: size of cid
    /// @param _dealDurationInDays: deal duration in Days
    function createDataSetDealProposal(bytes memory _cidraw, uint _size, uint256 _dealDurationInDays, uint256 _dealStorageFees) public payable {
        require(hasRole(MEMBER_ROLE, msg.sender), "Caller is not a minter");
        createDealProposal(_cidraw, _size, _dealDurationInDays);
        dealStorageFees[_cidraw] = _dealStorageFees;
    }

    /// @dev Approves or Rejects the proposal - This would enable to govern the data that is stored by the DAO
    /// @param _cidraw: Id of the cred.
    /// @param _choice: decision of the DAO on the proposal
    function approveOrRejectDataSet(bytes memory _cidraw, DealState _choice) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not a admin");
        approveOrRejectDealProposal(_cidraw, _choice);
    }

    /// @dev Activates the deal
    /// @param _networkDealID: Deal ID generated after the deal is created on Filecoin Network 
    function activateDataSetDealBySP(uint64 _networkDealID) public {
        uint64 client = activateDeal(_networkDealID);
        MarketTypes.GetDealDataCommitmentReturn memory commitmentRet = MarketAPI.getDealDataCommitment(MarketTypes.GetDealDataCommitmentParams({id: _networkDealID}));
        dealClient[commitmentRet.data] = client;
    }

    /// @dev Once the deal is expired the SP can withdraw the rewards
    /// @param _cidraw: Id of the cred.
    function withdrawReward(bytes memory _cidraw) public {
        require(getDealState(_cidraw) == DealState.Expired);
        reward(dealClient[_cidraw], dealStorageFees[_cidraw]);
    }

}

