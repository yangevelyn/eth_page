var Web3 = require('web3');
var web3 = new Web3(window.ethereum || 'https://eth-mainnet.alchemyapi.io/v2/yqxbxAize0IkxzqL7uMLg1BeeNpql0pi');

//etherscan api key
const API_KEY = 'WWQ7RBAZWWC9NGV61ITZEV4S7TTBRBQGK1';
// const API_KEY = '';

// https://www.shawntabrizi.com/ethereum/ethereum-token-contract-abi-web3-erc-20-human-standard-tokens/

const token_json = require("./tokenlist.json");
var tokenlist = token_json.tokens;
const { human_standard_token_abi, curve_abi, aave_abi, compound_abi } = require('./token_abi');

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

// get list of AAVE's tokens
async function getAAVEList(){
  let contract = new web3.eth.Contract(aave_abi, '0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d');

  try{
    const tokenList = await contract.methods.getAllReservesTokens().call();
    let assetList = [];
    for(let i = 0; i < tokenList.length; i++){
      const tokenAddress = await contract.methods.getReserveTokensAddresses(tokenList[i][1]).call();
      assetList.push({[tokenList[i][0]]: tokenAddress});
      // console.log(tokenAddress);
    }
    return assetList;
  } catch(err){
    console.log(err);
  }
}

// get list of Compound's markets
async function getCompoundList(){
  let contract = new web3.eth.Contract(compound_abi, '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B');

  try{
    const marketList = await contract.methods.getAllMarkets().call();
    return marketList;
  } catch(err){
    console.log(err);
  }
}

// module.exports = {getBalanceList, getETHBalance, addRowToHTML};

getAAVEList().then(res => {
    console.log(res);
});
