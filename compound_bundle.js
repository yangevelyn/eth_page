(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {getCompoundList, addRowToHTML} = require('./compound_functions');

let sortBy = "supply";
let reverse = true;
let compoundList = [];

function sort(type){
  //clear all icons
  // document.getElementById('market-sort').classList = "fa fa-sort";
  // document.getElementById('market-sort').style = "color: lightgrey;";
  document.getElementById('supply-sort').classList = "fa fa-sort";
  document.getElementById('supply-sort').style = "color: lightgrey;";
  document.getElementById('comp-supply-sort').classList = "fa fa-sort";
  document.getElementById('comp-supply-sort').style = "color: lightgrey;";
  document.getElementById('borrow-sort').classList = "fa fa-sort";
  document.getElementById('borrow-sort').style = "color: lightgrey;";
  document.getElementById('comp-borrow-sort').classList = "fa fa-sort";
  document.getElementById('comp-borrow-sort').style = "color: lightgrey;";

  let icon = document.getElementById(`${type}-sort`);

  //reverse if already sorting by this type
  if(sortBy == type){
    reverse = !reverse;
  } else{
    reverse = true;
  }

  //set icon
  reverse ? 
    icon.classList.replace('fa-sort', 'fa-sort-down') : 
    icon.classList.replace('fa-sort', 'fa-sort-up');
  icon.style = "color: slategrey;";
  
  sortBy = type;
  setTableHTML();
}

async function init_protocols(){
  // document.getElementById("market-head").onclick = () => {sort('market')};
  document.getElementById("supply-head").onclick = () => {sort('supply')};
  document.getElementById("comp-supply-head").onclick = () => {sort('comp-supply')};
  document.getElementById("borrow-head").onclick = () => {sort('borrow')};
  document.getElementById("comp-borrow-head").onclick = () => {sort('comp-borrow')};

  main();
}

async function setTableHTML(){
  //clear list
  document.getElementById('mk-list').innerHTML = `<tbody id="mk-list"></tbody>`;

  if(sortBy == 'supply'){
    compoundList.sort((a, b) => reverse ? b.supply_rate - a.supply_rate : a.supply_rate - b.supply_rate);
  } else if(sortBy == 'borrow'){
    compoundList.sort((a, b) => reverse ? b.borrow_rate - a.borrow_rate : a.borrow_rate - b.borrow_rate);
  } else if(sortBy == 'comp-supply'){
    compoundList.sort((a, b) => reverse ? b.comp_supply_apy - a.comp_supply_apy : a.comp_supply_apy - b.comp_supply_apy);
  } else if(sortBy == 'comp-borrow'){
    compoundList.sort((a, b) => reverse ? b.comp_borrow_apy - a.comp_borrow_apy : a.comp_borrow_apy - b.comp_borrow_apy);
  }

  for(let i = 0; i < compoundList.length; i++){
    await addRowToHTML(compoundList[i]);
  }
}

async function main(){
  try {
    document.getElementById('spinner').style.display = 'block';
    compoundList = await getCompoundList();

    await setTableHTML();

    document.getElementById('spinner').style.display = 'none';
  } catch (error) {
    console.log(error);
    document.getElementById('spinner').style.display = 'none';
  }
}

window.onload = init_protocols;

},{"./compound_functions":2}],2:[function(require,module,exports){
const token_json = require("./tokenlist.json");
var tokenlist = token_json.tokens;
const { human_standard_token_abi, curve_abi, aave_abi, compound_abi, ceth_abi } = require('./token_abi');

// get list of Compound's markets
async function getCompoundList(){
  let url = 'https://api.compound.finance/api/v2/ctoken';

  return await axios.get(url)
  .then((res) => {
    console.log(res.data.cToken);
    return res.data.cToken.map((token) => {
      // console.log(token.comp_supply_apy);
      return {
        underlying_name: token.underlying_name, 
        underlying_symbol: token.underlying_symbol, 
        borrow_rate: parseFloat(token.borrow_rate.value) * 100, 
        supply_rate: parseFloat(token.supply_rate.value) * 100, 
        comp_borrow_apy: parseFloat(token.comp_borrow_apy.value), 
        comp_supply_apy: parseFloat(token.comp_supply_apy.value)
      };
    });
  })
}

async function addRowToHTML(token){
  //get logo if in token is in token_abi.json
  const ind = tokenlist.findIndex(i => i.symbol == token.underlying_symbol);
  let logo = "";
  if(ind != -1){
    logo = tokenlist[ind].logoURI;
  }

  let node = document.createElement("tr");
  let market = document.createElement("th");
  let logoHTML = document.createElement("img");
  let tokenText = document.createElement("div");
  let name = document.createElement("div");
  let symbol = document.createElement("div");
  logoHTML.src = logo;
  logoHTML.height = "36";
  name.innerText = token.underlying_name;
  name.style.marginLeft = "8px";
  symbol.innerText = token.underlying_symbol;
  symbol.style.marginLeft = "8px";
  tokenText.appendChild(name);
  tokenText.appendChild(symbol);
  market.appendChild(logoHTML);
  market.appendChild(tokenText);
  market.style.display = "flex";
  market.style.alignItems = "center";

  let supply = document.createElement("td");
  supply.innerHTML = token.supply_rate.toFixed(2) + "%";
  let comp_supply = document.createElement("td");
  comp_supply.innerHTML = token.comp_supply_apy.toFixed(2) + "%";
  let borrow = document.createElement("td");
  borrow.innerHTML = token.borrow_rate.toFixed(2) + "%";
  let comp_borrow = document.createElement("td");
  comp_borrow.innerHTML = token.comp_borrow_apy.toFixed(2) + "%";

  node.appendChild(market);
  node.appendChild(supply);
  node.appendChild(comp_supply);
  node.appendChild(borrow);
  node.appendChild(comp_borrow);
  document.getElementById("mk-list").appendChild(node);
  $(function () {
    $('[data-toggle="popover"]').popover({html: true})
  })
  //http://bootply.com/99372
  $('body').on('click', function (e) {
      $('[data-toggle=popover]').each(function () {
          // hide any open popovers when the anywhere else in the body is clicked
          if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
              $(this).popover('hide');
          }
      });
  });
}

module.exports = {getCompoundList, addRowToHTML};

},{"./token_abi":3,"./tokenlist.json":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports={
  "keywords": ["zapper", "defi"],
  "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/zapper.png",
  "name": "Zapper Token List",
  "timestamp": "2020-10-20T16:48:35.557Z",
  "tokens": [
    {
      "address": "0xe41d2489571d322189246dafa5ebde1f4699f498",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ZRX-icon.png",
      "name": "0x",
      "symbol": "ZRX"
    },
    {
      "address": "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/3CRV-icon.png",
      "name": "3Pool Curve",
      "symbol": "3CRV"
    },
    {
      "address": "0xc0134b5b924c2fca106efb33c45446c466fbe03e",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ALEPH-icon.png",
      "name": "ALEPH",
      "symbol": "ALEPH"
    },
    {
      "address": "0x209c1808febf6c1ab7c65764bb61ad67d3923fcc",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/APE-icon.png",
      "name": "APEcoin",
      "symbol": "APE"
    },
    {
      "address": "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/AAVE-icon.png",
      "name": "Aave",
      "symbol": "AAVE"
    },
    {
      "address": "0xfc1e690f61efd961294b3e1ce3313fbd8aa4f85d",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/aDAI-icon.png",
      "name": "Aave DAI",
      "symbol": "aDAI"
    },
    {
      "address": "0xa64bd6c70cb9051f6a9ba1f163fdc07e0dfb5f84",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/aLINK-icon.png",
      "name": "Aave LINK",
      "symbol": "aLINK"
    },
    {
      "address": "0x80fb784b7ed66730e8b1dbd9820afd29931aab03",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/LEND-icon.png",
      "name": "Aave Old",
      "symbol": "LEND"
    },
    {
      "address": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      "chainId": 1,
      "decimals": 4,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/AST-icon.png",
      "name": "AirSwap",
      "symbol": "AST"
    },
    {
      "address": "0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/AKRO-icon.png",
      "name": "Akropolis",
      "symbol": "AKRO"
    },
    {
      "address": "0x94d863173ee77439e4292284ff13fad54b3ba182",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ADEL-icon.png",
      "name": "Akropolis Delphi",
      "symbol": "ADEL"
    },
    {
      "address": "0x8ba6dcc667d3ff64c1a2123ce72ff5f0199e5315",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ALEX-icon.png",
      "name": "Alex",
      "symbol": "ALEX"
    },
    {
      "address": "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
      "chainId": 1,
      "decimals": 9,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/AMPL-icon.png",
      "name": "Ampleforth",
      "symbol": "AMPL"
    },
    {
      "address": "0x960b236a07cf122663c4303350609a66a7b288c0",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ANT-icon.png",
      "name": "Aragon",
      "symbol": "ANT"
    },
    {
      "address": "0xcd62b1c403fa761baadfc74c525ce2b51780b184",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ANJ-icon.png",
      "name": "Aragon Court",
      "symbol": "ANJ"
    },
    {
      "address": "0xc12d099be31567add4e4e4d0d45691c3f58f5663",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/AUC-icon.png",
      "name": "Auctus",
      "symbol": "AUC"
    },
    {
      "address": "0x221657776846890989a759ba2973e427dff5c9bb",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/REP-icon.png",
      "name": "Augur",
      "symbol": "REP"
    },
    {
      "address": "0x668dbf100635f593a3847c0bdaf21f0a09380188",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BNSD-icon.png",
      "name": "BNSD Finance",
      "symbol": "BNSD"
    },
    {
      "address": "0x6e36556b3ee5aa28def2a8ec3dae30ec2b208739",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BUILD-icon.png",
      "name": "BUILD Finance",
      "symbol": "BUILD"
    },
    {
      "address": "0xba100000625a3754423978a60c9317c58a424e3d",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BAL-icon.png",
      "name": "Balancer",
      "symbol": "BAL"
    },
    {
      "address": "0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BNT-icon.png",
      "name": "Bancor Network Token",
      "symbol": "BNT"
    },
    {
      "address": "0xba11d00c5f74255f56a5e366f4f77f5a186d7f55",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BAND-icon.png",
      "name": "Band Protocol",
      "symbol": "BAND"
    },
    {
      "address": "0x68a118ef45063051eac49c7e647ce5ace48a68a5",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BASED-icon.png",
      "name": "Based Money",
      "symbol": "BASED"
    },
    {
      "address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BAT-icon.png",
      "name": "Basic Attention Token",
      "symbol": "BAT"
    },
    {
      "address": "0x2c537e5624e4af88a7ae4060c022609376c8d0eb",
      "chainId": 1,
      "decimals": 6,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/TRYb-icon.png",
      "name": "BiLira",
      "symbol": "TRYb"
    },
    {
      "address": "0x4fabb145d64652a948d72533023f6e7a623c7c53",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BUSD-icon.png",
      "name": "Binance USD",
      "symbol": "BUSD"
    },
    {
      "address": "0x3e780920601d61cedb860fe9c4a90c9ea6a35e78",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BOOST-icon.png",
      "name": "Boosted Finance",
      "symbol": "BOOST"
    },
    {
      "address": "0x5beabaebb3146685dd74176f68a0721f91297d37",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BOT-icon.png",
      "name": "Bounce Token",
      "symbol": "BOT"
    },
    {
      "address": "0x4f9254c83eb525f9fcf346490bbb3ed28a81c667",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/CELR-icon.png",
      "name": "Celer Network",
      "symbol": "CELR"
    },
    {
      "address": "0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d",
      "chainId": 1,
      "decimals": 4,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/CEL-icon.png",
      "name": "Celsius Network",
      "symbol": "CEL"
    },
    {
      "address": "0xc4c2614e694cf534d407ee49f8e44d125e4681c4",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/CHAIN-icon.png",
      "name": "Chain Games",
      "symbol": "CHAIN"
    },
    {
      "address": "0x514910771af9ca656af840dff83e8264ecf986ca",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/LINK-icon.png",
      "name": "Chainlink",
      "symbol": "LINK"
    },
    {
      "address": "0x3936ad01cf109a36489d93cabda11cf062fd3d48",
      "chainId": 1,
      "decimals": 9,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/COIL-icon.png",
      "name": "Coil",
      "symbol": "COIL"
    },
    {
      "address": "0x87b008e57f640d94ee44fd893f0323af933f9195",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/COIN-icon.png",
      "name": "Coin Artist",
      "symbol": "COIN"
    },
    {
      "address": "0xc00e94cb662c3520282e6f5717214004a7f26888",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/COMP-icon.png",
      "name": "Compound",
      "symbol": "COMP"
    },
    {
      "address": "0x2ba592f78db6436527729929aaf6c908497cb200",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/CREAM-icon.png",
      "name": "Cream",
      "symbol": "CREAM"
    },
    {
      "address": "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/CRO-icon.png",
      "name": "Crypto.com Coin",
      "symbol": "CRO"
    },
    {
      "address": "0xd533a949740bb3306d119cc777fa900ba034cd52",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/CRV-icon.png",
      "name": "Curve DAO Token",
      "symbol": "CRV"
    },
    {
      "address": "0x3b62f3820e0b035cc4ad602dece6d796bc325325",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DEUS-icon.png",
      "name": "DEUS Finance",
      "symbol": "DEUS"
    },
    {
      "address": "0xa1d0e215a23d7030842fc67ce582a6afa3ccab83",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/YFII-icon.png",
      "name": "DFI.money",
      "symbol": "YFII"
    },
    {
      "address": "0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DIA-icon.png",
      "name": "DIA",
      "symbol": "DIA"
    },
    {
      "address": "0xed91879919b71bb6905f23af0a68d231ecf87b14",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DMG-icon.png",
      "name": "DMM Governance",
      "symbol": "DMG"
    },
    {
      "address": "0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DODO-icon.png",
      "name": "DODO",
      "symbol": "DODO"
    },
    {
      "address": "0x0a913bead80f321e7ac35285ee10d9d922659cb7",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DOS-icon.png",
      "name": "DOS Network",
      "symbol": "DOS"
    },
    {
      "address": "0xa1d65e8fb6e87b60feccbc582f7f97804b725521",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DXD-icon.png",
      "name": "DXDao",
      "symbol": "DXD"
    },
    {
      "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DAI-icon.png",
      "name": "Dai",
      "symbol": "DAI"
    },
    {
      "address": "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DPI-icon.png",
      "name": "DeFiPulse Index",
      "symbol": "DPI"
    },
    {
      "address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/MANA-icon.png",
      "name": "Decentraland",
      "symbol": "MANA"
    },
    {
      "address": "0x9cb2f26a23b8d89973f08c957c4d7cdf75cd341c",
      "chainId": 1,
      "decimals": 6,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DZAR-icon.png",
      "name": "Digital Rand",
      "symbol": "DZAR"
    },
    {
      "address": "0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf",
      "chainId": 1,
      "decimals": 9,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DGX-icon.png",
      "name": "Digix Gold",
      "symbol": "DGX"
    },
    {
      "address": "0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DONUT-icon.png",
      "name": "Donut",
      "symbol": "DONUT"
    },
    {
      "address": "0x178c820f862b14f316509ec36b13123da19a6054",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/EWTB-icon.png",
      "name": "EWTB",
      "symbol": "EWTB"
    },
    {
      "address": "0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ENG-icon.png",
      "name": "Enigma",
      "symbol": "ENG"
    },
    {
      "address": "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ENJ-icon.png",
      "name": "Enjin Coin",
      "symbol": "ENJ"
    },
    {
      "address": "0x0000000000000000000000000000000000000000",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ETH-icon.png",
      "name": "Ethereum",
      "symbol": "ETH"
    },
    {
      "address": "0xc719d010b63e5bbf2c0551872cd5316ed26acd83",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DIP-icon.png",
      "name": "Etherisc DIP Token",
      "symbol": "DIP"
    },
    {
      "address": "0xeeeeeeeee2af8d0e1940679860398308e0ef24d6",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ETHV-icon.png",
      "name": "Ethverse",
      "symbol": "ETHV"
    },
    {
      "address": "0x4946fcea7c692606e8908002e55a582af44ac121",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/FOAM-icon.png",
      "name": "FOAM",
      "symbol": "FOAM"
    },
    {
      "address": "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/FTT-icon.png",
      "name": "FTX Token",
      "symbol": "FTT"
    },
    {
      "address": "0xfffffffff15abf397da76f1dcc1a1604f45126db",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/FSW-icon.png",
      "name": "Falconswap",
      "symbol": "FSW"
    },
    {
      "address": "0xaea46a60368a7bd060eec7df8cba43b7ef41ad85",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/FET-icon.png",
      "name": "Fetch.ai",
      "symbol": "FET"
    },
    {
      "address": "0x4a57e687b9126435a9b19e4a802113e266adebde",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/FXC-icon.png",
      "name": "Flexacoin",
      "symbol": "FXC"
    },
    {
      "address": "0xc6e64729931f60d2c8bc70a27d66d9e0c28d1bf9",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/FLOW-icon.png",
      "name": "Flow Protocol",
      "symbol": "FLOW"
    },
    {
      "address": "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/GUSD-icon.png",
      "name": "Gemini Dollar",
      "symbol": "GUSD"
    },
    {
      "address": "0x6810e776880c02933d47db1b9fc05908e5386b96",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/GNO-icon.png",
      "name": "Gnosis",
      "symbol": "GNO"
    },
    {
      "address": "0xdf574c24545e5ffecb9a659c229253d4111d87e1",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/HUSD-icon.png",
      "name": "HUSD",
      "symbol": "HUSD"
    },
    {
      "address": "0x0e29e5abbb5fd88e28b2d355774e73bd47de3bcd",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/HAKKA-icon.png",
      "name": "Hakka Finance",
      "symbol": "HAKKA"
    },
    {
      "address": "0xa0246c9032bc3a600820415ae600c6388619a14d",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/FARM-icon.png",
      "name": "Harvest Finance",
      "symbol": "FARM"
    },
    {
      "address": "0x584bc13c7d411c00c01a62e8019472de68768430",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/HEGIC-icon.png",
      "name": "Hegic",
      "symbol": "HEGIC"
    },
    {
      "address": "0x0316eb71485b0ab14103307bf65a021042c6d380",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/HBTC-icon.png",
      "name": "Huobi BTC",
      "symbol": "HBTC"
    },
    {
      "address": "0xb705268213d593b8fd88d3fdeff93aff5cbdcfae",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/IDEX-icon.png",
      "name": "IDEX",
      "symbol": "IDEX"
    },
    {
      "address": "0xcc13fc627effd6e35d2d2706ea3c4d7396c610ea",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/IDXM-icon.png",
      "name": "IDEX Membership",
      "symbol": "IDXM"
    },
    {
      "address": "0x0954906da0bf32d5479e25f46056d22f08464cab",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/INDEX-icon.png",
      "name": "Index Cooperative",
      "symbol": "INDEX"
    },
    {
      "address": "0x8a9c67fee641579deba04928c4bc45f66e26343a",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/JRT-icon.png",
      "name": "Jarvis Reward Token",
      "symbol": "JRT"
    },
    {
      "address": "0x85eee30c52b0b379b046fb0f85f4f3dc3009afec",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/KEEP-icon.png",
      "name": "Keep Network",
      "symbol": "KEEP"
    },
    {
      "address": "0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PNK-icon.png",
      "name": "Kleros",
      "symbol": "PNK"
    },
    {
      "address": "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/KNC-icon.png",
      "name": "Kyber Network",
      "symbol": "KNC"
    },
    {
      "address": "0x0e2ec54fc0b509f445631bf4b91ab8168230c752",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/LINKUSD-icon.png",
      "name": "LINKUSD",
      "symbol": "LINKUSD"
    },
    {
      "address": "0x49849c98ae39fff122806c06791fa73784fb3675",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/renBTCCurve-icon.png",
      "name": "LP renBTC Curve",
      "symbol": "renBTCCurve"
    },
    {
      "address": "0x075b1bb99792c9e1041ba13afef80c91a1e70fb3",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/sBTCCurve-icon.png",
      "name": "LP sBTC Curve",
      "symbol": "sBTCCurve"
    },
    {
      "address": "0x3b3ac5386837dc563660fb6a0937dfaa5924333b",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/bCurve-icon.png",
      "name": "LP-bCurve",
      "symbol": "bCurve"
    },
    {
      "address": "0xc25a3a3b969415c80451098fa907ec722572917f",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/sCurve-icon.png",
      "name": "LP-sCurve",
      "symbol": "sCurve"
    },
    {
      "address": "0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/yCurve-icon.png",
      "name": "LP-yCurve",
      "symbol": "yCurve"
    },
    {
      "address": "0xab37e1358b639fd877f015027bb62d3ddaa7557e",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/LIEN-icon.png",
      "name": "Lien",
      "symbol": "LIEN"
    },
    {
      "address": "0x58b6a8a3302369daec383334672404ee733ab239",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/LPT-icon.png",
      "name": "Livepeer",
      "symbol": "LPT"
    },
    {
      "address": "0xa4e8c3ec456107ea67d3075bf9e3df3a75823db0",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/LOOM-icon.png",
      "name": "Loom Network",
      "symbol": "LOOM"
    },
    {
      "address": "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/LRC-icon.png",
      "name": "Loopring",
      "symbol": "LRC"
    },
    {
      "address": "0xb1f66997a5760428d3a87d68b90bfe0ae64121cc",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/LUA-icon.png",
      "name": "Lua Token",
      "symbol": "LUA"
    },
    {
      "address": "0x4e352cf164e64adcbad318c3a1e222e9eba4ce42",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/MCB-icon.png",
      "name": "MCDex",
      "symbol": "MCB"
    },
    {
      "address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/MKR-icon.png",
      "name": "Maker",
      "symbol": "MKR"
    },
    {
      "address": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/MATIC-icon.png",
      "name": "Matic Network",
      "symbol": "MATIC"
    },
    {
      "address": "0xec67005c4e498ec7f55e092bd1d35cbc47c91892",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/MLN-icon.png",
      "name": "Melon",
      "symbol": "MLN"
    },
    {
      "address": "0xd5525d397898e5502075ea5e830d8914f6f0affe",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/MEME-icon.png",
      "name": "Meme",
      "symbol": "MEME"
    },
    {
      "address": "0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/MTA-icon.png",
      "name": "Meta",
      "symbol": "MTA"
    },
    {
      "address": "0xf433089366899d83a9f26a773d59ec7ecf30355e",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/MTL-icon.png",
      "name": "Metal",
      "symbol": "MTL"
    },
    {
      "address": "0xefc1c73a3d8728dc4cf2a18ac5705fe93e5914ac",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/METRIC-icon.png",
      "name": "MetricExchange",
      "symbol": "METRIC"
    },
    {
      "address": "0xaaaf91d9b90df800df4f55c205fd6989c977e73a",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/TKN-icon.png",
      "name": "Monolith",
      "symbol": "TKN"
    },
    {
      "address": "0x68a3637ba6e75c0f66b61a42639c4e9fcd3d4824",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/MOON-icon.png",
      "name": "MoonSwap",
      "symbol": "MOON"
    },
    {
      "address": "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/NEXO-icon.png",
      "name": "NEXO",
      "symbol": "NEXO"
    },
    {
      "address": "0xcc80c051057b774cd75067dc48f8987c4eb97a5e",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/NEC-icon.png",
      "name": "Nectar Token",
      "symbol": "NEC"
    },
    {
      "address": "0xd7c49cee7e9188cca6ad8ff264c1da2e69d4cf3b",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/NXM-icon.png",
      "name": "Nexus Mutual",
      "symbol": "NXM"
    },
    {
      "address": "0x1776e1f26f98b1a5df9cd347953a26dd3cb46671",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/NMR-icon.png",
      "name": "Numeraire",
      "symbol": "NMR"
    },
    {
      "address": "0xd26114cd6ee289accf82350c8d8487fedb8a0c07",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/OMG-icon.png",
      "name": "OMG Network",
      "symbol": "OMG"
    },
    {
      "address": "0x967da4048cd07ab37855c090aaf366e4ce1b9f48",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/OCEAN-icon.png",
      "name": "Ocean Protocol",
      "symbol": "OCEAN"
    },
    {
      "address": "0x7240ac91f01233baaf8b064248e80feaa5912ba3",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/OCTO-icon.png",
      "name": "OctoFi",
      "symbol": "OCTO"
    },
    {
      "address": "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/OUSD-icon.png",
      "name": "Origin Dollar",
      "symbol": "OUSD"
    },
    {
      "address": "0x8207c1ffc5b6804f6024322ccf34f29c3541ae26",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/OGN-icon.png",
      "name": "Origin Protocol",
      "symbol": "OGN"
    },
    {
      "address": "0x45804880de22913dafe09f4980848ece6ecbaf78",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PAXG-icon.png",
      "name": "PAX Gold",
      "symbol": "PAXG"
    },
    {
      "address": "0xd56dac73a4d6766464b38ec6d91eb45ce7457c44",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PAN-icon.png",
      "name": "Panvala Pan",
      "symbol": "PAN"
    },
    {
      "address": "0x8e870d67f660d95d5be530380d0ec0bd388289e1",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PAX-icon.png",
      "name": "Paxos Standard",
      "symbol": "PAX"
    },
    {
      "address": "0xbc396689893d065f41bc2c6ecbee5e0085233447",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PERP-icon.png",
      "name": "Perpetual Protocol",
      "symbol": "PERP"
    },
    {
      "address": "0x429881672b9ae42b8eba0e26cd9c73711b891ca5",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PICKLE-icon.png",
      "name": "Pickle Finance",
      "symbol": "PICKLE"
    },
    {
      "address": "0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BTC++-icon.png",
      "name": "PieDAO BTC++",
      "symbol": "BTC++"
    },
    {
      "address": "0x78f225869c08d478c34e5f645d07a87d3fe8eb78",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DEFI+L-icon.png",
      "name": "PieDAO DEFI Large Cap",
      "symbol": "DEFI+L"
    },
    {
      "address": "0xad6a626ae2b43dcb1b39430ce496d2fa0365ba9c",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DEFI+S-icon.png",
      "name": "PieDAO DEFI Small Cap",
      "symbol": "DEFI+S"
    },
    {
      "address": "0xad32a8e6220741182940c5abf610bde99e737b2d",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/DOUGH-icon.png",
      "name": "PieDAO DOUGH v2",
      "symbol": "DOUGH"
    },
    {
      "address": "0x9a48bd0ec040ea4f1d3147c025cd4076a2e71e3e",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/USD++-icon.png",
      "name": "PieDAO USD++",
      "symbol": "USD++"
    },
    {
      "address": "0xe3818504c1b32bf1557b16c238b2e01fd3149c17",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PLR-icon.png",
      "name": "Pillar",
      "symbol": "PLR"
    },
    {
      "address": "0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PPT-icon.png",
      "name": "Populous",
      "symbol": "PPT"
    },
    {
      "address": "0xd7b7d3c0bda57723fb54ab95fd8f9ea033af37f2",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PYLON-icon.png",
      "name": "Pylon Finance",
      "symbol": "PYLON"
    },
    {
      "address": "0x408e41876cccdc0f92210600ef50372656052a38",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/REN-icon.png",
      "name": "REN",
      "symbol": "REN"
    },
    {
      "address": "0xe17f017475a709de58e976081eb916081ff4c9d5",
      "chainId": 1,
      "decimals": 9,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/RMPL-icon.png",
      "name": "RMPL",
      "symbol": "RMPL"
    },
    {
      "address": "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/RDN-icon.png",
      "name": "Raiden Network Token",
      "symbol": "RDN"
    },
    {
      "address": "0xfca59cd816ab1ead66534d82bc21e7515ce441cf",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/RARI-icon.png",
      "name": "Rarible",
      "symbol": "RARI"
    },
    {
      "address": "0x8f8221afbb33998d8584a2b05749ba73c37a938a",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/REQ-icon.png",
      "name": "Request",
      "symbol": "REQ"
    },
    {
      "address": "0x8762db106b2c2a0bccb3a80d1ed41273552616e8",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/RSR-icon.png",
      "name": "Reserve Rights Token",
      "symbol": "RSR"
    },
    {
      "address": "0xf970b8e36e23f7fc3fd752eea86f8be8d83375a6",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/RCN-icon.png",
      "name": "Ripio Credit Network",
      "symbol": "RCN"
    },
    {
      "address": "0xb4efd85c19999d84251304bda99e90b92300bd93",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/RPL-icon.png",
      "name": "Rocket Pool",
      "symbol": "RPL"
    },
    {
      "address": "0x9d47894f8becb68b9cf3428d256311affe8b068b",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ROPE-icon.png",
      "name": "Rope",
      "symbol": "ROPE"
    },
    {
      "address": "0x066798d9ef0833ccc719076dab77199ecbd178b0",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SAKE-icon.png",
      "name": "SakeToken",
      "symbol": "SAKE"
    },
    {
      "address": "0xc28e27870558cf22add83540d2126da2e4b464c2",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SASHIMI-icon.png",
      "name": "Sashimi",
      "symbol": "SASHIMI"
    },
    {
      "address": "0x476c5e26a75bd202a9683ffd34359c0cc15be0ff",
      "chainId": 1,
      "decimals": 6,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SRM-icon.png",
      "name": "Serum",
      "symbol": "SRM"
    },
    {
      "address": "0xe25b0bba01dc5630312b6a21927e578061a13f55",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SHIP-icon.png",
      "name": "ShipChain",
      "symbol": "SHIP"
    },
    {
      "address": "0x37236cd05b34cc79d3715af2383e96dd7443dcf1",
      "chainId": 1,
      "decimals": 0,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SLP-icon.png",
      "name": "Small Love Potion",
      "symbol": "SLP"
    },
    {
      "address": "0xfe9a29ab92522d14fc65880d817214261d8479ae",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SNOW-icon.png",
      "name": "Snowswap",
      "symbol": "SNOW"
    },
    {
      "address": "0x40fd72257597aa14c7231a7b1aaa29fce868f677",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/XOR-icon.png",
      "name": "Sora",
      "symbol": "XOR"
    },
    {
      "address": "0xe54f9e6ab80ebc28515af8b8233c1aee6506a15e",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/PASTA-icon.png",
      "name": "Spaghetti",
      "symbol": "PASTA"
    },
    {
      "address": "0x4da27a545c0c5b758a6ba100e3a049001de870f5",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/stkAAVE-icon.png",
      "name": "Staked Aave",
      "symbol": "stkAAVE"
    },
    {
      "address": "0xa7de087329bfcda5639247f96140f9dabe3deed1",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/STA-icon.png",
      "name": "Statera",
      "symbol": "STA"
    },
    {
      "address": "0x744d70fdbe2ba4cf95131626614a1763df805b9e",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SNT-icon.png",
      "name": "Status",
      "symbol": "SNT"
    },
    {
      "address": "0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/STORJ-icon.png",
      "name": "Storj",
      "symbol": "STORJ"
    },
    {
      "address": "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SUSHI-icon.png",
      "name": "Sushi",
      "symbol": "SUSHI"
    },
    {
      "address": "0xb8baa0e4287890a5f79863ab62b7f175cecbd433",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SWRV-icon.png",
      "name": "Swerve",
      "symbol": "SWRV"
    },
    {
      "address": "0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SXP-icon.png",
      "name": "Swipe",
      "symbol": "SXP"
    },
    {
      "address": "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SNX-icon.png",
      "name": "Synthetix Network Token",
      "symbol": "SNX"
    },
    {
      "address": "0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/TRB-icon.png",
      "name": "Tellor",
      "symbol": "TRB"
    },
    {
      "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "chainId": 1,
      "decimals": 6,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/USDT-icon.png",
      "name": "Tether",
      "symbol": "USDT"
    },
    {
      "address": "0x4922a015c4407f87432b179bb209e125432e4a2a",
      "chainId": 1,
      "decimals": 6,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/XAUT-icon.png",
      "name": "Tether Gold",
      "symbol": "XAUT"
    },
    {
      "address": "0x19810559df63f19cfe88923313250550edadb743",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/HOUSE-icon.png",
      "name": "Toast.finance",
      "symbol": "HOUSE"
    },
    {
      "address": "0x3a92bd396aef82af98ebc0aa9030d25a23b11c6b",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/TBX-icon.png",
      "name": "Tokenbox",
      "symbol": "TBX"
    },
    {
      "address": "0x0000000000085d4780b73119b644ae5ecd22b376",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/TUSD-icon.png",
      "name": "TrueUSD",
      "symbol": "TUSD"
    },
    {
      "address": "0xcc4304a31d09258b0029ea7fe63d032f52e44efe",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SWAP-icon.png",
      "name": "Trustswap",
      "symbol": "SWAP"
    },
    {
      "address": "0x04fa0d235c4abf4bcf4787af4cf447de572ef828",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/UMA-icon.png",
      "name": "UMA",
      "symbol": "UMA"
    },
    {
      "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "chainId": 1,
      "decimals": 6,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/USDC-icon.png",
      "name": "USD Coin",
      "symbol": "USDC"
    },
    {
      "address": "0x1c48f86ae57291f7686349f12601910bd8d470bb",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/USDK-icon.png",
      "name": "USDK",
      "symbol": "USDK"
    },
    {
      "address": "0x674c6ad92fd080e4004b2312b45f796a192d27a0",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/USDN-icon.png",
      "name": "USDN",
      "symbol": "USDN"
    },
    {
      "address": "0x8400d94a5cb0fa0d041a3788e395285d61c9ee5e",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/UBT-icon.png",
      "name": "Unibright",
      "symbol": "UBT"
    },
    {
      "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/UNI-icon.png",
      "name": "Uniswap",
      "symbol": "UNI"
    },
    {
      "address": "0x6f87d756daf0503d08eb8993686c7fc01dc44fb1",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/TRADE-icon.png",
      "name": "Unitrade",
      "symbol": "TRADE"
    },
    {
      "address": "0x49e833337ece7afe375e44f4e3e8481029218e5c",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/VALUE-icon.png",
      "name": "Value Liquidity",
      "symbol": "VALUE"
    },
    {
      "address": "0x3a1c1d1c06be03cddc4d3332f7c20e1b37c97ce9",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/VYBE-icon.png",
      "name": "Vybe",
      "symbol": "VYBE"
    },
    {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/WETH-icon.png",
      "name": "WETH",
      "symbol": "WETH"
    },
    {
      "address": "0xb2279b6769cfba691416f00609b16244c0cf4b20",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/WAIF-icon.png",
      "name": "Waifu Token",
      "symbol": "WAIF"
    },
    {
      "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/WBTC-icon.png",
      "name": "Wrapped Bitcoin",
      "symbol": "WBTC"
    },
    {
      "address": "0x0d438f3b5175bebc262bf23753c1e53d03432bde",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/wNXM-icon.png",
      "name": "Wrapped NXM",
      "symbol": "wNXM"
    },
    {
      "address": "0x0f7f961648ae6db43c75663ac7e5414eb79b5704",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/XIO-icon.png",
      "name": "XIO",
      "symbol": "XIO"
    },
    {
      "address": "0x0aacfbec6a24756c20d41914f2caba817c0d8521",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/YAM-icon.png",
      "name": "YAM",
      "symbol": "YAM"
    },
    {
      "address": "0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a",
      "chainId": 1,
      "decimals": 24,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/YAMv2-icon.png",
      "name": "YAM v2",
      "symbol": "YAMv2"
    },
    {
      "address": "0x28cb7e841ee97947a86b06fa4090c8451f64c0be",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/YFL-icon.png",
      "name": "YF Link",
      "symbol": "YFL"
    },
    {
      "address": "0xfef3bef71a5eb97e097039038776fd967ae5b106",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/YFMS-icon.png",
      "name": "YFMoonshot",
      "symbol": "YFMS"
    },
    {
      "address": "0x45f24baeef268bb6d63aee5129015d69702bcdfa",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/YFV-icon.png",
      "name": "YFValue",
      "symbol": "YFV"
    },
    {
      "address": "0x6768063279e2b185dc0c972b97f11f231d0b45ad",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/YIELD-icon.png",
      "name": "Yield-farming.io",
      "symbol": "YIELD"
    },
    {
      "address": "0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ZIL-icon.png",
      "name": "ZIL",
      "symbol": "ZIL"
    },
    {
      "address": "0x56d811088235f11c8920698a204a5010a788f4b3",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BZRX-icon.png",
      "name": "bZx Protocol",
      "symbol": "BZRX"
    },
    {
      "address": "0xb72b31907c1c95f3650b64b2469e08edacee5e8f",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/VBZRX-icon.png",
      "name": "bZx Vesting Token",
      "symbol": "VBZRX"
    },
    {
      "address": "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/cDAI-icon.png",
      "name": "cDAI",
      "symbol": "cDAI"
    },
    {
      "address": "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/cETH-icon.png",
      "name": "cETH",
      "symbol": "cETH"
    },
    {
      "address": "0x39aa39c021dfbae8fac545936693ac917d5e7563",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/cUSDC-icon.png",
      "name": "cUSDC",
      "symbol": "cUSDC"
    },
    {
      "address": "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/cUSDT-icon.png",
      "name": "cUSDT",
      "symbol": "cUSDT"
    },
    {
      "address": "0x62359ed7505efc61ff1d56fef82158ccaffa23d7",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/CORE-icon.png",
      "name": "cVault.finance",
      "symbol": "CORE"
    },
    {
      "address": "0x7b123f53421b1bf8533339bfbdc7c98aa94163db",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/BUIDL-icon.png",
      "name": "dfohub",
      "symbol": "BUIDL"
    },
    {
      "address": "0x34612903db071e888a4dadcaa416d3ee263a87b9",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ARTE-icon.png",
      "name": "ethArt",
      "symbol": "ARTE"
    },
    {
      "address": "0xa9859874e1743a32409f75bb11549892138bba1e",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/iETH-icon.png",
      "name": "iETH",
      "symbol": "iETH"
    },
    {
      "address": "0x607f4c5bb672230e8672085532f7e901544a7375",
      "chainId": 1,
      "decimals": 9,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/RLC-icon.png",
      "name": "iExec RLC",
      "symbol": "RLC"
    },
    {
      "address": "0xe2f2a5c287993345a840db3b0845fbc70f5935a5",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/mUSD-icon.png",
      "name": "mStable USD",
      "symbol": "mUSD"
    },
    {
      "address": "0x261b45d85ccfeabb11f022eba346ee8d1cd488c0",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/rDAI-icon.png",
      "name": "rDAI",
      "symbol": "rDAI"
    },
    {
      "address": "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
      "chainId": 1,
      "decimals": 8,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/renBTC-icon.png",
      "name": "renBTC",
      "symbol": "renBTC"
    },
    {
      "address": "0x17628a557d1fc88d1c35989dcbac3f3e275e2d2b",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/sBTC-icon.png",
      "name": "sBTC",
      "symbol": "sBTC"
    },
    {
      "address": "0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/sETH-icon.png",
      "name": "sETH",
      "symbol": "sETH"
    },
    {
      "address": "0x57ab1ec28d129707052df4df418d58a2d46d5f51",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/sUSD-icon.png",
      "name": "sUSD",
      "symbol": "sUSD"
    },
    {
      "address": "0x261efcdd24cea98652b9700800a13dfbca4103ff",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/sXAU-icon.png",
      "name": "sXAU",
      "symbol": "sXAU"
    },
    {
      "address": "0x8daebade922df735c38c80c7ebd708af50815faa",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/tBTC-icon.png",
      "name": "tBTC",
      "symbol": "tBTC"
    },
    {
      "address": "0x0ae055097c6d159879521c384f1d2123d1f195e6",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/STAKE-icon.png",
      "name": "xDAI Stake",
      "symbol": "STAKE"
    },
    {
      "address": "0xb1dc9124c395c1e97773ab855d66e879f053a289",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/YAX-icon.png",
      "name": "yAxis",
      "symbol": "YAX"
    },
    {
      "address": "0xacd43e627e64355f1861cec6d3a6688b31a6f952",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/yDAI-icon.png",
      "name": "yDAI",
      "symbol": "yDAI"
    },
    {
      "address": "0xe1237aa7f535b0cc33fd973d66cbf830354d16c7",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/yETH-icon.png",
      "name": "yETH",
      "symbol": "yETH"
    },
    {
      "address": "0x37d19d1c4e1fa9dc47bd1ea12f742a0887eda74a",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/yTUSD-icon.png",
      "name": "yTUSD",
      "symbol": "yTUSD"
    },
    {
      "address": "0x5dbcf33d8c2e976c6b560249878e6f1491bca25c",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/yUSD-icon.png",
      "name": "yUSD",
      "symbol": "yUSD"
    },
    {
      "address": "0xb2fdd60ad80ca7ba89b9bab3b5336c2601c020b4",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/yUSD-OCT20-icon.png",
      "name": "yUSD Synthetic Token Exp 1 Oct 2020",
      "symbol": "yUSD-OCT20"
    },
    {
      "address": "0x81ab848898b5ffd3354dbbefb333d5d183eedcb5",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/yUSD-SEP20-icon.png",
      "name": "yUSD Synthetic Token Exp 1 Sept 2020",
      "symbol": "yUSD-SEP20"
    },
    {
      "address": "0x597ad1e0c13bfe8025993d9e79c69e1c0233522e",
      "chainId": 1,
      "decimals": 6,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/yUSDC-icon.png",
      "name": "yUSDC",
      "symbol": "yUSDC"
    },
    {
      "address": "0x2f08119c6f07c006695e079aafc638b8789faf18",
      "chainId": 1,
      "decimals": 6,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/yUSDT-icon.png",
      "name": "yUSDT",
      "symbol": "yUSDT"
    },
    {
      "address": "0x2994529c0652d127b7842094103715ec5299bbed",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ybCRV-icon.png",
      "name": "ybCRV",
      "symbol": "ybCRV"
    },
    {
      "address": "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/YFI-icon.png",
      "name": "yearn.finance",
      "symbol": "YFI"
    },
    {
      "address": "0x1aa61c196e76805fcbe394ea00e4ffced24fc469",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/SAFE-icon.png",
      "name": "yieldfarming.insure",
      "symbol": "SAFE"
    },
    {
      "address": "0xc75f15ada581219c95485c578e124df3985e4ce0",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/Zapper-fi/token-list/master/assets/ZZZ-icon.png",
      "name": "zzz.finance",
      "symbol": "ZZZ"
    }
  ],
  "version": { "major": 1, "minor": 0, "patch": 0 }
}

},{}]},{},[1]);
