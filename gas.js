const {getApprovals, gasSummary} = require('./gas_functions');

let allTransactions = [];
let account = "";

async function main() {
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
  document.getElementById('accountInput').value = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';
  account = '0x660939b21C0ac3339A98dB9FFBdA74Cd59E07685';
  main();
}

window.onload = init_gas;
