
const fetch = require("cross-fetch")
const { Contract, providers, Wallet, utils } = require("ethers")
const AmmReaderArtifact = require("@perp/contract/build/contracts/AmmReader.json")
const InsuranceFundArtifact = require("@perp/contract/build/contracts/InsuranceFund.json")
const ERC20Contract = require('erc20-contract-js');
const Uniswap = require('@uniswap/sdk')
import axios from 'axios'

//https://github.com/sebs/etherscan-api
const API_KEY = 'B62JERIYMBVDVNDSCVUCHRBRN49XXN1DYJ';
var api = require('etherscan-api').init(API_KEY); 


async function gasSummary() {

  const account = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';
  //const account = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f';
  const balance = await api.account.balance(account);
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
      for (var i =0; i < count; i++) { 
        const txn = transactions.result[i]
        const gasFee = parseInt(txn.gasPrice)/10**18*parseInt(txn.gasUsed)
        totalGas += gasFee
        console.log('block: ', txn.blockNumber, 'hash: ', txn.hash, 'gas fee: ', gasFee)
      }
      console.log(transactions.result[0])
      pageNum++;
    }
  } catch (error) {
    console.log(error);
  }

  console.log('Total transactions:', totalCount, ' Total Gas:', totalGas);

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
  const account = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685' 
  const contract = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f'
  getApprovals(account, contract);
}

main();


