const {getCompoundList, addRowToHTML} = require('./compound_functions');

let sortBy = "supply";
let reverse = true;
let compoundList = [];

function sort(type){
  //clear all icons
  // document.getElementById('market-sort').classList = "fa fa-sort";
  // document.getElementById('market-sort').style = "color: lightgrey;";
  document.getElementById('supply-sort').classList = "fa fa-sort";
  document.getElementById('supply-sort').style = "color: lightgrey;";
  document.getElementById('comp-supply-sort').classList = "fa fa-sort";
  document.getElementById('comp-supply-sort').style = "color: lightgrey;";
  document.getElementById('borrow-sort').classList = "fa fa-sort";
  document.getElementById('borrow-sort').style = "color: lightgrey;";
  document.getElementById('comp-borrow-sort').classList = "fa fa-sort";
  document.getElementById('comp-borrow-sort').style = "color: lightgrey;";

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

async function init_protocols(){
  // document.getElementById("market-head").onclick = () => {sort('market')};
  document.getElementById("supply-head").onclick = () => {sort('supply')};
  document.getElementById("comp-supply-head").onclick = () => {sort('comp-supply')};
  document.getElementById("borrow-head").onclick = () => {sort('borrow')};
  document.getElementById("comp-borrow-head").onclick = () => {sort('comp-borrow')};

  main();
}

async function setTableHTML(){
  //clear list
  document.getElementById('mk-list').innerHTML = `<tbody id="mk-list"></tbody>`;

  if(sortBy == 'supply'){
    compoundList.sort((a, b) => reverse ? b.supply_rate - a.supply_rate : a.supply_rate - b.supply_rate);
  } else if(sortBy == 'borrow'){
    compoundList.sort((a, b) => reverse ? b.borrow_rate - a.borrow_rate : a.borrow_rate - b.borrow_rate);
  } else if(sortBy == 'comp-supply'){
    compoundList.sort((a, b) => reverse ? b.comp_supply_apy - a.comp_supply_apy : a.comp_supply_apy - b.comp_supply_apy);
  } else if(sortBy == 'comp-borrow'){
    compoundList.sort((a, b) => reverse ? b.comp_borrow_apy - a.comp_borrow_apy : a.comp_borrow_apy - b.comp_borrow_apy);
  }

  for(let i = 0; i < compoundList.length; i++){
    await addRowToHTML(compoundList[i]);
  }
}

async function main(){
  try {
    document.getElementById('spinner').style.display = 'block';
    compoundList = await getCompoundList();

    await setTableHTML();

    document.getElementById('spinner').style.display = 'none';
  } catch (error) {
    console.log(error);
    document.getElementById('spinner').style.display = 'none';
  }
}

window.onload = init_protocols;
