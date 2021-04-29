const {getAaveList, addRowToHTML} = require('./aave_functions');

let sortBy = "deposit";
let reverse = true;
let aaveList = [];

function sort(type){
  //clear all icons
  // document.getElementById('market-sort').classList = "fa fa-sort";
  // document.getElementById('market-sort').style = "color: lightgrey;";
  document.getElementById('deposit-sort').classList = "fa fa-sort";
  document.getElementById('deposit-sort').style = "color: lightgrey;";
  document.getElementById('s-borrow-sort').classList = "fa fa-sort";
  document.getElementById('s-borrow-sort').style = "color: lightgrey;";
  document.getElementById('v-borrow-sort').classList = "fa fa-sort";
  document.getElementById('v-borrow-sort').style = "color: lightgrey;";

  let icon = document.getElementById(`${type}-sort`);

  //reverse if already sorting by this type
  if(sortBy == type){
    reverse = !reverse;
  } else{
    reverse = true;
  }

  //set icon
  reverse ? 
    icon.classList.replace('fa-sort', 'fa-sort-down') : 
    icon.classList.replace('fa-sort', 'fa-sort-up');
  icon.style = "color: slategrey;";
  
  sortBy = type;
  setTableHTML();
}

async function init_aave(){
  // document.getElementById("market-head").onclick = () => {sort('market')};
  document.getElementById("deposit-head").onclick = () => {sort('deposit')};
  document.getElementById("s-borrow-head").onclick = () => {sort('s-borrow')};
  document.getElementById("v-borrow-head").onclick = () => {sort('v-borrow')};

  main();
}

async function setTableHTML(){
  //clear list
  document.getElementById('mk-list').innerHTML = `<tbody id="mk-list"></tbody>`;

  if(sortBy == 'deposit'){
    aaveList.sort((a, b) => reverse ? b.deposit_apy - a.deposit_apy : a.deposit_apy - b.deposit_apy);
  } else if(sortBy == 's-borrow'){
    aaveList.sort((a, b) => reverse ? b.borrow_apy_s - a.borrow_apy_s : a.borrow_apy_s - b.borrow_apy_s);
  } else if(sortBy == 'v-borrow'){
    aaveList.sort((a, b) => reverse ? b.borrow_apy_var - a.borrow_apy_var : a.borrow_apy_var - b.borrow_apy_var);
  }

  for(let i = 0; i < aaveList.length; i++){
    await addRowToHTML(aaveList[i]);
  }
}

async function main(){
  try {
    document.getElementById('spinner').style.display = 'block';
    aaveList = await getAaveList();

    await setTableHTML();

    document.getElementById('spinner').style.display = 'none';
  } catch (error) {
    console.log(error);
    document.getElementById('spinner').style.display = 'none';
  }
}

window.onload = init_aave;
