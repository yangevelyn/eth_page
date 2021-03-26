//https://github.com/sebs/etherscan-api
const API_KEY = 'WWQ7RBAZWWC9NGV61ITZEV4S7TTBRBQGK1';
var api;
var api = require('etherscan-api').init(API_KEY);

async function gasSummary(account, allTransactions) {
  let balance = 0;
  try{
    const res = await api.account.balance(account)
    balance = res.result;
  } catch(err){
    console.log(err);
  }
  

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
      // console.log(transactions.result);
      // console.log(transactions.result[0])
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

module.exports = {getApprovals, gasSummary};