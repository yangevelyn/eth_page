
const fetch = require("cross-fetch")
const { Contract, providers, Wallet, utils } = require("ethers")
const AmmReaderArtifact = require("@perp/contract/build/contracts/AmmReader.json")
const InsuranceFundArtifact = require("@perp/contract/build/contracts/InsuranceFund.json")
const ERC20Contract = require('erc20-contract-js');
const Uniswap = require('@uniswap/sdk')
import axios from 'axios'

//https://github.com/sebs/etherscan-api
var api = require('etherscan-api').init('B62JERIYMBVDVNDSCVUCHRBRN49XXN1DYJ'); 


async function main() {

  const account = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';
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
      pageNum++;
    }
  } catch (error) {
    console.log(error);
  }

  console.log('Total transactions:', totalCount, ' Total Gas:', totalGas);

}

main();


