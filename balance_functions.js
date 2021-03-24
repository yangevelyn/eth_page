var Web3 = require('web3');
var web3 = new Web3(window.ethereum || 'https://eth-mainnet.alchemyapi.io/v2/yqxbxAize0IkxzqL7uMLg1BeeNpql0pi');

//etherscan api key
const API_KEY = 'WWQ7RBAZWWC9NGV61ITZEV4S7TTBRBQGK1';
// const API_KEY = '';

// https://www.shawntabrizi.com/ethereum/ethereum-token-contract-abi-web3-erc-20-human-standard-tokens/

const token_json = require("./tokenlist.json");
var tokenlist = token_json.tokens;
const { human_standard_token_abi } = require('./token_abi');

//filters out token duplicates
async function filterDuplicates(txs){
  let seen = [];
  return txs.filter((item) => {
    let ind = seen.findIndex(e => e == item.contractAddress);
    if(ind == -1){
      seen.push(item.contractAddress);
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

  try{
    const bal = await contract.methods.balanceOf(account).call(block);
    // console.log(item.symbol, item.address, bal);

    return {
      address: item.address,
      symbol: item.symbol,
      balance: bal/10**(item.decimals),
      logo: item.logoURI 
    }
  } catch(err){
    console.log(err);
  }
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

async function addRowToHTML(token){
  let node = document.createElement("tr");
  if(token.symbol != 'ETH'){
    node.dataset.toggle = "popover";
    node.dataset.content = `<a href='https://etherscan.io/token/${token.address}'>Etherscan page</a>`
    node.title = token.address;
  }
  let symbol = document.createElement("th");
  let logo = document.createElement("img");
  let symbolName = document.createElement("div");
  logo.src = token.logo;
  logo.height = "36";
  symbolName.innerText = token.symbol;
  symbolName.style.marginLeft = "8px";
  symbol.appendChild(logo);
  symbol.appendChild(symbolName);
  symbol.style.display = "flex";
  symbol.style.alignItems = "center";
  let balance = document.createElement("td");
  balance.innerHTML = token.balance;
  let usd = document.createElement("td");
  if(typeof(token.usd) == "number"){
    usd.innerHTML = "$" + (Math.round((token.balance * token.usd + Number.EPSILON) * 100)/100).toLocaleString();
  } else{
    usd.innerHTML = "--";
  }

  if(token.symbol == 'ETH'){
    node.style.backgroundColor = 'rgba(183,228,199,0.25)';
  }

  node.appendChild(symbol);
  node.appendChild(balance);
  node.appendChild(usd);
  document.getElementById("token-list").appendChild(node);
  $(function () {
    $('[data-toggle="popover"]').popover({html: true})
  })
}

async function getBalanceList(account, block){
  var balanceList = {};
  let addressList = [];

  let relevantTokenList = await getTxListFromEtherscan(account);
  console.log(relevantTokenList);

  //add tokens with non-zero balance to balanceList
  //add token address to addressList
  for(let i = 0; i < relevantTokenList.length; i++){
    try{
      const token = relevantTokenList[i];
      let balance = await getTokenBalance(token, account, block);

      //if non-zero balance, add usd to object, add object to list
      if(balance.balance > 1**-18){
        const usd = await getUSDFromCoingecko(token.address);
        if(usd.data[token.address]){
          balance = {...balance, usd: usd.data[token.address].usd};
        }
        balanceList[token.address] = balance;
        addressList.push(token.address);

        addRowToHTML(balance);
      }
    } catch(err){
      console.log(err);
    }
  }

  console.log(balanceList);
  return balanceList;
}

async function getETHBalance(account, block){
  return web3.eth.getBalance(account, block)
  .then((bal) => {
    return web3.utils.fromWei(bal);
  })
}

module.exports = {getBalanceList, getETHBalance, addRowToHTML};
