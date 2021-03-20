const {getApprovals, gasSummary} = require('./gas_functions');

let allTransactions = [];
let account = "";

async function main() {
  document.getElementById('spinner').style.display = 'block';
  const hash = '0x66d2e5193663cf84f462dd34998d1b4d9d027c4c96a89379e8dfedee7d8c33bf';
  const contract = '0x17e8ca1b4798b97602895f63206afcd1fc90ca5f'

  let totalGas = 0;
  getApprovals(account, contract);
  gasSummary(account, allTransactions).then((res) => {
    allTransactions.sort((a, b) => b.gasUsed - a.gasUsed);
    allTransactions.map((txn) => {
      const gasFee = parseInt(txn.gasPrice)/10**18*parseInt(txn.gasUsed)
      totalGas += gasFee

      let node = document.createElement("TR");
      let block = document.createElement("TH");
      block.innerHTML = txn.blockNumber;
      let timeStamp = document.createElement("TD");
      timeStamp.innerHTML = txn.timeStamp;
      let hash = document.createElement("TD");
      hash.innerHTML = txn.hash;
      let gasFeeText = document.createElement("TD");
      gasFeeText.innerHTML = gasFee;

      node.appendChild(block);
      node.appendChild(timeStamp);
      node.appendChild(gasFeeText);
      document.getElementById("tx-list").appendChild(node);
    })

    console.log(res);
    document.getElementById("account").innerHTML = account;
    document.getElementById("balance").innerHTML = res.balance/(10**18);
    document.getElementById("gas").innerHTML = totalGas;
    document.getElementById('spinner').style.display = 'none';
  });
}

function setAccount(){
  document.getElementById("tx-list").innerHTML = '';
  account = document.getElementById("accountInput").value;
  allTransactions = [];
  totalGas = 0;
  main();
}

function init_gas(){
  document.getElementById('submitButton').onclick = setAccount;
  document.getElementById('accountInput').value = '0xc7C7E015D9BcA202c7f118D54da6D5d34c018B00';
  account = '0xc7C7E015D9BcA202c7f118D54da6D5d34c018B00';
  main();
}

window.onload = init_gas;
