const contractAddress = "0x16a9C71186F539F0A1E1bAEFc06feB70F9A8bBA9";

const contractAbi = [
  {
    inputs: [],
    name: "getWords",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_word",
        type: "string",
      },
    ],
    name: "uploadWord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "words",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export { contractAbi, contractAddress };
