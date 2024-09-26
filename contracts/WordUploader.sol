// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WordUploader {
    string[] public words;

    function uploadWord(string memory _word) public {
        words.push(_word);
    }

    function getWords() public view returns (string[] memory) {
        return words;
    }
}