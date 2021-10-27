// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./open-zeppelin-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./open-zeppelin-upgradeable/proxy/utils/Initializable.sol";

contract MyTokenV2 is Initializable, UUPSUpgradeable {

    address private _owner;

    function initialize() initializer public {
        __UUPSUpgradeable_init();
        _owner = msg.sender;
    }

    modifier onlyOwner {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function iCanRead() public pure returns (uint) {
        return 42;
    }
}
