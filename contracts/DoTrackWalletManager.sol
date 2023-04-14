// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract walletManager {
    
    struct Wallet {
        address[] wallets;
        mapping(address => bool) walletExists;
        mapping(address => string) walletNames;
    }

    Wallet myWallet;

    function addAddress(address newAddress, string memory userName) public {
        if (!myWallet.walletExists[newAddress]) {
            myWallet.wallets.push(newAddress);
            myWallet.walletExists[newAddress] = true;
            myWallet.walletNames[newAddress] = userName;
        }
    }

    function getAddress() public view returns (address[] memory) {
        return myWallet.wallets;
    }

    function getsUerName(address addressToConsult) public view returns (string memory) {
        return myWallet.walletNames[addressToConsult];
    }

    function getBalance(address addressToConsult) public view returns (uint256) {
        return addressToConsult.balance;
    }

    function getAllWallets() public view returns (address[] memory, string[] memory, uint256[] memory) {
        uint256 total = myWallet.wallets.length;
        address[] memory addresses = new address[](total);
        string[] memory usersNames = new string[](total);
        uint256[] memory balances = new uint256[](total);

        for (uint256 i = 0; i < total; i++) {
            address addressToConsult = myWallet.wallets[i];
            addresses[i] = addressToConsult;
            usersNames[i] = myWallet.walletNames[addressToConsult];
            balances[i] = addressToConsult.balance;
        }

        return (addresses, usersNames, balances);
    }
}


