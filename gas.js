const fetch = require("cross-fetch")
const { Contract, providers, Wallet, utils, ethers } = require("ethers")
const AmmReaderArtifact = require("@perp/contract/build/contracts/AmmReader.json")
const InsuranceFundArtifact = require("@perp/contract/build/contracts/InsuranceFund.json")
const ERC20Contract = require('erc20-contract-js');
const Uniswap = require('@uniswap/sdk')
// import axios from 'axios'

//https://github.com/sebs/etherscan-api
const API_KEY = 'B62JERIYMBVDVNDSCVUCHRBRN49XXN1DYJ';
var api;
var api = require('etherscan-api').init(API_KEY); 

let allTransactions = [];
let account = "";

async function gasSummary() {

  // const account = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';
  // const account = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f';
  let balance = 0;
  await api.account.balance(account).then((res) => {
    balance = res.result;
  });
  console.log(balance);

  const batchSize = 100;
  var pageNum = 1;
  var count = batchSize;
  var totalGas = 0.0
  var totalCount = 0.0
  try {
    while ((count+0.1) >= batchSize) {
      const transactions = await api.account.txlist(account,  1, 'latest', pageNum, batchSize, 'asc')
      count = transactions.result.length;
      totalCount += count; 
      allTransactions.push(...transactions.result);
      console.log(transactions.result);
      console.log(transactions.result[0])
      pageNum++;
    }
  } catch (error) {
    console.log(error);
  }

  console.log('Total transactions:', totalCount, ' Total Gas:', totalGas);
  return {
    balance, totalCount
  };
}

//pad the hex string to 64 bytes
function padHexString(hexString) {
  const mainStr = hexString.slice(2)
  const zeros = 64 - mainStr.length 

  return '0x' + '0'.repeat(zeros) + mainStr

}

async function getApprovals(account, contract) {
  const approvalFuncHash = '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
  const account_str = padHexString(account)
  const contract_str = padHexString(contract)

  const api_url =`https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=1&toBlock=latest&topic0=${approvalFuncHash}&topic0_1_opr=and&topic1=${account_str}&topic1_2_opr=and&topic2=${contract_str}&apikey=${API_KEY}`

  try {
    const results = await axios.get(api_url);
    console.log(results.data.result)

  } catch (error) {
    console.log(error)
  }

}

async function getTransaction(txn_hash) {

  const txn = await api.proxy.eth_getTransactionByHash(txn_hash)
  console.log(txn);
  const logs = await api.proxy.eth_getTransactionReceipt(txn_hash)
  console.log(logs);
  console.log(logs.result.logs);

}

async function main() {
  const hash = '0x66d2e5193663cf84f462dd34998d1b4d9d027c4c96a89379e8dfedee7d8c33bf';
  //await getTransaction(hash);
  // let account = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685' 
  const contract = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f'

  let totalGas = 0;
  getApprovals(account, contract);
  gasSummary().then((res) => {
    allTransactions.sort((a, b) => b.gasUsed - a.gasUsed);
    allTransactions.map((txn) => {
      const gasFee = parseInt(txn.gasPrice)/10**18*parseInt(txn.gasUsed)
      totalGas += gasFee

      let node = document.createElement("TR");
      let block = document.createElement("TH");
      block.innerHTML = txn.blockNumber;
      let timeStamp = document.createElement("TD");
      timeStamp.innerHTML = txn.timeStamp;
      let hash = document.createElement("TD");
      hash.innerHTML = txn.hash;
      let gasFeeText = document.createElement("TD");
      gasFeeText.innerHTML = gasFee;

      node.appendChild(block);
      node.appendChild(timeStamp);
      node.appendChild(gasFeeText);
      document.getElementById("tx-list").appendChild(node);
    })

    console.log(res);
    document.getElementById("account").innerHTML = "Account: " + account;
    document.getElementById("balance").innerHTML = "ETH Balance: " + res.balance/(10**18);
    document.getElementById("gas").innerHTML = "Total Gas Spent: " + totalGas;
  });

  
}

function setAccount(){
  console.log('setting account');
  account = document.getElementById("accountInput").value;
  allTransactions = [];
  totalGas = 0;
  main();
}

function init(){
  console.log('init');
  document.getElementById('submitButton').onclick = setAccount;
  document.getElementById('accountInput').value = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';
}

window.onload = init;
main();


