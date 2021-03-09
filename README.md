# Perpetual Protocol Smart Contract Javascript Developer's Guide
Find a full description and walkthrough for this guide in our docs:

https://docs.perp.fi/sdk-documentation/smart-contract-javascript-dev-guide

## To Run 
First, use Browserify to generate bundles capable of using require(). 
Run `npm run build` to generate all existing Browserify bundles.    
Future bundles should be placed in the public folder and follow the format [filename]_bundle.js (i.e. `browserify gas.js -o public/gas_bundle.js`)  
Then, run using `npm run start`.  

### Note: Informational purposes only
The code present here is for informational purposes only. Try it with testnet before using any code provided with mainnet funds. If you find bugs, please create an issue or PR. We welcome your feedback or contributions!
