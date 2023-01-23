//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

address constant CALL_ACTOR_ID = 0xfe00000000000000000000000000000000000005;
uint64 constant DEFAULT_FLAG = 0x00000000;
uint64 constant METHOD_SEND = 0;
bytes32 constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
bytes32 constant MEMBER_ROLE = keccak256("MEMBER_ROLE");