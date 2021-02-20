const { expect } = require("chai");
const parseEther = ethers.utils.parseEther;
const IERC20Abi = require("@openzeppelin/contracts/build/contracts/IERC20.json").abi;
const UniswapAbi = require("@uniswap/v2-periphery/build/IUniswapV2Router02.json").abi;
const config = require("../config");

describe("NectarToken", function () {

    let token, pancakeSwap, panPairToken, wBNBToken;
    let deployer;
    let provider;
    let panPairAddress;

    before(async function () {
        const Token = await ethers.getContractFactory("NectarToken");
        token = await Token.deploy(parseEther(config.TOKEN_SUPPLY));

        [ deployer ] = await ethers.getSigners();
        provider = await ethers.provider;

        pancakeSwap = new ethers.Contract(config.UNI, UniswapAbi, provider);

        panPairAddress = await token.connect(deployer).panPair();
        panPairToken = new ethers.Contract(panPairAddress, IERC20Abi, provider);
        wBNBToken = new ethers.Contract(config.WETH, IERC20Abi, provider);

        await token.deployed();
    });

    it("should be listed", async function() {
        expect(await provider.getCode(panPairAddress)).to.equal("0x");
        await token.list(parseEther(config.LIST_UNI_TOKEN), {value: parseEther(config.LIST_UNI_ETHER)})
        expect(await panPairToken.connect(deployer).balanceOf(deployer.address)).to.be.gt(ethers.BigNumber.from("1"));
    });

});
