// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./FancyDNA.sol";

contract FancyUndeads is ERC721, ERC721Enumerable, FancyDNA {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _idCounter;

    uint256 public maxSupply;
    mapping(uint256  => uint256) public tokenDNA;

    constructor(uint256 _maxSupply) ERC721 ("Fancy Undead", "FUND") {
        maxSupply = _maxSupply;
    }

function mint() public{
            uint256 current = _idCounter.current();
            require(current < maxSupply, "Fancy Undead is SOLD OUT!");

            tokenDNA[current] = deterministicPseudoRandomDNA(current, msg.sender);
            _safeMint(msg.sender, current);
            _idCounter.increment();
        }

function _baseURI() internal pure override returns(string memory){
            return "https://avataaars.io/";
        }

function _paramsURI(uint256 _dna) internal view returns(string memory) 
{
    string memory params;

    {params = string(
            abi.encodePacked(
                "accessoriesType=",
                getAccessoriesType(_dna),
                "&clotheColor=",
                getClotheColor(_dna),
                "&clotheType=",
                getClotheType(_dna),
                "&eyeType=",
                getEyeType(_dna),
                "&eyebrowType=",
                getEyeBrowType(_dna),
                "&facialHairColor=",
                getFacialHairColor(_dna),
                "&facialHairType=",
                getFacialHairType(_dna),
                "&hairColor=",
                getHairColor(_dna),
                "&hatColor=",
                getHatColor(_dna),
                "&graphicType=",
                getGraphicType(_dna),
                "&mouthType=",
                getMouthType(_dna),
                "&skinColor=",
                getSkinColor(_dna)
        ));
    }


    return string(abi.encodePacked(params, "&topType=", getTopType(_dna)));
}

function imageByDNA(uint256 _dna) public view returns(string memory){
        
            string memory baseURI = _baseURI();
            string memory paramsURI = _paramsURI(_dna);

            return string(abi.encodePacked(baseURI, "?", paramsURI));
        }

function tokenURI(uint256 tokenId) public view override returns (string memory) {
            require( _exists(tokenId), "ERC721 Metadata: URI queary for nonexistent token");
            uint256 dna = tokenDNA[tokenId];
            string memory image = imageByDNA(dna);

            string memory jsonURI = Base64.encode(
                abi.encodePacked(
                    '{ "name": "FancyUndeads #',
                    tokenId.toString(),
                    '", "description": "Fancy Undeads are randomized Avataaars stored on chain to teach DApp development on Platzi"',
                    image,
                    '"}'
                )
            );

            return string(abi.encodePacked("data:application/json;base64,", jsonURI));
        }
       // The following functions are overrides required by Solidity.

function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}