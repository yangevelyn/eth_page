const {getApprovals, gasSummary} = require('./gas_functions');

let allTransactions = [];
let account = "";

async function main() {
  if(account == ""){
    return;
  }

  const hash = '0x66d2e5193663cf84f462dd34998d1b4d9d027c4c96a89379e8dfedee7d8c33bf';
  const contract = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f'

  let totalGas = 0;
  getApprovals(account, contract);
  document.getElementById('spinner').style.display = 'block';
  
  gasSummary(account, allTransactions).then((res) => {
    allTransactions.sort((a, b) => b.blockNumber - a.blockNumber);
    allTransactions.map((txn) => {
      console.log(txn);
      const gasFee = parseInt(txn.gasPrice)/10**18*parseInt(txn.gasUsed)
      totalGas += gasFee

      let node = document.createElement("TR");
      let block = document.createElement("TH");
      block.innerHTML = txn.blockNumber;
      let timeStamp = document.createElement("TD");
      timeStamp.innerHTML = txn.timeStamp;
      let hash = document.createElement("TD");
      hash.innerHTML = `<a target="_blank" href='https://etherscan.io/tx/${txn.hash}'>${txn.hash.substring(0, 10) + '...'}</a>`;
      let gasFeeText = document.createElement("TD");
      gasFeeText.innerHTML = gasFee.toFixed(6);

      node.dataset.toggle = "popover";
      node.dataset.content = `<a target="_blank" href='https://etherscan.io/tx/${txn.hash}'>Etherscan page</a>`
      node.title = txn.hash;

      node.appendChild(block);
      node.appendChild(timeStamp);
      node.appendChild(gasFeeText);
      node.appendChild(hash);
      document.getElementById("tx-list").appendChild(node);
    })

    console.log(res);
    let accountHTML = document.getElementById("account");
    accountHTML.innerHTML = account;
    accountHTML.dataset.toggle = "popover";
    accountHTML.dataset.content = `<a href='https://etherscan.io/address/${account}'>Etherscan page</a>`;
    accountHTML.title = account;
    document.getElementById("balance").innerHTML = res.balance/(10**18);
    document.getElementById("gas").innerHTML = totalGas;
    document.getElementById('spinner').style.display = 'none';

    $(function () {
      $('[data-toggle="popover"]').popover({html: true})
    })
  });
}

async function copyGasLink(){
  try{
    await navigator.clipboard.writeText(window.location.href);
    var share = document.getElementById('share');
    share.classList.replace('btn-light', 'btn-success');
    share.innerHTML = "URL copied!";
  } catch(err){
    console.log(err);
  }
}

function setAccount(){
  document.getElementById("tx-list").innerHTML = '';
  account = document.getElementById("accountInput").value;
  document.cookie = "acc=" + account;

  var share = document.getElementById("share");
  share.style.display = 'block';
  share.classList.replace('btn-success', 'btn-light');
  share.innerHTML = `<i class="fa fa-share"></i>&nbsp;Share`;
  if(account == ""){
    document.getElementById("share").style.display = "none";
  }

  allTransactions = [];
  totalGas = 0;
  main();
  
  window.location.href = window.location.href.split('?')[0] + "?address=" + account;
}

function getCookie(){
  var searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has("address") === true){
    account = searchParams.get("address");
    document.cookie = "acc=" + account;
  } else{
    if(document.cookie != ""){
      account = document.cookie
                .split('; ')
                .find(row => row.startsWith('acc='))
                .split('=')[1];
      if(account != ""){
        window.location.href = window.location.href.split('?')[0] + "?address=" + account;
      }
    }
  }
}

function init_gas(){
  getCookie();
  document.getElementById('submitButton').onclick = setAccount;
  document.getElementById('accountInput').value = account;
  document.getElementById("share").onclick = copyGasLink;
  if(account == ""){
    document.getElementById("share").style.display = "none";
  }
  main();
}

window.onload = init_gas;
