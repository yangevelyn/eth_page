const {getBalanceList, getETHBalance} = require('./balance_functions');

let tokenlist;

var account = '0xc7C7E015D9BcA202c7f118D54da6D5d34c018B00';
var block = 11900892;

function setInput(){
  document.getElementById("token-list").innerHTML = '';
  account = document.getElementById("account-input").value;
  block = document.getElementById("block-input").value;
  main();
}

async function setHTML(balanceList){
  document.getElementById("account").innerHTML = account;
  document.getElementById("block").innerHTML = block;
  // document.getElementById("balance").innerHTML = ethBalance;

  balanceList.map((token) => {
    if(token.balance !== 0){
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
    $('[data-toggle="popover"]').popover({html: true})
  })
}

async function init_balance(){
  document.getElementById('balance-submit').onclick = setInput;
  document.getElementById('account-input').value = account;
  document.getElementById('block-input').value = block;

  main();
}

async function main(){
  getBalanceList(account, block)
  .then((balanceList) => {
    getETHBalance(account, block)
    .then(async (ethBalance) => {
      //get eth balance in usd
      await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then((res) => {
        balanceList.sort((a, b) => (b.balance) - (a.balance));
        console.log(balanceList);

        //add eth balance to balanceList
        let ethUSD = res.data.ethereum.usd;
        balanceList.unshift({
          symbol: 'ETH',
          logo: 'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/ed396/eth-diamond-black.png',
          balance: ethBalance,
          usd: ethUSD
        })

        setHTML(balanceList);
      })
    })
  })
}

window.onload = init_balance;
// main();
