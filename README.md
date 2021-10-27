# uups-sol-downgrade

## A downgraded version of selected UUPS contracts

### Why this repo exists

After attempting (so far unsuccessfully) to implement the UUPS pattern in the Synthetix FuturesMarket contract, this repo was created to help diagnose and solve the issue(s).

### Steps taken to get to this point:

1. Extract the contracts relevant to Synthetix FuturesMarket from [OpenZeppelin upgradeable contracts](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable).
2. Add the contracts to the Synthetix codebase.
3. Change the compiler version in the OZ contracts from `^0.8.0` to `^0.5.16` and go about changing the solidity code in those contracts so the contracts compile and function in the same way before the changes.
4. Modify the [FuturesMarket.sol](https://github.com/synthetixio/synthetix/blob/futures-implementation/contracts/futuresmarket.sol) contract to use UUPS and not the old/current proxy pattern.
5. Modify the Synthetix test deployment scripts and test cases to interact with the contract via UUPS instead of the old proxy.
6. Ensure that all the pre-existing tests pass.
7. Add a new test to deploy and then immediately upgrade the proxy. Observe that the deploy succeeds but the upgrade fails.
8. Proceed to fix as many issues as possible with the solidity UUPS contracts.
9. A stubborn error was encountered when attempting an upgrade:

   ```
   Error: VM Exception while processing transaction: reverted with reason string 'Function must be called through active proxy'
   ```

10. This test harness was created to help isolate the issue and ensure that no Synthetix contract was actually causing the problems experienced. The modified open-zeppelin contracts from the Synthetix repo were extracted and added to this repo. and some simple UUPS-compatible token contracts (`MyTokenV1` and `MyTokenV2`) were created along with a simple test case.
11. The contracts were then upgraded to v0.8.0 (changing as little as possible) to get them working again. It was at this point we discovered at that the modification to the [this line](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/3643fe0b827f2da1e242942f16abf9a8b3014d64/contracts/proxy/utils/UUPSUpgradeable.sol#L29) in the `UUPSUpgradeable` contract causes upgrades to break. This line was changed from:

    ```
    address private immutable __self = address(this);
    ```

    to

    ```
    address private __self = address(this);
    ```

    The cause is that the value for `__self` is always `0x0` when read through the proxy. The result is the above error.

    It actually contains a valid address when the contract is deployed and referenced without a proxy - so we know the code works.

12. Removing the keyword `immutable` causes the upgrade to fail in exactly the same way as with the Synthetix contracts using Solidity `0.5.16`.

    Since the modifier `immutable` isn't available in solidity version `0.5.16`, and the upgrade instruction fails without it, it's not immediately clear how we can proceed with the downgraded versions of the `0.5.16` UUPS contracts.

### Branch: `downgrade-to-0.5.x`

This branch contains a downgraded version of the contracts for comparison. `v0.8.0 --> v0.5.16`. The test to deploy succeeds but the upgrade fails.
