const fetch = require("cross-fetch")
//const { Contract, providers, Wallet, utils } = require("ethers")
const AmmReaderArtifact = require("@perp/contract/build/contracts/AmmReader.json")
const InsuranceFundArtifact = require("@perp/contract/build/contracts/InsuranceFund.json")
const ERC20Contract = require('erc20-contract-js');
const Uniswap = require('@uniswap/sdk')
var fs = require('fs').promises;
import axios from 'axios'

var Web3 = require('web3');
var Contract = require('web3-eth-contract');

// set provider for all later instances to use
Contract.setProvider(new Web3.providers.HttpProvider('https://eth-mainnet.alchemyapi.io/v2/ZiRLHRMU4UKAJ8mPEvTbJq35YdCm5MxJ')); 

const { human_standard_token_abi } = require('./token_abi');

//https://github.com/sebs/etherscan-api
const API_KEY = 'B62JERIYMBVDVNDSCVUCHRBRN49XXN1DYJ';
var api = require('etherscan-api').init(API_KEY); 

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
    return results;

  } catch (error) {
    console.log(error)
  }

}


async function getWalletsForContract(contract, start_block, end_block, output_file) {
  const batchSize = 100;
  var pageNum = 1;
  var count = batchSize;
  var totalCount = 0;
  await fs.writeFile(output_file, '', {flag: "w"});
  try {
    while ((count+0.1) >= batchSize) {
      const transactions = await api.account.txlist(contract, start_block, end_block, pageNum, batchSize, 'asc')
      count = transactions.result.length;
      totalCount += count;
      console.log("Start Block: ", start_block, "Total transactions: ", totalCount);
      for (var j = 0; j < count; j++) {
        await fs.writeFile(output_file, transactions.result[j].from + "\n", {flag: "a"});
      }
      pageNum++;
    }
  } catch (error) {
     console.log(error);
  }
}

async function getTokenBalanceforWallet(wallet, token, block) {
  let contract = new Contract(human_standard_token_abi, token);
  const bal = await contract.methods.balanceOf(wallet).call(block) 
  const decimals = await contract.methods.decimals().call()
  return bal/(10**decimals);
}


async function main() {
  const furucombo_contract = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f'
  const wallet = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';
  const block = 11900892
  const perp_token =  '0xbC396689893D065F41bc2C6EcbeE5e0085233447';
  
  //const perp_balance = await getTokenBalanceforWallet(wallet, perp_token, block)
  //console.log(perp_balance);

  const furu_contract = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f'
  const last_furu_block = 11940504 
  const first_furu_block = 11618386
  const middle_block = parseInt((11940504 + 11618386)/2)
  getWalletsForContract(furu_contract, first_furu_block, middle_block, 'furu_wallets.1.txt') 
  getWalletsForContract(furu_contract, middle_block +1, last_furu_block, 'furu_wallets.2.txt') 

}


main();

