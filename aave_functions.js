var Web3 = require('web3');
var web3 = new Web3(window.ethereum || 'https://eth-mainnet.alchemyapi.io/v2/yqxbxAize0IkxzqL7uMLg1BeeNpql0pi');

const token_json = require("./tokenlist.json");
var tokenlist = token_json.tokens;
const { aave_abi } = require('./token_abi');

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

module.exports = {getAaveList, addRowToHTML};
