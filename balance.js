const {getBalanceList, getETHBalance, addRowToHTML} = require('./balance_functions');

var account = "";
// var searchParams = new URLSearchParams(window.location.href);
// if(searchParams.has("address")){
//   account = searchParams.get("address");
//   document.cookie = "acc=" + account;
// } else{
//   if(document.cookie != ""){
//     console.log('has cookie');
//     account = document.cookie
//               .split('; ')
//               .find(row => row.startsWith('acc='))
//               .split('=')[1];
//     console.log(window.location.href.split('?'));
//     // window.location.href = window.location.href.split('?') + "?address=" + account; 
//   }
// }

var block = "";

function setInput(){
  document.getElementById("token-list").innerHTML = '';
  account = document.getElementById("account-input").value;
  document.cookie = "acc=" + account;
  block = document.getElementById("block-input").value;
  document.cookie = "block=" + block;
  document.getElementById('spinner').style.display = 'block';
  main();

  console.log(block);
  window.location.href = window.location.href.split('?')[0] + "?address=" + account + "&block=" + block;
}

async function copyBalanceLink(){
  try{
    await navigator.clipboard.writeText(window.location.href);
    var share = document.getElementById('share');
    share.classList.replace('btn-light', 'btn-success');
    share.innerHTML = "URL copied!";
  } catch(err){
    console.log(err);
  }
}

async function setUserInfoHTML(){
  let accountHTML = document.getElementById("account");
  accountHTML.innerHTML = account;
  accountHTML.dataset.toggle = "popover";
  accountHTML.dataset.content = `<a href='https://etherscan.io/address/${account}'>Etherscan page</a>`;
  accountHTML.title = account;
  document.getElementById("block").innerHTML = block;
  var share = document.getElementById("share");
  share.style.display = 'block';
  share.classList.replace('btn-success', 'btn-light');
  share.innerHTML = `<i class="fa fa-share"></i>&nbsp;Share`;
  if(account == ""){
    document.getElementById("share").style.display = "none";
  }
}

function getCookie(){
  // var searchParams = new URLSearchParams(window.location.search);
  // if(searchParams.has("address") === true){
  //   account = searchParams.get("address");
  //   console.log(account);
  //   document.cookie = "acc=" + account;
  // } else{
  //   if(document.cookie != ""){
  //     console.log(document.cookie);
  //     account = document.cookie
  //               .split('; ')
  //               .find(row => row.startsWith('acc='))
  //               .split('=')[1];
  //     console.log(account);
  //     if(account != ""){
  //       window.location.href = window.location.href.split('?')[0] + "?address=" + account;
  //     }
  //   }
  // }

  var searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has("address") === true){
    account = searchParams.get("address");
    document.cookie = "acc=" + account;
  } else{
    if(document.cookie != ""){
      account = document.cookie
                .split('; ')
                .find(row => row.startsWith('acc='));
      if(account != undefined){
        account = account.split('=')[1];
      }
      if(account != ""){
        window.location.search += "&address=" + account;
      }
    }
  }
  if(searchParams.has("block") === true){
    block = searchParams.get("block");
    document.cookie = "block=" + block;
  } else{
    if(document.cookie != ""){
      block = document.cookie
                .split('; ')
                .find(row => row.startsWith('block='))
      if(block != undefined){
        block = block.split('=')[1];
      }      
      if(block != ""){
        window.location.search += "&block=" + block;
      }
    }
  }
}

async function init_balance(){
  getCookie();
  document.getElementById('balance-submit').onclick = setInput;
  document.getElementById('account-input').value = account;
  document.getElementById('block-input').value = block;
  document.getElementById("share").onclick = copyBalanceLink;

  document.cookie = "acc=" + account;
  document.cookie = "block=" + block;

  main();
}

async function main(){
  if(account == "" || block == ""){
    return;
  }
  try {
    document.getElementById('spinner').style.display = 'block';
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
    document.getElementById('spinner').style.display = 'none';
  }
}

window.onload = init_balance;
