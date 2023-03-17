// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./FancyDNA.sol";

contract FancyUndeads is ERC721, ERC721Enumerable, FancyDNA {
    using Counters for Counters.Counter;

    Counters.Counter private _idCounter;

    uint256 public maxSupply;

    constructor(uint256 _maxSupply) ERC721 ("Fancy Undead", "FUND") {
        maxSupply = _maxSupply;
    }

        function mint() public{
            uint256 current = _idCounter.current();
            require(current < maxSupply, "Fancy Undead is SOLD OUT!");
            _safeMint(msg.sender, current);
        }

        function tokenURI(uint256 tokenId) public view override returns (string memory) {
            require( _exists(tokenId), "ERC721 Metadata: URI queary for nonexistent token");

            string memory jsonURI = Base64.encode(
                abi.encodePacked(
                    '{ "name": "FancyUndeads #',
                    tokenId,
                    '", "description": "Fancy Undeads are randomized Avataaars stored on chain to teach DApp development on Platzi"',
                    // "image": "//TODO",
                    '"display_type": "date"', 
                    '"trait_type": "Mint Date"', 
                    '"value": 1679094000',
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