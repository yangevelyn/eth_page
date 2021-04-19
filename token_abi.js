// https://github.com/shawntabrizi/ERC20-Token-Balance/blob/master/human_standard_token_abi.js
const human_standard_token_abi = [
  {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "name": "",
              "type": "uint8"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "name": "balance",
              "type": "uint256"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "name": "success",
              "type": "bool"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_from",
              "type": "address"
          },
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "name": "success",
              "type": "bool"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_spender",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "name": "success",
              "type": "bool"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          },
          {
              "name": "_spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "remaining",
              "type": "uint256"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "_from",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "_to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "_owner",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "_spender",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "inputs": [
          {
              "name": "_initialAmount",
              "type": "uint256"
          },
          {
              "name": "_tokenName",
              "type": "string"
          },
          {
              "name": "_decimalUnits",
              "type": "uint8"
          },
          {
              "name": "_tokenSymbol",
              "type": "string"
          }
      ],
      "payable": false,
      "type": "constructor"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_spender",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          },
          {
              "name": "_extraData",
              "type": "bytes"
          }
      ],
      "name": "approveAndCall",
      "outputs": [
          {
              "name": "success",
              "type": "bool"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "version",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "type": "function"
  }
];

const ceth_abi = [
  {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x06fdde03"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "spender",
              "type": "address"
          },
          {
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x095ea7b3"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "mint",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0x1249c58b"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "reserveFactorMantissa",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x173b9904"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "account",
              "type": "address"
          }
      ],
      "name": "borrowBalanceCurrent",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x17bfdfbc"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x18160ddd"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "exchangeRateStored",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x182df0f5"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "src",
              "type": "address"
          },
          {
              "name": "dst",
              "type": "address"
          },
          {
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x23b872dd"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "pendingAdmin",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x26782247"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x313ce567"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "balanceOfUnderlying",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x3af9e669"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "getCash",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x3b1d21a2"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "newComptroller",
              "type": "address"
          }
      ],
      "name": "_setComptroller",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x4576b5db"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalBorrows",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x47bd3718"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "repayBorrow",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0x4e4d9fea"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "comptroller",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x5fe3b567"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "reduceAmount",
              "type": "uint256"
          }
      ],
      "name": "_reduceReserves",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x601a0bf1"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "initialExchangeRateMantissa",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x675d972c"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "accrualBlockNumber",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x6c540baf"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x70a08231"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "totalBorrowsCurrent",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x73acee98"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "redeemAmount",
              "type": "uint256"
          }
      ],
      "name": "redeemUnderlying",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x852a12e3"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalReserves",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8f840ddd"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x95d89b41"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "account",
              "type": "address"
          }
      ],
      "name": "borrowBalanceStored",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x95dd9193"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "accrueInterest",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xa6afed95"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "dst",
              "type": "address"
          },
          {
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xa9059cbb"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "borrowIndex",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xaa5af0fd"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "borrower",
              "type": "address"
          },
          {
              "name": "cTokenCollateral",
              "type": "address"
          }
      ],
      "name": "liquidateBorrow",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0xaae40a2a"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "supplyRatePerBlock",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xae9d70b0"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "liquidator",
              "type": "address"
          },
          {
              "name": "borrower",
              "type": "address"
          },
          {
              "name": "seizeTokens",
              "type": "uint256"
          }
      ],
      "name": "seize",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xb2a02ff1"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "newPendingAdmin",
              "type": "address"
          }
      ],
      "name": "_setPendingAdmin",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xb71d1a0c"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "exchangeRateCurrent",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xbd6d894d"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getAccountSnapshot",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          },
          {
              "name": "",
              "type": "uint256"
          },
          {
              "name": "",
              "type": "uint256"
          },
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xc37f68e2"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "borrowAmount",
              "type": "uint256"
          }
      ],
      "name": "borrow",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xc5ebeaec"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "redeemTokens",
              "type": "uint256"
          }
      ],
      "name": "redeem",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xdb006a75"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "owner",
              "type": "address"
          },
          {
              "name": "spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xdd62ed3e"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "borrower",
              "type": "address"
          }
      ],
      "name": "repayBorrowBehalf",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0xe5974619"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "_acceptAdmin",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xe9c714f2"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "newInterestRateModel",
              "type": "address"
          }
      ],
      "name": "_setInterestRateModel",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xf2b3abbd"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "interestRateModel",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xf3fdb15a"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "admin",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xf851a440"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "borrowRatePerBlock",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xf8f9da28"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "newReserveFactorMantissa",
              "type": "uint256"
          }
      ],
      "name": "_setReserveFactor",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xfca7820b"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "isCToken",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xfe9c44ae"
  },
  {
      "inputs": [
          {
              "name": "comptroller_",
              "type": "address"
          },
          {
              "name": "interestRateModel_",
              "type": "address"
          },
          {
              "name": "initialExchangeRateMantissa_",
              "type": "uint256"
          },
          {
              "name": "name_",
              "type": "string"
          },
          {
              "name": "symbol_",
              "type": "string"
          },
          {
              "name": "decimals_",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
  },
  {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "interestAccumulated",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "borrowIndex",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "totalBorrows",
              "type": "uint256"
          }
      ],
      "name": "AccrueInterest",
      "type": "event",
      "signature": "0x875352fb3fadeb8c0be7cbbe8ff761b308fa7033470cd0287f02f3436fd76cb9"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "minter",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "mintAmount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "mintTokens",
              "type": "uint256"
          }
      ],
      "name": "Mint",
      "type": "event",
      "signature": "0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "redeemer",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "redeemAmount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "redeemTokens",
              "type": "uint256"
          }
      ],
      "name": "Redeem",
      "type": "event",
      "signature": "0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "borrower",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "borrowAmount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "accountBorrows",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "totalBorrows",
              "type": "uint256"
          }
      ],
      "name": "Borrow",
      "type": "event",
      "signature": "0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "payer",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "borrower",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "repayAmount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "accountBorrows",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "totalBorrows",
              "type": "uint256"
          }
      ],
      "name": "RepayBorrow",
      "type": "event",
      "signature": "0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "liquidator",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "borrower",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "repayAmount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "cTokenCollateral",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "seizeTokens",
              "type": "uint256"
          }
      ],
      "name": "LiquidateBorrow",
      "type": "event",
      "signature": "0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "oldPendingAdmin",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "newPendingAdmin",
              "type": "address"
          }
      ],
      "name": "NewPendingAdmin",
      "type": "event",
      "signature": "0xca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "oldAdmin",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "newAdmin",
              "type": "address"
          }
      ],
      "name": "NewAdmin",
      "type": "event",
      "signature": "0xf9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "oldComptroller",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "newComptroller",
              "type": "address"
          }
      ],
      "name": "NewComptroller",
      "type": "event",
      "signature": "0x7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "oldInterestRateModel",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "newInterestRateModel",
              "type": "address"
          }
      ],
      "name": "NewMarketInterestRateModel",
      "type": "event",
      "signature": "0xedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f926"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "oldReserveFactorMantissa",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "newReserveFactorMantissa",
              "type": "uint256"
          }
      ],
      "name": "NewReserveFactor",
      "type": "event",
      "signature": "0xaaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "admin",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "reduceAmount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "newTotalReserves",
              "type": "uint256"
          }
      ],
      "name": "ReservesReduced",
      "type": "event",
      "signature": "0x3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "error",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "info",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "detail",
              "type": "uint256"
          }
      ],
      "name": "Failure",
      "type": "event",
      "signature": "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event",
      "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event",
      "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
  }
];

// https://etherscan.io/address/0x0959158b6040D32d04c301A72CBFD6b39E21c9AE#code
// https://curve.readthedocs.io/factory-deployer.html
const curve_abi = [{"name":"BasePoolAdded","inputs":[{"type":"address","name":"base_pool","indexed":false},{"type":"address","name":"implementat","indexed":false}],"anonymous":false,"type":"event"},{"name":"MetaPoolDeployed","inputs":[{"type":"address","name":"coin","indexed":false},{"type":"address","name":"base_pool","indexed":false},{"type":"uint256","name":"A","indexed":false},{"type":"uint256","name":"fee","indexed":false},{"type":"address","name":"deployer","indexed":false}],"anonymous":false,"type":"event"},{"outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"name":"find_pool_for_coins","outputs":[{"type":"address","name":""}],"inputs":[{"type":"address","name":"_from"},{"type":"address","name":"_to"}],"stateMutability":"view","type":"function"},{"name":"find_pool_for_coins","outputs":[{"type":"address","name":""}],"inputs":[{"type":"address","name":"_from"},{"type":"address","name":"_to"},{"type":"uint256","name":"i"}],"stateMutability":"view","type":"function"},{"name":"get_n_coins","outputs":[{"type":"uint256","name":""},{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":2795},{"name":"get_coins","outputs":[{"type":"address[2]","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":2427},{"name":"get_underlying_coins","outputs":[{"type":"address[8]","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":12195},{"name":"get_decimals","outputs":[{"type":"uint256[2]","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":1501},{"name":"get_underlying_decimals","outputs":[{"type":"uint256[8]","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":10155},{"name":"get_rates","outputs":[{"type":"uint256[2]","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":1876},{"name":"get_balances","outputs":[{"type":"uint256[2]","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":1268},{"name":"get_underlying_balances","outputs":[{"type":"uint256[8]","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":13247},{"name":"get_A","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":958},{"name":"get_fees","outputs":[{"type":"uint256","name":""},{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":1584},{"name":"get_admin_balances","outputs":[{"type":"uint256[2]","name":""}],"inputs":[{"type":"address","name":"_pool"}],"stateMutability":"view","type":"function","gas":1388},{"name":"get_coin_indices","outputs":[{"type":"int128","name":""},{"type":"int128","name":""},{"type":"bool","name":""}],"inputs":[{"type":"address","name":"_pool"},{"type":"address","name":"_from"},{"type":"address","name":"_to"}],"stateMutability":"view","type":"function","gas":20309},{"name":"add_base_pool","outputs":[],"inputs":[{"type":"address","name":"_base_pool"},{"type":"address","name":"_metapool_implementation"},{"type":"address","name":"_fee_receiver"}],"stateMutability":"nonpayable","type":"function","gas":544334},{"name":"deploy_metapool","outputs":[{"type":"address","name":""}],"inputs":[{"type":"address","name":"_base_pool"},{"type":"string","name":"_name"},{"type":"string","name":"_symbol"},{"type":"address","name":"_coin"},{"type":"uint256","name":"_A"},{"type":"uint256","name":"_fee"}],"stateMutability":"nonpayable","type":"function","gas":851955},{"name":"commit_transfer_ownership","outputs":[],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":36668},{"name":"accept_transfer_ownership","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":56619},{"name":"set_fee_receiver","outputs":[],"inputs":[{"type":"address","name":"_base_pool"},{"type":"address","name":"_fee_receiver"}],"stateMutability":"nonpayable","type":"function","gas":36943},{"name":"convert_fees","outputs":[{"type":"bool","name":""}],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":5237},{"name":"admin","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1631},{"name":"future_admin","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1661},{"name":"pool_list","outputs":[{"type":"address","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":1800},{"name":"pool_count","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1721},{"name":"base_pool_list","outputs":[{"type":"address","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":1860},{"name":"base_pool_count","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1781},{"name":"fee_receiver","outputs":[{"type":"address","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":2026}]

// https://etherscan.io/address/0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d#code
// https://docs.aave.com/developers/v/2.0/the-core-protocol/protocol-data-provider
// https://docs.aave.com/developers/v/2.0/deployed-contracts/deployed-contracts
const aave_abi = [{"inputs":[{"internalType":"contract ILendingPoolAddressesProvider","name":"addressesProvider","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ADDRESSES_PROVIDER","outputs":[{"internalType":"contract ILendingPoolAddressesProvider","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllATokens","outputs":[{"components":[{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"tokenAddress","type":"address"}],"internalType":"struct AaveProtocolDataProvider.TokenData[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllReservesTokens","outputs":[{"components":[{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"tokenAddress","type":"address"}],"internalType":"struct AaveProtocolDataProvider.TokenData[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"}],"name":"getReserveConfigurationData","outputs":[{"internalType":"uint256","name":"decimals","type":"uint256"},{"internalType":"uint256","name":"ltv","type":"uint256"},{"internalType":"uint256","name":"liquidationThreshold","type":"uint256"},{"internalType":"uint256","name":"liquidationBonus","type":"uint256"},{"internalType":"uint256","name":"reserveFactor","type":"uint256"},{"internalType":"bool","name":"usageAsCollateralEnabled","type":"bool"},{"internalType":"bool","name":"borrowingEnabled","type":"bool"},{"internalType":"bool","name":"stableBorrowRateEnabled","type":"bool"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"isFrozen","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"}],"name":"getReserveData","outputs":[{"internalType":"uint256","name":"availableLiquidity","type":"uint256"},{"internalType":"uint256","name":"totalStableDebt","type":"uint256"},{"internalType":"uint256","name":"totalVariableDebt","type":"uint256"},{"internalType":"uint256","name":"liquidityRate","type":"uint256"},{"internalType":"uint256","name":"variableBorrowRate","type":"uint256"},{"internalType":"uint256","name":"stableBorrowRate","type":"uint256"},{"internalType":"uint256","name":"averageStableBorrowRate","type":"uint256"},{"internalType":"uint256","name":"liquidityIndex","type":"uint256"},{"internalType":"uint256","name":"variableBorrowIndex","type":"uint256"},{"internalType":"uint40","name":"lastUpdateTimestamp","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"}],"name":"getReserveTokensAddresses","outputs":[{"internalType":"address","name":"aTokenAddress","type":"address"},{"internalType":"address","name":"stableDebtTokenAddress","type":"address"},{"internalType":"address","name":"variableDebtTokenAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"getUserReserveData","outputs":[{"internalType":"uint256","name":"currentATokenBalance","type":"uint256"},{"internalType":"uint256","name":"currentStableDebt","type":"uint256"},{"internalType":"uint256","name":"currentVariableDebt","type":"uint256"},{"internalType":"uint256","name":"principalStableDebt","type":"uint256"},{"internalType":"uint256","name":"scaledVariableDebt","type":"uint256"},{"internalType":"uint256","name":"stableBorrowRate","type":"uint256"},{"internalType":"uint256","name":"liquidityRate","type":"uint256"},{"internalType":"uint40","name":"stableRateLastUpdated","type":"uint40"},{"internalType":"bool","name":"usageAsCollateralEnabled","type":"bool"}],"stateMutability":"view","type":"function"}]

// https://etherscan.io/address/0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b
// https://compound.finance/docs
// https://compound.finance/docs/comptroller#market-metadata
// https://github.com/compound-finance/compound-config/blob/master/networks/mainnet.json
const compound_abi = [
  {
      "constant": true,
      "inputs": [],
      "name": "pendingAdmin",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "newPendingAdmin",
              "type": "address"
          }
      ],
      "name": "_setPendingAdmin",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "comptrollerImplementation",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "_acceptImplementation",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "pendingComptrollerImplementation",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "newPendingImplementation",
              "type": "address"
          }
      ],
      "name": "_setPendingImplementation",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "_acceptAdmin",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "admin",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "oldPendingImplementation",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "newPendingImplementation",
              "type": "address"
          }
      ],
      "name": "NewPendingImplementation",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "oldImplementation",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "newImplementation",
              "type": "address"
          }
      ],
      "name": "NewImplementation",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "oldPendingAdmin",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "newPendingAdmin",
              "type": "address"
          }
      ],
      "name": "NewPendingAdmin",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "oldAdmin",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "newAdmin",
              "type": "address"
          }
      ],
      "name": "NewAdmin",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "name": "error",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "info",
              "type": "uint256"
          },
          {
              "indexed": false,
              "name": "detail",
              "type": "uint256"
          }
      ],
      "name": "Failure",
      "type": "event"
  },
  {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "string",
              "name": "action",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "bool",
              "name": "pauseState",
              "type": "bool"
          }
      ],
      "name": "ActionPaused",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "action",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "bool",
              "name": "pauseState",
              "type": "bool"
          }
      ],
      "name": "ActionPaused",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "address",
              "name": "recipient",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "CompGranted",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "newSpeed",
              "type": "uint256"
          }
      ],
      "name": "CompSpeedUpdated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "contributor",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "newSpeed",
              "type": "uint256"
          }
      ],
      "name": "ContributorCompSpeedUpdated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "borrower",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "compDelta",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "compBorrowIndex",
              "type": "uint256"
          }
      ],
      "name": "DistributedBorrowerComp",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "supplier",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "compDelta",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "compSupplyIndex",
              "type": "uint256"
          }
      ],
      "name": "DistributedSupplierComp",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "error",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "info",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "detail",
              "type": "uint256"
          }
      ],
      "name": "Failure",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "MarketEntered",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "MarketExited",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          }
      ],
      "name": "MarketListed",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "newBorrowCap",
              "type": "uint256"
          }
      ],
      "name": "NewBorrowCap",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "address",
              "name": "oldBorrowCapGuardian",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "newBorrowCapGuardian",
              "type": "address"
          }
      ],
      "name": "NewBorrowCapGuardian",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "oldCloseFactorMantissa",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "newCloseFactorMantissa",
              "type": "uint256"
          }
      ],
      "name": "NewCloseFactor",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "oldCollateralFactorMantissa",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "newCollateralFactorMantissa",
              "type": "uint256"
          }
      ],
      "name": "NewCollateralFactor",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "oldLiquidationIncentiveMantissa",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "newLiquidationIncentiveMantissa",
              "type": "uint256"
          }
      ],
      "name": "NewLiquidationIncentive",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "address",
              "name": "oldPauseGuardian",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "newPauseGuardian",
              "type": "address"
          }
      ],
      "name": "NewPauseGuardian",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "contract PriceOracle",
              "name": "oldPriceOracle",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "contract PriceOracle",
              "name": "newPriceOracle",
              "type": "address"
          }
      ],
      "name": "NewPriceOracle",
      "type": "event"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "contract Unitroller",
              "name": "unitroller",
              "type": "address"
          }
      ],
      "name": "_become",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "_borrowGuardianPaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "_grantComp",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "_mintGuardianPaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "newBorrowCapGuardian",
              "type": "address"
          }
      ],
      "name": "_setBorrowCapGuardian",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "bool",
              "name": "state",
              "type": "bool"
          }
      ],
      "name": "_setBorrowPaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "uint256",
              "name": "newCloseFactorMantissa",
              "type": "uint256"
          }
      ],
      "name": "_setCloseFactor",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "newCollateralFactorMantissa",
              "type": "uint256"
          }
      ],
      "name": "_setCollateralFactor",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "compSpeed",
              "type": "uint256"
          }
      ],
      "name": "_setCompSpeed",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "contributor",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "compSpeed",
              "type": "uint256"
          }
      ],
      "name": "_setContributorCompSpeed",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "uint256",
              "name": "newLiquidationIncentiveMantissa",
              "type": "uint256"
          }
      ],
      "name": "_setLiquidationIncentive",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "contract CToken[]",
              "name": "cTokens",
              "type": "address[]"
          },
          {
              "internalType": "uint256[]",
              "name": "newBorrowCaps",
              "type": "uint256[]"
          }
      ],
      "name": "_setMarketBorrowCaps",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "bool",
              "name": "state",
              "type": "bool"
          }
      ],
      "name": "_setMintPaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "newPauseGuardian",
              "type": "address"
          }
      ],
      "name": "_setPauseGuardian",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "contract PriceOracle",
              "name": "newOracle",
              "type": "address"
          }
      ],
      "name": "_setPriceOracle",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "bool",
              "name": "state",
              "type": "bool"
          }
      ],
      "name": "_setSeizePaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "bool",
              "name": "state",
              "type": "bool"
          }
      ],
      "name": "_setTransferPaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          }
      ],
      "name": "_supportMarket",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "accountAssets",
      "outputs": [
          {
              "internalType": "contract CToken",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "admin",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "allMarkets",
      "outputs": [
          {
              "internalType": "contract CToken",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "borrowAmount",
              "type": "uint256"
          }
      ],
      "name": "borrowAllowed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "borrowCapGuardian",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "borrowCaps",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "borrowGuardianPaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "borrowAmount",
              "type": "uint256"
          }
      ],
      "name": "borrowVerify",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "internalType": "contract CToken",
              "name": "cToken",
              "type": "address"
          }
      ],
      "name": "checkMembership",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "holder",
              "type": "address"
          },
          {
              "internalType": "contract CToken[]",
              "name": "cTokens",
              "type": "address[]"
          }
      ],
      "name": "claimComp",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address[]",
              "name": "holders",
              "type": "address[]"
          },
          {
              "internalType": "contract CToken[]",
              "name": "cTokens",
              "type": "address[]"
          },
          {
              "internalType": "bool",
              "name": "borrowers",
              "type": "bool"
          },
          {
              "internalType": "bool",
              "name": "suppliers",
              "type": "bool"
          }
      ],
      "name": "claimComp",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "holder",
              "type": "address"
          }
      ],
      "name": "claimComp",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "closeFactorMantissa",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "compAccrued",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "compBorrowState",
      "outputs": [
          {
              "internalType": "uint224",
              "name": "index",
              "type": "uint224"
          },
          {
              "internalType": "uint32",
              "name": "block",
              "type": "uint32"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "compBorrowerIndex",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "compContributorSpeeds",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "compInitialIndex",
      "outputs": [
          {
              "internalType": "uint224",
              "name": "",
              "type": "uint224"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "compRate",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "compSpeeds",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "compSupplierIndex",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "compSupplyState",
      "outputs": [
          {
              "internalType": "uint224",
              "name": "index",
              "type": "uint224"
          },
          {
              "internalType": "uint32",
              "name": "block",
              "type": "uint32"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "comptrollerImplementation",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address[]",
              "name": "cTokens",
              "type": "address[]"
          }
      ],
      "name": "enterMarkets",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cTokenAddress",
              "type": "address"
          }
      ],
      "name": "exitMarket",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getAccountLiquidity",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "getAllMarkets",
      "outputs": [
          {
              "internalType": "contract CToken[]",
              "name": "",
              "type": "address[]"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getAssetsIn",
      "outputs": [
          {
              "internalType": "contract CToken[]",
              "name": "",
              "type": "address[]"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "getBlockNumber",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "getCompAddress",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "cTokenModify",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "redeemTokens",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "borrowAmount",
              "type": "uint256"
          }
      ],
      "name": "getHypotheticalAccountLiquidity",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "isComptroller",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "lastContributorBlock",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cTokenBorrowed",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "cTokenCollateral",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "liquidator",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "repayAmount",
              "type": "uint256"
          }
      ],
      "name": "liquidateBorrowAllowed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cTokenBorrowed",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "cTokenCollateral",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "liquidator",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "actualRepayAmount",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "seizeTokens",
              "type": "uint256"
          }
      ],
      "name": "liquidateBorrowVerify",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "cTokenBorrowed",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "cTokenCollateral",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "actualRepayAmount",
              "type": "uint256"
          }
      ],
      "name": "liquidateCalculateSeizeTokens",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "liquidationIncentiveMantissa",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "markets",
      "outputs": [
          {
              "internalType": "bool",
              "name": "isListed",
              "type": "bool"
          },
          {
              "internalType": "uint256",
              "name": "collateralFactorMantissa",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "isComped",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "maxAssets",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "minter",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "mintAmount",
              "type": "uint256"
          }
      ],
      "name": "mintAllowed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "mintGuardianPaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "minter",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "actualMintAmount",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "mintTokens",
              "type": "uint256"
          }
      ],
      "name": "mintVerify",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "oracle",
      "outputs": [
          {
              "internalType": "contract PriceOracle",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "pauseGuardian",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "pendingAdmin",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "pendingComptrollerImplementation",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "redeemer",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "redeemTokens",
              "type": "uint256"
          }
      ],
      "name": "redeemAllowed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "redeemer",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "redeemAmount",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "redeemTokens",
              "type": "uint256"
          }
      ],
      "name": "redeemVerify",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "payer",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "repayAmount",
              "type": "uint256"
          }
      ],
      "name": "repayBorrowAllowed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "payer",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "actualRepayAmount",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "borrowerIndex",
              "type": "uint256"
          }
      ],
      "name": "repayBorrowVerify",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cTokenCollateral",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "cTokenBorrowed",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "liquidator",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "seizeTokens",
              "type": "uint256"
          }
      ],
      "name": "seizeAllowed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "seizeGuardianPaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cTokenCollateral",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "cTokenBorrowed",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "liquidator",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "seizeTokens",
              "type": "uint256"
          }
      ],
      "name": "seizeVerify",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "src",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "dst",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "transferTokens",
              "type": "uint256"
          }
      ],
      "name": "transferAllowed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "transferGuardianPaused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "cToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "src",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "dst",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "transferTokens",
              "type": "uint256"
          }
      ],
      "name": "transferVerify",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "contributor",
              "type": "address"
          }
      ],
      "name": "updateContributorRewards",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  }
];

module.exports = { human_standard_token_abi, curve_abi, aave_abi, compound_abi, ceth_abi};
