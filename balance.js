const {getBalanceList, getETHBalance, addRowToHTML} = require('./balance_functions');
const {prevAcc} = require('./gas');

var account = '0xc7C7E015D9BcA202c7f118D54da6D5d34c018B00';
if(document.cookie != ""){
  account = document.cookie
            .split('; ')
            .find(row => row.startsWith('acc='))
            .split('=')[1];
}
var block = 'latest';

function setInput(){
  document.getElementById("token-list").innerHTML = '';
  account = document.getElementById("account-input").value;
  document.cookie = "acc=" + account;
  block = document.getElementById("block-input").value;
  document.getElementById('spinner').style.display = 'block';
  main();
}

async function setUserInfoHTML(){
  let accountHTML = document.getElementById("account");
  accountHTML.innerHTML = account;
  accountHTML.dataset.toggle = "popover";
  accountHTML.dataset.content = `<a href='https://etherscan.io/address/${account}'>Etherscan page</a>`
  accountHTML.title = account;
  document.getElementById("block").innerHTML = block;
}

async function init_balance(){
  document.getElementById('balance-submit').onclick = setInput;
  document.getElementById('account-input').value = account;
  document.getElementById('block-input').value = 'latest';

  main();
}

async function main(){

  try {
    await setUserInfoHTML();

    // get eth data
    const ethBalance = await getETHBalance(account, block)
    const ethPriceRes = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    const ethUSD = ethPriceRes.data.ethereum.usd
    const ethObj = {
      symbol: 'ETH',
      logo: 'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/ed396/eth-diamond-black.png',
      balance: ethBalance,
      usd: ethUSD
    }
    //add eth info to table
    await addRowToHTML(ethObj);

    //add each token to table
    await getBalanceList(account, block)

    document.getElementById('spinner').style.display = 'none';
  } catch (error) {
    console.log(error);
  }
}

window.onload = init_balance;
