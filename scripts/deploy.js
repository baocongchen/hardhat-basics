const { ethers, run, network } = require('hardhat');

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        'SimpleStorage'
    );
    console.log('Deploying contract...');
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deploying contract to: ${simpleStorage.address}`);
    console.log(network.config);

    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }

    const currentVal = await simpleStorage.retrieve();
    console.log(`Current value: ${currentVal}`);
    const txResponse = await simpleStorage.store(7);
    const updatedVal = await simpleStorage.retrieve();
    console.log(updatedVal);
}

async function verify(contractAddress, args) {
    console.log('Verifying contract');
    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (err) {
        if (err.message.toLowerCase().includes('already verified')) {
            console.log('Already Verified!');
        } else {
            console.log(err);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        throw new Error(err);
    });
