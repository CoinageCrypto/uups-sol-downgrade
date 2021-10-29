// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "./open-zeppelin-upgradeable/proxy/utils/Initializable.sol";

contract MyTokenV2 is Initializable {

    address private _owner;
    uint internal _privateInteger;

    function initialize() initializer public {
        _owner = msg.sender;
    }

    modifier onlyOwner {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
    function iCanWrite(uint newValue) public onlyOwner {
        _privateInteger = newValue;
    }

    function iCanRead() public view returns (uint) {
        return _privateInteger;
    }

}
