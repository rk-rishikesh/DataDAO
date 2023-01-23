//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IDataDAO {

    error DataDAO__CallerIsNotAdmin();
    error DataDAO_CallerIsNotMember();
    error DataDAO__DealProposalWasNotApproved();
    error DataDAO__DataSizeNotMatched();
    error DataDAO__DealProposalPolicyCheckFailed();

    enum DealState {   
        Proposed,
        Passed,  
        Rejected,       
        Active,          
        Expired
    } 

    struct Deal {
        address proposedBy;
        bytes cidraw;
        uint size;
        uint256 storageFees;
        uint256 dealStartBlockStamp;
        uint256 dealDurationInDays;
        DealState dealState;
    }

    /// @dev Emitted when a admin is added to the DAO
    /// @param adminAddress: account address of the admin
    event AdminAdded(
        address adminAddress
    );

    /// @dev Emitted when a member is added to the DAO
    /// @param memberAddress: account address of the member
    event MemberAdded(
        address memberAddress
    );

    /// @dev Emitted when a member is added to the DAO
    /// @param cidraw: cid of the deal proposal
    /// @param size: size of cid
    event DealProposed (
        bytes cidraw,
        uint size
    );

    /// @dev Emitted when a member is added to the DAO
    /// @param cidraw: cid of the deal proposal
    /// @param decision: decision of the Data DAO
    event DealApproval (
        bytes cidraw,
        bytes32 decision
    );

    /// @dev Emitted when a member is added to the DAO
    /// @param cidraw: cid of the deal proposal
    /// @param dealStartBlockStamp: Timestamp when the deal is activated
    /// @param dealDurationInDays: Number of days for which the deal would be active
    event DealAcivated(        
        bytes cidraw,
        uint256 dealStartBlockStamp,
        uint256 dealDurationInDays
    );

    /// @dev Returns the last root hash of a cred.
    /// @param _cidraw: Id of the Deal.
    /// @return State the Deal.
    function getDealState(bytes memory _cidraw) external view returns (DealState);

}