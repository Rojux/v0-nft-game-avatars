// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AvatarNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Avatar metadata structure
    struct Avatar {
        string name;
        uint256 level;
        uint256 experience;
        uint256 health;
        uint256 power;
        uint256 defense;
        uint256 speed;
        uint256 mintedAt;
        bool isStaked;
    }
    
    mapping(uint256 => Avatar) public avatars;
    mapping(address => uint256[]) public userAvatars;
    
    uint256 public constant MINT_PRICE = 0.1 ether;
    
    event AvatarMinted(address indexed to, uint256 indexed tokenId, string name);
    event AvatarLeveledUp(uint256 indexed tokenId, uint256 newLevel);
    event AvatarStaked(uint256 indexed tokenId, address indexed owner);
    event AvatarUnstaked(uint256 indexed tokenId, address indexed owner);
    
    constructor() ERC721("GameAvatar", "AVTR") {}
    
    function mintAvatar(string memory _name, uint256 _class) public payable returns (uint256) {
        require(msg.value >= MINT_PRICE, "Insufficient payment");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        // Generate base stats based on class (0: Warrior, 1: Mage, 2: Rogue)
        uint256[3] memory baseStats = [100, 80, 90];
        uint256 baseHealth = baseStats[_class % 3];
        
        avatars[tokenId] = Avatar({
            name: _name,
            level: 1,
            experience: 0,
            health: baseHealth,
            power: 50 + ((_class % 3) == 0 ? 10 : 0),
            defense: 30 + ((_class % 3) == 2 ? 5 : 0),
            speed: 40,
            mintedAt: block.timestamp,
            isStaked: false
        });
        
        _safeMint(msg.sender, tokenId);
        userAvatars[msg.sender].push(tokenId);
        
        emit AvatarMinted(msg.sender, tokenId, _name);
        return tokenId;
    }
    
    function gainExperience(uint256 _tokenId, uint256 _amount) public onlyOwner {
        require(_exists(_tokenId), "Avatar does not exist");
        
        Avatar storage avatar = avatars[_tokenId];
        avatar.experience += _amount;
        
        // Level up every 1000 XP
        while (avatar.experience >= 1000) {
            avatar.level += 1;
            avatar.experience -= 1000;
            
            // Increase stats on level up
            avatar.health += 10;
            avatar.power += 5;
            avatar.defense += 3;
            avatar.speed += 2;
            
            emit AvatarLeveledUp(_tokenId, avatar.level);
        }
    }
    
    function stakeAvatar(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "Not avatar owner");
        avatars[_tokenId].isStaked = true;
        emit AvatarStaked(_tokenId, msg.sender);
    }
    
    function unstakeAvatar(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "Not avatar owner");
        avatars[_tokenId].isStaked = false;
        emit AvatarUnstaked(_tokenId, msg.sender);
    }
    
    function getAvatar(uint256 _tokenId) public view returns (Avatar memory) {
        require(_exists(_tokenId), "Avatar does not exist");
        return avatars[_tokenId];
    }
    
    function getUserAvatars(address _user) public view returns (uint256[] memory) {
        return userAvatars[_user];
    }
    
    function withdrawFunds() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function _exists(uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) != address(0);
    }
    
    // Required overrides
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
