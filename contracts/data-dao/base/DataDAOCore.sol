// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { MarketAPI } from "../../filecoin-solidity/v0.8/MarketAPI.sol";
import { CommonTypes } from "../../filecoin-solidity/v0.8/types/CommonTypes.sol";
import { MarketTypes } from "../../filecoin-solidity/v0.8/types/MarketTypes.sol";
import { Actor, HyperActor } from "../../filecoin-solidity/v0.8/utils/Actor.sol";
import { Misc } from "../../filecoin-solidity/v0.8/utils/Misc.sol";
import {CALL_ACTOR_ID, DEFAULT_FLAG, METHOD_SEND, ADMIN_ROLE, MEMBER_ROLE } from "./DataDAOConstants.sol";

contract DataDAOCore {

    /// @dev makes a call to actoir ID and transfer FIL 
    /// @param method: Id of the cred.
    /// @param value: Depth of the tree.
    /// @param flags: Zero value of the tree.
    /// @param codec: Admin of the cred.
    /// @param params: URI for the cred.
    /// @param id: actor ID
    function call_actor_id(uint64 method, uint256 value, uint64 flags, uint64 codec, bytes memory params, uint64 id) internal returns (bool, int256, uint64, bytes memory) {
        (bool success, bytes memory data) = address(CALL_ACTOR_ID).delegatecall(abi.encode(method, value, flags, codec, params, id));
        (int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
        return (success, exit, return_codec, return_value);
    }

    /// @dev Send amount $FIL to the filecoin actor at actor_id
    /// @param actorID: actor at actor_id
    /// @param amount: Amount of $FIL
    function reward(uint64 actorID, uint256 amount) internal {
        bytes memory emptyParams = "";
        delete emptyParams;

        HyperActor.call_actor_id(METHOD_SEND, amount, DEFAULT_FLAG, Misc.NONE_CODEC, emptyParams, actorID);
    }

}
    