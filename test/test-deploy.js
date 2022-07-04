const { expect, assert } = require('chai');
const { ethers } = require('hardhat');

describe('SimpleStorage', () => {
    let simpleStorage;
    let simpleStorageFactory;
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it('Should start with a favorite number of 0', async function () {
        const currentVal = await simpleStorage.retrieve();
        const expectedVal = 0;
        assert.equal(currentVal, expectedVal);
    });

    it('Should update when store is called', async () => {
        await simpleStorage.store(9);
        const updatedVal = await simpleStorage.retrieve();
        assert.equal(updatedVal, 9);
    });

    it('Should add a person when addPerson is called', async () => {
        await simpleStorage.addPerson('Tran', 5);
        const tranObject = await simpleStorage.people(0);
        assert.equal(tranObject.name, 'Tran');
        assert.equal(tranObject.favoriteNumber, 5);
    });
});
