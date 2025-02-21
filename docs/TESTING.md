# Testing Guide

## Overview

PromptFi uses Hardhat for smart contract testing with Mocha and Chai.

## Running Tests

```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/PromptNFT.test.js

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Run coverage
npx hardhat coverage
```

## Test Structure

### Unit Tests
- `test/PromptNFT.test.js` - PromptNFT contract tests
- `test/UsageTracker.test.js` - UsageTracker contract tests
- `test/RevenueSplitter.test.js` - RevenueSplitter contract tests
- `test/CreatorRegistry.test.js` - CreatorRegistry contract tests
- `test/PromptMarketplace.test.js` - Marketplace contract tests

### Integration Tests
- `test/integration.test.js` - End-to-end workflow tests

## Writing Tests

### Example Test

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyContract", function () {
  let contract;
  let owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    
    const Contract = await ethers.getContractFactory("MyContract");
    contract = await Contract.deploy();
  });

  it("Should do something", async function () {
    await contract.doSomething();
    expect(await contract.getValue()).to.equal(expectedValue);
  });
});
```

## Best Practices

1. **Test all functions** - Cover both success and failure cases
2. **Use descriptive names** - Clear test descriptions
3. **Test events** - Verify emitted events
4. **Test access control** - Verify permissions
5. **Test edge cases** - Boundary values, zero amounts, etc.
6. **Gas optimization** - Monitor gas usage

## Coverage Goals

- **Unit Tests**: >80% code coverage
- **Integration Tests**: All critical paths
- **Edge Cases**: All boundary conditions

## Continuous Integration

Tests run automatically on:
- Pull requests
- Pushes to main branch
- Before deployment

## Debugging Tests

```bash
# Verbose output
npx hardhat test --verbose

# Stack traces
npx hardhat test --stacktrace

# Specific network
npx hardhat test --network hardhat
```

