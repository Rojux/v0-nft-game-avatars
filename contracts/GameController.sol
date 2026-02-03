// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IAvatarNFT {
    function gainExperience(uint256 _tokenId, uint256 _amount) external;
    function getAvatar(uint256 _tokenId) external view returns (
        string memory name,
        uint256 level,
        uint256 experience,
        uint256 health,
        uint256 power,
        uint256 defense,
        uint256 speed,
        uint256 mintedAt,
        bool isStaked
    );
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract GameController {
    
    IAvatarNFT public avatarContract;
    
    struct GameSession {
        uint256 avatarId;
        address player;
        string gameType;
        uint256 score;
        uint256 xpEarned;
        uint256 startedAt;
        bool completed;
    }
    
    struct Leaderboard {
        address player;
        uint256 totalXP;
        uint256 gamesPlayed;
        uint256 score;
    }
    
    mapping(uint256 => GameSession[]) public playerSessions;
    mapping(address => Leaderboard) public leaderboard;
    
    uint256 public sessionCounter;
    
    event GameStarted(uint256 indexed sessionId, uint256 indexed avatarId, address indexed player, string gameType);
    event GameCompleted(uint256 indexed sessionId, uint256 score, uint256 xpEarned);
    event LeaderboardUpdated(address indexed player, uint256 newTotal);
    
    constructor(address _avatarContract) {
        avatarContract = IAvatarNFT(_avatarContract);
    }
    
    function startGame(uint256 _avatarId, string memory _gameType) public returns (uint256) {
        require(avatarContract.ownerOf(_avatarId) == msg.sender, "Not avatar owner");
        
        GameSession memory session = GameSession({
            avatarId: _avatarId,
            player: msg.sender,
            gameType: _gameType,
            score: 0,
            xpEarned: 0,
            startedAt: block.timestamp,
            completed: false
        });
        
        playerSessions[_avatarId].push(session);
        
        uint256 sessionId = sessionCounter;
        sessionCounter++;
        
        emit GameStarted(sessionId, _avatarId, msg.sender, _gameType);
        return sessionId;
    }
    
    function completeGame(uint256 _avatarId, uint256 _sessionIndex, uint256 _score) public {
        GameSession storage session = playerSessions[_avatarId][_sessionIndex];
        require(session.player == msg.sender, "Not game owner");
        require(!session.completed, "Already completed");
        
        session.score = _score;
        session.completed = true;
        
        // Calculate XP based on score (1 point = 1 XP, capped at 500 XP per game)
        uint256 xpEarned = _score > 500 ? 500 : _score;
        session.xpEarned = xpEarned;
        
        // Award experience
        avatarContract.gainExperience(_avatarId, xpEarned);
        
        // Update leaderboard
        leaderboard[msg.sender].totalXP += xpEarned;
        leaderboard[msg.sender].gamesPlayed += 1;
        leaderboard[msg.sender].score += _score;
        
        emit GameCompleted(_avatarId, _score, xpEarned);
        emit LeaderboardUpdated(msg.sender, leaderboard[msg.sender].totalXP);
    }
    
    function getPlayerStats(address _player) public view returns (
        uint256 totalXP,
        uint256 gamesPlayed,
        uint256 totalScore
    ) {
        Leaderboard memory stats = leaderboard[_player];
        return (stats.totalXP, stats.gamesPlayed, stats.score);
    }
    
    function getGameSessions(uint256 _avatarId) public view returns (GameSession[] memory) {
        return playerSessions[_avatarId];
    }
}
