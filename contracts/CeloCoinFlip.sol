// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CeloCoinFlip {
    uint256 public totalFlips;
    mapping(address => uint256) public userFlips;
    mapping(address => uint256) public userWins;
    mapping(address => uint256) public lastChoice;
    mapping(address => uint256) public lastResult;

    address[10] public topAddresses;
    uint256[10] public topScores;

    event CoinFlipped(
        address indexed player,
        uint256 choice,
        uint256 result,
        bool won,
        uint256 userFlips,
        uint256 totalFlips
    );

    function flip(uint256 choice) external {
        require(choice <= 1, "choice must be 0 or 1");

        totalFlips += 1;
        userFlips[msg.sender] += 1;

        uint256 result = _random(2);
        bool won = result == choice;

        lastChoice[msg.sender] = choice;
        lastResult[msg.sender] = result;

        if (won) {
            userWins[msg.sender] += 1;
        }

        _updateLeaderboard(msg.sender, userWins[msg.sender]);

        emit CoinFlipped(msg.sender, choice, result, won, userFlips[msg.sender], totalFlips);
    }

    function getUserStats(address player)
        external
        view
        returns (uint256 flips, uint256 wins, uint256 latestChoice, uint256 latestResult)
    {
        return (userFlips[player], userWins[player], lastChoice[player], lastResult[player]);
    }

    function getLeaderboard() external view returns (address[10] memory, uint256[10] memory) {
        return (topAddresses, topScores);
    }

    function _random(uint256 modulo) internal view returns (uint256) {
        return uint256(
            keccak256(
                abi.encodePacked(blockhash(block.number - 1), block.timestamp, msg.sender, totalFlips)
            )
        ) % modulo;
    }

    function _updateLeaderboard(address user, uint256 score) internal {
        int256 existingIdx = -1;
        for (uint256 i = 0; i < 10; i++) {
            if (topAddresses[i] == user) {
                existingIdx = int256(i);
                topScores[i] = score;
                break;
            }
        }

        if (existingIdx < 0) {
            uint256 minIdx = 0;
            uint256 minScore = topScores[0];
            for (uint256 i = 1; i < 10; i++) {
                if (topScores[i] < minScore) {
                    minScore = topScores[i];
                    minIdx = i;
                }
            }

            if (score > minScore) {
                topAddresses[minIdx] = user;
                topScores[minIdx] = score;
                existingIdx = int256(minIdx);
            }
        }

        if (existingIdx >= 0) {
            uint256 idx = uint256(existingIdx);
            while (idx > 0 && topScores[idx] > topScores[idx - 1]) {
                (topAddresses[idx], topAddresses[idx - 1]) = (topAddresses[idx - 1], topAddresses[idx]);
                (topScores[idx], topScores[idx - 1]) = (topScores[idx - 1], topScores[idx]);
                idx--;
            }
        }
    }
}
