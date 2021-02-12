const fetch = require("cross-fetch")
const { Contract, providers, Wallet, utils } = require("ethers")
const AmmReaderArtifact = require("@perp/contract/build/contracts/AmmReader.json")
const InsuranceFundArtifact = require("@perp/contract/build/contracts/InsuranceFund.json")
const ERC20Contract = require('erc20-contract-js');


//command line input https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/
// uniswap contract https://uniswap.org/docs/v2/smart-contracts/pair-erc-20 

async function setupEnv() {
  const metadataUrl = "https://metadata.perp.exchange/production.json"
  const metadata = await fetch(metadataUrl).then(res => res.json())
  const xDaiUrl = "https://rpc.xdaichain.com/"
  const layer2Provider = new providers.JsonRpcProvider(xDaiUrl)
  const insuranceFundAddr = metadata.layers.layer2.contracts.InsuranceFund.address
  const ammReaderAddr = metadata.layers.layer2.contracts.AmmReader.address

  const insuranceFund = new Contract(insuranceFundAddr, InsuranceFundArtifact.abi, layer2Provider)
  const ammReader = new Contract(ammReaderAddr, AmmReaderArtifact.abi, layer2Provider)
  const wallet = Wallet.fromMnemonic(process.env.mnemonic).connect(providers.getDefaultProvider());


  return {
    insuranceFund, ammReader, wallet
  }
}

async function setupERC20Token(tokenAddress) {

}

async function checkUNIPrice(contractPrice) {

}


function getAmmInfo(ammProps) {
  return {
    quoteAssetSymbol: ammProps.quoteAssetSymbol,
    baseAssetSymbol: ammProps.baseAssetSymbol
  }
}

async function main() {
  var { insuranceFund, ammReader, wallet } = await setupEnv()
  const ammAddresses = await insuranceFund.getAllAmms()
  const ammProps = await Promise.all(ammAddresses.map(addr => ammReader.getAmmStates(addr)))
  console.log(wallet.address)

  var balancePromise = wallet.getBalance();

  //getting ether balance
  balancePromise.then(function(balance) {
    console.log(utils.formatEther(balance));
  });

  //getting PERP balance
  const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (boolean)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ];
  const perp_contract_addr = '0xbc396689893d065f41bc2c6ecbee5e0085233447';
  const erc20 = new Contract(perp_contract_addr, abi, providers.getDefaultProvider());
  //const perp_balance = await erc20.balanceOf(wallet.address).then((balance) => { return balance});
  var perp_balance = await erc20.balanceOf(wallet.address);
  const decimals =  await erc20.decimals()
  const symbol =  await erc20.symbol()
  perp_balance /= 10**decimals;
  console.log(`${symbol} balance for ${wallet.address}: ${perp_balance}`);


  
  
  const ammInfos = ammProps.map(prop => getAmmInfo(prop))
  console.log(ammInfos)
}

main()
