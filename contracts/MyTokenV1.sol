// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "./open-zeppelin-upgradeable/proxy/utils/Initializable.sol";

contract MyTokenV1 is Initializable {

    address private _owner;

    function initialize() initializer public {
        _owner = msg.sender;
    }

    modifier onlyOwner {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
