var Web3 = require('web3');
var web3 = new Web3(window.ethereum || 'https://eth-mainnet.alchemyapi.io/v2/yqxbxAize0IkxzqL7uMLg1BeeNpql0pi');

//etherscan api key
// const API_KEY = 'WWQ7RBAZWWC9NGV61ITZEV4S7TTBRBQGK1;
const API_KEY = '';

// https://www.shawntabrizi.com/ethereum/ethereum-token-contract-abi-web3-erc-20-human-standard-tokens/

const token_json = require("./tokenlist.json");
var tokenlist = token_json.tokens;
const { human_standard_token_abi } = require('./token_abi');

//filters out token duplicates
async function filterDuplicates(txs){
  let seen = [];
  return txs.filter((item) => {
    let ind = seen.findIndex(e => e == item.tokenSymbol);
    if(ind == -1){
      seen.push(item.tokenSymbol);
      return true;
    }
    return false;
  });
}

//format tokens from etherscan api call
function formatTokenObject(item){
  //get logo if in token is in token_abi.json
  const ind = tokenlist.findIndex(token => token.symbol == item.tokenSymbol);
  let logo = "";
  if(ind != -1){
    logo = tokenlist[ind].logoURI;
  }
  //recreate tokenlist.json format
  return {
    address: item.contractAddress,
    decimals: item.tokenDecimal,
    logoURI: logo,
    name: item.tokenName,
    symbol: item.tokenSymbol
  }
}

//get list of relevant tokens from account transaction list from etherscan
async function getTxListFromEtherscan(account){
  let txUrl =  `https://api.etherscan.io/api?module=account&action=tokentx&address=${account}&startblock=0&endblock=latest&sort=asc&apikey=${API_KEY}`;
  return await axios.get(txUrl)
  .then(async (res) => {
    //filter out token duplicates
    let txs = res.data.result;
    txs = await filterDuplicates(txs);

    //loop through api call results
    return txs.map((item) => {
      if(item.tokenSymbol != ""){
        return formatTokenObject(item);
      }
    })
  })
}

//get an account's balance of an individual token from Web3
async function getTokenBalance(item, account, block){
  let contract = new web3.eth.Contract(human_standard_token_abi, item.address);
  return contract.methods.balanceOf(account).call(block)
  .then((bal) => {
    //return an object containing token info
    return {
      address: item.address,
      symbol: item.symbol,
      balance: bal/10**(item.decimals),
      logo: item.logoURI
    }
  })
}

//get token's usd price from coingecko
async function getUSDFromCoingecko(item){
  let apiUrl = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${item}&vs_currencies=usd`
  try {
    return axios.get(apiUrl)
  } catch(err) {
    console.log(err);
  }
}

async function getBalanceList(account, block){
  var balanceList = [];

  let relevantTokenList = await getTxListFromEtherscan(account);

  let promiseList = await relevantTokenList.map(async (item) => {
    balanceList.push(await getTokenBalance(item, account, block));
  });

  return Promise.allSettled(promiseList)
  .then(async () => {
    let addressList = relevantTokenList.map((token) => token.address);

    //split into calls of maximum length 100
    addrStrList = [];
    for(let i = 0; i < addressList.length / 100; i++){
      addrStrList.push(addressList.slice(i * 100, 
                         addressList.length < (i + 1) * 100 ? 
                         addressList.length: (i + 1) * 100).join(","));
    }

    //call geckocoin to convert to usd
    let promises = await addrStrList.map(async (item) => {
      return await getUSDFromCoingecko(item)
      .then((res) => {
        for(const prop in res.data){
          //add current price in usd to balanceList
          const ind = balanceList.findIndex(token => token.address == prop);
          balanceList[ind] = {...balanceList[ind], usd: res.data[prop].usd}
        }
      });
    })

    //return balanceList
    return Promise.allSettled(promises)
    .then(() => {
      return balanceList;
    })
  });
}

async function getETHBalance(account, block){
  return web3.eth.getBalance(account, block)
  .then((bal) => {
    return web3.utils.fromWei(bal);
  })
}

//window.onload = init_balance;
// main();

module.exports = {getBalanceList, getETHBalance};
