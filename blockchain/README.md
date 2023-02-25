# The DataDAO Contract
**A FVM compatible base Data DAO contract with an example that demonstrates one way of implementing a Data DAO on Filecoin.**

This repo contains the base Data DAO contract that can be used to build a custom Data DAO contract on top of it.

### Clone the repo

```sh
git clone https://github.com/rk-rishikesh/DataDAO.git
```

### Install the node modules

```sh
cd DataDAO

npm install
```

### The Data DAO Contract

The folder structure of the [Data DAO contract](https://github.com/rk-rishikesh/DataDAO/tree/main/contracts/data-dao) is as below

    .
    ├── base                        # Base Contracts
    │   ├── DataDAOConstants.sol    # Constants
    │   └── DataDAOCore.sol         # Core functions integrated with filecoin.sol
    ├── interfaces                  # Interfaces
    │   ├── IDataDAO.sol            # Interface for Data DAO contract
    ├── DataDAO.sol                 # The Base Data DAO contract
    └── DataDAOExample.sol          # An example implementation of Base Data DAO contract

## Core Idea

The DataDAO contract is build with a vision that, the developers can create their custom Data DAO on top of the DataDAO contract. 

## Functionality and possible customization

The deal is tracked by the following deal states

    - Proposed
    - Passed 
    - Rejected   
    - Active        
    - Expired
    
> Add a user

This function assigns the role to the user that is being added to the DAO, the rules to and right to add the user can be customized in the implementation contract
  
> Create a new deal proposal

This function is used to create a new deal, the restrictions on who can create a deal can be fully customized in the implementation contract.

> Approve or Reject the proposal

This function is responsible to set the state of the deal to Passed or Rejected. A simple voiting mechanism can be implemented to decide the fate of the deal.

> Activate the deal

The function seeks verification from the contract on the storage provider's claim that the deal was created on Filecoin Network and the data is being stored. 

> Reward

This function can be found inside the DataDAOCore.sol file, and is responsible to send $FIL to the storage provider. The districution of the $FIL and the time of release of the funds can be customized in the implementation contract.

## Data DAO Example Contract
A simple DataDAOExample contract allows the admins to act as the censor board for the data that is stored via the Data DAO. The users with the Data DAO membership NFT can join the Data DAO as a member and would be able to create proposal to store their data.

Once the deal proposal is created by a member and $FIL are locked inside the contract, the admins would either approve or reject the proposal. If the deal proposal is rejected, the member gets back the locked $FIL else the deal is taken forward to storage provider. The storage provider would store the data generate the proof and provide the deal ID to the DataDAO. The DataDAO contract will check with the Filecoin storage market to confirm whether the supplied deal ID is activated and stores the claimed data. Once the deal is expired, the Data DAO will pay the storage provider.


