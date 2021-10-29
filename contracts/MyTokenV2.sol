// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "./open-zeppelin-upgradeable/proxy/utils/Initializable.sol";

contract MyTokenV2 is Initializable {

    address private _owner;

    function initialize() initializer public {
        _owner = msg.sender;
    }

    modifier onlyOwner {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function iCanRead() public pure returns (uint) {
        return 42;
    }
}
