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
    const myToken = await upgrades.deployProxy(MyTokenV1, {
      kind: "uups",
      // v0.5.x compiler doesn't understand the Natspec comments so we need to turn off checking for these for now.
      unsafeAllow: ["state-variable-assignment", "delegatecall"],
    });
    await myToken.deployed();
  });

  it("deploy-and-upgrade", async function () {
    const MyTokenV1 = await ethers.getContractFactory("MyTokenV1");
    const myToken = await upgrades.deployProxy(MyTokenV1, {
      kind: "uups",
      // v0.5.x compiler doesn't understand the Natspec comments so we need to turn off checking for these for now.
      unsafeAllow: ["state-variable-assignment", "delegatecall"],
    });
    await myToken.deployed();
    const MyTokenV2 = await ethers.getContractFactory("MyTokenV2");
    const myTokenUpgraded = await upgrades.upgradeProxy(
      myToken.address,
      MyTokenV2,
      {
        kind: "uups",
        // v0.5.x compiler doesn't understand the Natspec comments so we need to turn off checking for these for now.
        unsafeAllow: ["state-variable-assignment", "delegatecall"],
      }
    );
    const readValue = await myTokenUpgraded.iCanRead();
    assert.equal(readValue.toString(), "42");
  });
});
