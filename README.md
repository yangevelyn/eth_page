# Ethereum Dashboard
Simple webpage that displays an address' transaction list, total gas used, and historical token balances.

## Demo
See [here]() for a live demo.

## To Run 
Run `npm install -g browserify` to install Browserify  
Run `npm run build` to generate all existing Browserify bundles.    
Future bundles should be placed in the root directory and follow the format [filename]_bundle.js (i.e. `browserify gas.js -o gas_bundle.js`)  
Then, simply open `index.html` to see the static webpage.
