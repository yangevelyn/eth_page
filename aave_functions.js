// var {graphql, buildSchema} = require('graphql');

var Web3 = require('web3');
var web3 = new Web3(window.ethereum || 'https://eth-mainnet.alchemyapi.io/v2/yqxbxAize0IkxzqL7uMLg1BeeNpql0pi');

//etherscan api key
const API_KEY = 'WWQ7RBAZWWC9NGV61ITZEV4S7TTBRBQGK1';
// const API_KEY = '';

// https://www.shawntabrizi.com/ethereum/ethereum-token-contract-abi-web3-erc-20-human-standard-tokens/

const token_json = require("./tokenlist.json");
var tokenlist = token_json.tokens;
const { human_standard_token_abi, curve_abi, aave_abi, compound_abi, ceth_abi } = require('./token_abi');

//get list of Curve's pools
async function getCurveList(){
  let contract = new web3.eth.Contract(curve_abi, '0x0959158b6040D32d04c301A72CBFD6b39E21c9AE');

  try{
    const poolCount = await contract.methods.pool_count().call();
    console.log(poolCount);
    let poolList = []
    for(let i = 0; i < poolCount; i++){
      const pool = await contract.methods.pool_list(i).call();
      poolList.push(pool);
    }
    
    // console.log(item.symbol, item.address, bal);
    return poolList;
  } catch(err){
    console.log(err);
  }
}

// get list of Aave's tokens
async function getAaveList(){
  let contract = new web3.eth.Contract(aave_abi, '0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d');

  try{
    const tokenList = await contract.methods.getAllReservesTokens().call();
    let assetList = [];
    for(let i = 0; i < tokenList.length; i++){
      // const tokenAddress = await contract.methods.getReserveTokensAddresses(tokenList[i][1]).call();
      // assetList.push({[tokenList[i][0]]: tokenAddress});
      // console.log(tokenAddress);
      const data = await contract.methods.getReserveData(tokenList[i][1]).call();
      assetList.push({
        symbol: tokenList[i][0],
        deposit_apy: (parseInt(data.liquidityRate) / 10**25).toFixed(2),
        borrow_apy_var: (parseInt(data.variableBorrowRate) / 10**25).toFixed(2),
        borrow_apy_s: (parseInt(data.stableBorrowRate) / 10**25).toFixed(2),
      });
    }
    return assetList;
  } catch(err){
    console.log(err);
  }
}

// get list of Compound's markets
async function getCompoundList(){
  let url = 'https://api.compound.finance/api/v2/ctoken';

  return await axios.get(url)
  .then((res) => {
    console.log(res.data.cToken);
    return res.data.cToken.map((token) => {
      // console.log(token.comp_supply_apy);
      return {
        underlying_name: token.underlying_name, 
        underlying_symbol: token.underlying_symbol, 
        borrow_rate: parseFloat(token.borrow_rate.value) * 100, 
        supply_rate: parseFloat(token.supply_rate.value) * 100, 
        comp_borrow_apy: parseFloat(token.comp_borrow_apy.value), 
        comp_supply_apy: parseFloat(token.comp_supply_apy.value)
      };
    });
  })
}

// get list of Compound's markets
async function getCompoundListGraph(){
  let url = 'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2';
  let data = {
    query: `{
      markets {
        name
        symbol
        id
        supplyRate
        borrowRate
        underlyingSymbol
      }
    }`
  }

  return await axios.post(url, data)
  .then((res) => {
    console.log(res.data.data.markets);
    return res.data.data.markets;
  })
  
}

async function getCompoundListWeb3(){
  let contract = new web3.eth.Contract(compound_abi, '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B');

  try{
    const marketList = await contract.methods.getAllMarkets().call();
    console.log(marketList);
    let cToken = new web3.eth.Contract(ceth_abi, marketList[0]);
    const ethMantissa = 1e18;
    const blocksPerDay = 4 * 60 * 24;
    const daysPerYear = 365;

    // const cToken = new web3.eth.Contract(cEthAbi, cEthAddress);
    const supplyRatePerBlock = await cToken.methods.supplyRatePerBlock().call(12253933);
    const borrowRatePerBlock = await cToken.methods.borrowRatePerBlock().call(12253933);
    const supplyApy = (((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
    const borrowApy = (((Math.pow((borrowRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
    console.log(`Supply APY for ETH ${supplyApy} %`);
    console.log(`Borrow APY for ETH ${borrowApy} %`);
    // const cToken = CEther.at(marketList[0]);
    // const borrowRate = (await cToken.methods.borrowRatePerBlock().call()) / 1e18;
    console.log(borrowRate);
    return marketList;
  } catch(err){
    console.log(err);
  }
}

async function addRowToHTML(token){
  //get logo if in token is in token_abi.json
  const ind = tokenlist.findIndex(i => i.symbol == token.symbol);
  let logo = "";
  if(ind != -1){
    logo = tokenlist[ind].logoURI;
  }

  let node = document.createElement("tr");
  let market = document.createElement("th");
  let logoHTML = document.createElement("img");
  let tokenText = document.createElement("div");
  let name = document.createElement("div");
  let symbol = document.createElement("div");
  logoHTML.src = logo;
  logoHTML.height = "36";
  name.innerText = token.symbol;
  name.style.marginLeft = "8px";
  symbol.innerText = token.symbol;
  symbol.style.marginLeft = "8px";
  // tokenText.appendChild(name);
  tokenText.appendChild(symbol);
  market.appendChild(logoHTML);
  market.appendChild(tokenText);
  market.style.display = "flex";
  market.style.alignItems = "center";

  let deposit = document.createElement("td");
  deposit.innerHTML = token.deposit_apy + "%";
  let sBorrow = document.createElement("td");
  sBorrow.innerHTML = token.borrow_apy_s + "%";
  let vBorrow = document.createElement("td");
  vBorrow.innerHTML = token.borrow_apy_var + "%";

  node.appendChild(market);
  node.appendChild(deposit);
  node.appendChild(vBorrow);
  node.appendChild(sBorrow);
  document.getElementById("mk-list").appendChild(node);
  $(function () {
    $('[data-toggle="popover"]').popover({html: true})
  })
  //http://bootply.com/99372
  $('body').on('click', function (e) {
      $('[data-toggle=popover]').each(function () {
          // hide any open popovers when the anywhere else in the body is clicked
          if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
              $(this).popover('hide');
          }
      });
  });
}

getAaveList().then((res) => {
  console.log(res);
})

module.exports = {getCurveList, getAaveList, getCompoundList, addRowToHTML};
