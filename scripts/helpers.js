/**
 * Helper functions for deployment and testing
 */

const fs = require('fs');
const path = require('path');

/**
 * Save deployment addresses to file
 */
async function saveDeployment(network, addresses) {
  const deploymentsDir = path.join(__dirname, '../deployments');
  
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filePath = path.join(deploymentsDir, `${network}.json`);
  const data = {
    network,
    timestamp: new Date().toISOString(),
    addresses
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Deployment addresses saved to ${filePath}`);
}

/**
 * Load deployment addresses
 */
function loadDeployment(network) {
  const filePath = path.join(__dirname, '../deployments', `${network}.json`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

/**
 * Wait for confirmations
 */
async function waitForConfirmations(tx, confirmations = 5) {
  console.log(`Waiting for ${confirmations} confirmations...`);
  const receipt = await tx.wait(confirmations);
  console.log(`Transaction confirmed after ${confirmations} blocks`);
  return receipt;
}

/**
 * Format address for display
 */
function formatAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Get network name from chain ID
 */
function getNetworkName(chainId) {
  const networks = {
    1: 'mainnet',
    5: 'goerli',
    137: 'polygon',
    80001: 'mumbai',
    1337: 'localhost'
  };
  return networks[chainId] || 'unknown';
}

module.exports = {
  saveDeployment,
  loadDeployment,
  waitForConfirmations,
  formatAddress,
  getNetworkName
};

