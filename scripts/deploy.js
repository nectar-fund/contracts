const hre = require("hardhat");
const ethers = hre.ethers;
const parseEther = ethers.utils.parseEther;
const config = require("../config");
var query = require('cli-interact').getYesNo;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

async function main() {
    const Token = await hre.ethers.getContractFactory("NectarToken");

    var answer = query(`Deploy NectarToken in ${config.MODE}?`);
    if (!answer) {
        console.log("Aborting!");
        return;
    }

    console.log("Deploying...");
    const token = await Token.deploy(parseEther(config.TOKEN_SUPPLY));
    await token.deployed();
    console.log("NectarToken deployed to:", token.address);

    console.log("Waiting 30s...");
    await sleep(30000);
  
    console.log("Verifying on Explorer...");
    await hre.run("verify:verify", {
      address: deployedToken.address,
      constructorArguments: [
        parseEther(config.TOKEN_SUPPLY)
      ],
    });
  
    console.log("Listing on Uniswap...");
    await deployedToken.list(parseEther(config.LIST_UNI_TOKEN), { value: parseEther(config.LIST_UNI_ETHER) })
    console.log("All done!");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
