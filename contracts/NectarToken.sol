//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IUniswapV2Router02 {
  function addLiquidityETH(
      address token,
      uint amountTokenDesired,
      uint amountTokenMin,
      uint amountETHMin,
      address to,
      uint deadline
  ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
}

contract NectarToken is ERC20, Ownable {
    address constant public panRouter = 0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F;
    address constant public panFactory = 0xBCfCcbde45cE874adCB698cC183deBcF17952812;
    address constant public wBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    address public panPair;

    constructor(uint256 initialSupply) ERC20("Nectar", "NCTR") {
        _mint(msg.sender, initialSupply);
        panPair = pairFor(panFactory, address(this), wBNB);

        _approve(address(this), panRouter, uint(-1));
        _approve(msg.sender, panPair, uint(-1));
    }

    function presale() public payable {
        payable(owner()).transfer(msg.value);
        _mint(msg.sender, msg.value);
    }

    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);

        bytes memory initCodeHash = hex'd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66';
        
        pair = address(uint(keccak256(abi.encodePacked(
            hex'ff',
            factory,
            keccak256(abi.encodePacked(token0, token1)),
            initCodeHash
        ))));
    }

    function list(uint _numList) public payable onlyOwner {
        _mint(address(this), _numList);
        IUniswapV2Router02(panRouter).addLiquidityETH{value: msg.value}(
            address(this),
            _numList,
            _numList,
            msg.value,
            msg.sender,
            block.timestamp + 600
        );
    }
}