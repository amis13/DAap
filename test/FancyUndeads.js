const { expect } = require("chai");

describe('Fancy Undeads Contract', () => {
const setup = async ({ maxSupply = 10000}) => {
    const [ owner ] = await ethers.getSigners();
    const FancyUndeads = await ethers.getContractFactory("FancyUndeads");
    const deployed = await FancyUndeads.deploy(maxSupply);

    return {
        owner,
        deployed,
    };
};

    describe('Deployment', () => {
        it('Sets max supply to passed param', async () => {
            const maxSupply = 4000;

            const { deployed } = await setup({ maxSupply });

            const returnedMaxSupply = await deployed.maxSupply();
            expect(maxSupply).to.equal(returnedMaxSupply)
        });
    });
});