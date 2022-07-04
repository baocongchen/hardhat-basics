require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');
require('./tasks/block-number');
require('hardhat-gas-reporter');
require('solidity-coverage');
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

const { ETHERSCAN_API_KEY, RPC_URL, PRIVATE_KEY, COINMARKETCAP_API_KEY } =
    process.env;
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: 'hardhat',
    solidity: '0.8.8',
    networks: {
        rinkeby: {
            url: RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
        localhost: {
            url: 'http://127.0.0.1:8545',
            chainId: 1337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enable: true,
        outputFile: 'gas-report.txt',
        noColors: true,
        currency: 'USD',
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: 'MATIC',
    },
};
