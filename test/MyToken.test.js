const { ethers, upgrades } = require("hardhat");
const assert = require("assert");

/*
 * Version 0.5.16 of the solidity compiler:
 * - Deploy test passes.
 * - Deploy and upgrade test fails.
 */

describe("MyToken", function () {
  it("deploys", async function () {
    const MyTokenV1 = await ethers.getContractFactory("MyTokenV1");
    const myToken = await upgrades.deployProxy(MyTokenV1);
    await myToken.deployed();
  });

  it("deploy-and-upgrade", async function () {
    const MyTokenV1 = await ethers.getContractFactory("MyTokenV1");
    const myToken = await upgrades.deployProxy(MyTokenV1);
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
