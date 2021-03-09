// const { Contract, providers, Wallet, utils, ethers } = require("ethers")
// const provider = new providers.getDefaultProvider();
// const provider = new providers.Web3Provider(window.ethereum);

var Web3 = require('web3');
var Contract = require('web3-eth-contract');

// set provider for all later instances to use
Contract.setProvider(window.ethereum || new Web3.providers.HttpProvider('https://eth-mainnet.alchemyapi.io/v2/ZiRLHRMU4UKAJ8mPEvTbJq35YdCm5MxJ'));

const perp_address = '0xbC396689893D065F41bc2C6EcbeE5e0085233447';
// var account = '0x97137466bc8018531795217f0ecc4ba24dcba5c1';
var account = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';
var block = 11900892;

// https://www.shawntabrizi.com/ethereum/ethereum-token-contract-abi-web3-erc-20-human-standard-tokens/

var tokenlist;
var cleanedList;

// var contract = new Contract(perp_address, human_standard_token_abi, provider);
// contract.balanceOf(account, {blockTag: block})
// .then((res) => {
//   console.log('here');
//   console.log(ethers.utils.formatEther(res));
// })
// let contract = new Contract(human_standard_token_abi, perp_address);
// contract.methods.balanceOf(account).call('latest')
// .then((bal) => {
//   console.log(bal/10**18);
// })

async function getBalanceList(){
  var balanceList = [];

  let list = await tokenlist.map((item) => {
    let contract = new Contract(human_standard_token_abi, item.address);
    // let contract = new Contract(item.address, human_standard_token_abi, provider)
    // return contract.balanceOf(item.address)
    // .then((res) => {
    //   // console.log(res);
    // })
    return contract.methods.balanceOf(account).call(block)
    .then((bal) => {
      balanceList.push({
        symbol: item.symbol,
        balance: bal/10**(item.decimals),
        logo: item.logoURI
      });
    })
  });
  return Promise.allSettled(list)
  .then(() => {
    return balanceList.sort((a, b) => b.balance - a.balance);
  });
}

function setInput(){
  document.getElementById("token-list").innerHTML = '';
  account = document.getElementById("account-input").value;
  block = document.getElementById("block-input").value;
  main();
}

function setHTML(balanceList){
  document.getElementById("account").innerHTML = "Account: " + account;
  document.getElementById("block").innerHTML = "Block: " + block;

  balanceList.map((token) => {
    if(token.balance !== 0){
      let node = document.createElement("tr");
      let symbol = document.createElement("th");
      let logo = document.createElement("img");
      let symbolName = document.createElement("div");
      symbolName.innerText = token.symbol;
      logo.src = token.logo;
      logo.width = "36";
      symbol.appendChild(logo);
      symbol.appendChild(symbolName);
      symbol.style.display = "flex";
      symbol.style.flexDirection = "column";
      let balance = document.createElement("td");
      balance.innerHTML = token.balance;

      node.appendChild(symbol);
      node.appendChild(balance);
      document.getElementById("token-list").appendChild(node);
    }
  })
}

async function init_balance(){
  tokenlist = await fetch("/tokenlist.json")
  .then((res) => res.json())
  .then((json) => json.tokens);

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
  
  setHTML(balanceList);
}

window.onload = init_balance;
// main();
