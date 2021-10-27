const { ethers, upgrades } = require("hardhat");
const assert = require("assert");

// Version 0.8.x of the solidity compiler: All tests pass

describe("MyToken", function () {
  it("deploys", async function () {
    const MyTokenV1 = await ethers.getContractFactory("MyTokenV1");
    const myToken = await upgrades.deployProxy(MyTokenV1, {
      kind: "uups",
    });
    await myToken.deployed();

    const MyTokenV2 = await ethers.getContractFactory("MyTokenV2");
    const myTokenUpgraded = await upgrades.upgradeProxy(
      myToken.address,
      MyTokenV2
    );
    const readValue = await myTokenUpgraded.iCanRead();
    assert.equal(readValue.toString(), "42");
  });
});
