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

async function getTokenBalanceforWallet(wallet, token, block) {
  let contract = new Contract(human_standard_token_abi, token);
  const bal = await contract.methods.balanceOf(wallet).call(block) 
  const decimals = await contract.methods.decimals().call()
  return bal/(10**decimals);
}

//pad the hex string to 64 bytes
function padHexString(hexString) {
  const mainStr = hexString.slice(2)
  const zeros = 64 - mainStr.length 

  return '0x' + '0'.repeat(zeros) + mainStr

}

async function getApprovals(account, contract, fromBlock = 1, toBlock ='latest') {
  const approvalFuncHash = '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
  const account_str = padHexString(account)
  const contract_str = padHexString(contract)

  const api_url =`https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&topic0=${approvalFuncHash}&topic0_1_opr=and&topic1=${account_str}&topic1_2_opr=and&topic2=${contract_str}&apikey=${API_KEY}`

  try {
    const results = await axios.get(api_url);
    const res_list = results.data.result
    var token2limits = {}
    for (var j =0; j < res_list.length; j++) {
      const approval = res_list[j]
      token2limits[approval.address] = approval.data
    }
    var output_string = ""
    for (let token in token2limits) {
      const balance = await getTokenBalanceforWallet(account, token, toBlock)
      const tlimit = token2limits[token]
      output_string += `${account}\t${token}\t${tlimit}\t${balance}\n`
    }
    
    return output_string
  } catch (error) {
    console.log(error)
  }

}

const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function exec_command(cmd) {
  try {
      const { stdout, stderr } = await exec(cmd);
      return stdout
      //console.log('stdout:', stdout);
      console.log('stderr:', stderr);
  } catch (err) {
     console.error(err);
  };
};


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



async function main() {
  const furucombo_contract = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f'
  const wallet = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';

  const furu_contract = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f'
  const last_furu_block = 11940503 
  const first_furu_block = 11618386
  const middle_block = parseInt((first_furu_block + last_furu_block)/2)
  
  /*
  await getWalletsForContract(furu_contract, first_furu_block, middle_block, 'furu_wallets.1.txt') 
  await getWalletsForContract(furu_contract, middle_block +1, last_furu_block, 'furu_wallets.2.txt') 
  await exec_command("sort furu_wallets.1.txt furu_wallets.2.txt | uniq > furu_wallets.txt");
  */
  

  // get the approval data and allowance
  const wallet_data = await exec_command("cat wallet_sample.txt")
  const wallets = wallet_data.split("\n");
  const output_file = 'wallet_impact.txt'
  await fs.writeFile(output_file, '', {flag: "w"});

  for (var w = 0 ; w < wallets.length ; w ++) {
      const result = await getApprovals(wallets[w], furucombo_contract,
                                        first_furu_block, last_furu_block)
      await fs.writeFile(output_file, result, {flag: "a"});
      console.log("Wallet processed:", wallets[w]);
  }
}


main();

