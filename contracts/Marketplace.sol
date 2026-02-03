// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    
    IERC721 public nftContract;
    
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }
    
    struct Offer {
        address bidder;
        uint256 amount;
        uint256 expiresAt;
    }
    
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => mapping(address => Offer)) public offers;
    
    uint256 public platformFeePercentage = 5; // 5% fee
    uint256 public totalVolume;
    
    event ListingCreated(uint256 indexed tokenId, address indexed seller, uint256 price);
    event ListingCancelled(uint256 indexed tokenId, address indexed seller);
    event SaleCompleted(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event OfferMade(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event OfferAccepted(uint256 indexed tokenId, address indexed seller, address indexed bidder, uint256 amount);
    event OfferCancelled(uint256 indexed tokenId, address indexed bidder);
    
    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }
    
    function listAvatar(uint256 _tokenId, uint256 _price) public nonReentrant {
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Not token owner");
        require(_price > 0, "Price must be greater than 0");
        require(!listings[_tokenId].active, "Already listed");
        
        listings[_tokenId] = Listing({
            seller: msg.sender,
            price: _price,
            active: true
        });
        
        emit ListingCreated(_tokenId, msg.sender, _price);
    }
    
    function cancelListing(uint256 _tokenId) public nonReentrant {
        Listing storage listing = listings[_tokenId];
        require(listing.seller == msg.sender, "Not listing owner");
        require(listing.active, "Listing not active");
        
        listing.active = false;
        emit ListingCancelled(_tokenId, msg.sender);
    }
    
    function buyAvatar(uint256 _tokenId) public payable nonReentrant {
        Listing storage listing = listings[_tokenId];
        require(listing.active, "Not for sale");
        require(msg.value >= listing.price, "Insufficient payment");
        
        address seller = listing.seller;
        uint256 price = listing.price;
        
        listing.active = false;
        
        // Transfer NFT to buyer
        nftContract.transferFrom(seller, msg.sender, _tokenId);
        
        // Calculate fees
        uint256 platformFee = (price * platformFeePercentage) / 100;
        uint256 sellerAmount = price - platformFee;
        
        totalVolume += price;
        
        // Transfer funds
        payable(seller).transfer(sellerAmount);
        
        // Refund excess payment
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
        
        emit SaleCompleted(_tokenId, seller, msg.sender, price);
    }
    
    function makeOffer(uint256 _tokenId, uint256 _expiryDays) public payable nonReentrant {
        require(msg.value > 0, "Offer amount must be greater than 0");
        require(_expiryDays > 0 && _expiryDays <= 30, "Invalid expiry days");
        
        offers[_tokenId][msg.sender] = Offer({
            bidder: msg.sender,
            amount: msg.value,
            expiresAt: block.timestamp + (_expiryDays * 1 days)
        });
        
        emit OfferMade(_tokenId, msg.sender, msg.value);
    }
    
    function acceptOffer(uint256 _tokenId, address _bidder) public nonReentrant {
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Not token owner");
        
        Offer storage offer = offers[_tokenId][_bidder];
        require(offer.amount > 0, "No valid offer");
        require(block.timestamp <= offer.expiresAt, "Offer expired");
        
        uint256 amount = offer.amount;
        delete offers[_tokenId][_bidder];
        
        // Transfer NFT
        nftContract.transferFrom(msg.sender, _bidder, _tokenId);
        
        // Calculate fees
        uint256 platformFee = (amount * platformFeePercentage) / 100;
        uint256 sellerAmount = amount - platformFee;
        
        totalVolume += amount;
        
        // Transfer funds
        payable(msg.sender).transfer(sellerAmount);
        
        emit OfferAccepted(_tokenId, msg.sender, _bidder, amount);
    }
    
    function cancelOffer(uint256 _tokenId) public nonReentrant {
        Offer storage offer = offers[_tokenId][msg.sender];
        require(offer.amount > 0, "No offer to cancel");
        
        uint256 amount = offer.amount;
        delete offers[_tokenId][msg.sender];
        
        payable(msg.sender).transfer(amount);
        
        emit OfferCancelled(_tokenId, msg.sender);
    }
    
    function getListing(uint256 _tokenId) public view returns (Listing memory) {
        return listings[_tokenId];
    }
    
    function getOffer(uint256 _tokenId, address _bidder) public view returns (Offer memory) {
        return offers[_tokenId][_bidder];
    }
    
    function withdrawPlatformFees() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function setPlatformFee(uint256 _percentage) public onlyOwner {
        require(_percentage <= 10, "Fee too high");
        platformFeePercentage = _percentage;
    }
}
