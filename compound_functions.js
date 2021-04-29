const token_json = require("./tokenlist.json");
var tokenlist = token_json.tokens;
const { human_standard_token_abi, curve_abi, aave_abi, compound_abi, ceth_abi } = require('./token_abi');

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

async function addRowToHTML(token){
  //get logo if in token is in token_abi.json
  const ind = tokenlist.findIndex(i => i.symbol == token.underlying_symbol);
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
  name.innerText = token.underlying_name;
  name.style.marginLeft = "8px";
  symbol.innerText = token.underlying_symbol;
  symbol.style.marginLeft = "8px";
  tokenText.appendChild(name);
  tokenText.appendChild(symbol);
  market.appendChild(logoHTML);
  market.appendChild(tokenText);
  market.style.display = "flex";
  market.style.alignItems = "center";

  let supply = document.createElement("td");
  supply.innerHTML = token.supply_rate.toFixed(2) + "%";
  let comp_supply = document.createElement("td");
  comp_supply.innerHTML = token.comp_supply_apy.toFixed(2) + "%";
  let borrow = document.createElement("td");
  borrow.innerHTML = token.borrow_rate.toFixed(2) + "%";
  let comp_borrow = document.createElement("td");
  comp_borrow.innerHTML = token.comp_borrow_apy.toFixed(2) + "%";

  node.appendChild(market);
  node.appendChild(supply);
  node.appendChild(comp_supply);
  node.appendChild(borrow);
  node.appendChild(comp_borrow);
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

module.exports = {getCompoundList, addRowToHTML};
