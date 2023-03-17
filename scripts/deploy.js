const deploy = async () => {

  const [ deployer ] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const FancyUndeads = await ethers.getContractFactory("FancyUndeads");
  const deployed = await FancyUndeads.deploy();

  console.log("Fancy Undead is deployed at:", deployed.address);
  
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);    
  });