var Web3 = require('web3');
// var Contract = require('web3-eth-contract');

// set provider for all later instances to use
// Contract.setProvider(window.ethereum || new Web3.providers.HttpProvider('https://eth-mainnet.alchemyapi.io/v2/ZiRLHRMU4UKAJ8mPEvTbJq35YdCm5MxJ'));
var web3 = new Web3(window.ethereum || 'https://eth-mainnet.alchemyapi.io/v2/ZiRLHRMU4UKAJ8mPEvTbJq35YdCm5MxJ');

const API_KEY = 'B62JERIYMBVDVNDSCVUCHRBRN49XXN1DYJ';
// var account = '0x97137466bc8018531795217f0ecc4ba24dcba5c1';
var account = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';
var block = 11900892;

// https://www.shawntabrizi.com/ethereum/ethereum-token-contract-abi-web3-erc-20-human-standard-tokens/

var tokenlist;
var cleanedList;
const { human_standard_token_abi } = require('./token_abi');

async function getBalanceList(){
  var balanceList = [];

  //get list of relevant tokens from account transaction list
  let txUrl =  `https://api.etherscan.io/api?module=account&action=tokentx&address=${account}&startblock=0&endblock=999999999&sort=asc&apikey=${API_KEY}`;
  let relevantTokenList = await axios.get(txUrl)
  .then((res) => {
    //filter out token duplicates
    let txs = res.data.result;
    let seen = [];
    txs = txs.filter((item) => {
      let ind = seen.findIndex(e => e == item.tokenSymbol);
      if(ind == -1){
        seen.push(item.tokenSymbol);
        return true;
      }
      return false;
    });

    //loop through api call results
    return txs.map((item) => {
      if(item.tokenSymbol != ""){
        const ind = tokenlist.findIndex(token => token.symbol == item.tokenSymbol);
        let logo = "";
        if(ind != -1){
          logo = tokenlist[ind].logoURI;
        }
        seen.push(item.tokenSymbol);
        //recreate tokenlist.json format
        return {
          address: item.contractAddress,
          decimals: item.tokenDecimal,
          logoURI: logo,
          name: item.tokenName,
          symbol: item.tokenSymbol
        }
      }
    })
  })

  console.log(relevantTokenList);

  let list = await relevantTokenList.map((item) => {
    let contract = new web3.eth.Contract(human_standard_token_abi, item.address);
    return contract.methods.balanceOf(account).call(block)
    .then((bal) => {
      balanceList.push({
        address: item.address,
        symbol: item.symbol,
        balance: bal/10**(item.decimals),
        logo: item.logoURI
      });
    })
  });
  return Promise.allSettled(list)
  .then(async () => {
    addressList = relevantTokenList.map((token) => token.address);

    //split into calls of maximum length 100
    addrStrList = [];
    for(let i = 0; i < addressList.length / 100; i++){
      addrStrList.push(addressList.slice(i * 100, 
                         addressList.length < (i + 1) * 100 ? 
                         addressList.length: (i + 1) * 100).join(","));
    }

    //call geckocoin to convert to usd
    let usdBalList = [];
    let promises = await addrStrList.map((item) => {
      let apiUrl = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${item}&vs_currencies=usd`
      try {
        return axios.get(apiUrl)
        .then((res) => {
          console.log(res.data);
          for(const prop in res.data){
            //add current price in usd to balanceList
            const ind = balanceList.findIndex(token => token.address == prop);
            balanceList[ind] = {...balanceList[ind], usd: res.data[prop].usd}
          }
        })
      } catch(err) {
        console.log(err);
      }
    })

    return Promise.allSettled(promises)
    .then(() => {
      return balanceList.sort((a, b) => b.balance * b.usd - a.balance * a.usd);
    })
  });
}

async function getETHBalance(){
  return web3.eth.getBalance(account, block)
  .then((bal) => {
    return web3.utils.fromWei(bal);
  })
}

function setInput(){
  document.getElementById("token-list").innerHTML = '';
  account = document.getElementById("account-input").value;
  block = document.getElementById("block-input").value;
  main();
}

async function setHTML(balanceList, ethBalance){
  document.getElementById("account").innerHTML = account;
  document.getElementById("block").innerHTML = block;
  // document.getElementById("balance").innerHTML = ethBalance;

  let ethUSD = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
  .then((res) => {
    return res.data.ethereum.usd;
  })

  balanceList.unshift({
    symbol: 'ETH',
    logo: 'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/ed396/eth-diamond-black.png',
    balance: ethBalance,
    usd: ethUSD
  })

  balanceList.map((token) => {
    if(token.balance !== 0){
      let node = document.createElement("tr");
      if(token.symbol != 'ETH'){
        node.dataset.toggle = "popover";
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
      console.log(token.usd);
      usd.innerHTML = "$" + (Math.round((token.balance * token.usd + Number.EPSILON) * 100)/100).toLocaleString();

      if(token.symbol == 'ETH'){
        node.style.backgroundColor = 'rgba(183,228,199,0.25)';
      }

      node.appendChild(symbol);
      node.appendChild(balance);
      node.appendChild(usd);
      document.getElementById("token-list").appendChild(node);
      
    }
  })
  $(function () {
    $('[data-toggle="popover"]').popover()
  })
}

async function init_balance(){
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  const token_json = require("./tokenlist.json");
  tokenlist = token_json.tokens;

  cleanedList = tokenlist.map(i => {
    return {
      "address": i.address,
      "symbol": i.symbol
    }
  });
  
  document.getElementById('balance-submit').onclick = setInput;
  document.getElementById('account-input').value = account;
  document.getElementById('block-input').value = block;

  // setInput();
  main();
}

async function main(){
  var balanceList = await getBalanceList();
  console.log(balanceList);
  var ethBalance = await getETHBalance();
  console.log(ethBalance);
  
  setHTML(balanceList, ethBalance);
}

window.onload = init_balance;
// main();
