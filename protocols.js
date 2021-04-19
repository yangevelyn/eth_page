const {getCurveList, getAaveList, getCompoundList, addRowToHTML} = require('./protocols_functions');

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
let sortBy = "supply";
let reverse = true;
let compoundList = [];

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
