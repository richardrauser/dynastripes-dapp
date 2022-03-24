
const DynaStripesMaxTokensPerUser = 2000;
const DynaStripesLocalhostNetwork = "localhost";
const DynaStripesMumbaiNetwork = "mumbai";
const DynaStripeRinkebyNetwork = "rinkeby";

// Change this to control which environment you're pointing at.
// const currentNetwork = DynaStripesLocalhostNetwork;
const currentNetwork = DynaStripesMumbaiNetwork;
// const currentNetwork = DynaStripeRinkebyNetwork;

const DynaStripesCurrentNetworkIDKey = "DynaStripesCurrentNetworkIDKey";
const DynaStripesCurrentNetworkNameKey = "DynaStripesCurrentNetworkNameKey";
const DynaStripesCurrentNetworkCurrencySymbolKey = "DynaStripesCurrentNetworkCurrencySymbolKey";
const DynaStripesCurrentNetworkRpcUrlKey = "DynaStripesCurrentNetworkRpcUrlKey";
const DynaStripesCurrentNetworkExplorerUrlKey = "DynaStripesCurrentNetworkExplorerUrlKey";
const DynaStripesContractAddressKey = "DynaStripesContractAddressKey";


const networkConfig = networkConfigFor(currentNetwork);
const DynaStripesCurrentNetworkID = networkConfig[DynaStripesCurrentNetworkIDKey];
const DynaStripesCurrentNetworkName = networkConfig[DynaStripesCurrentNetworkNameKey];
const DynaStripesCurrentNetworkCurrencySymbol = networkConfig[DynaStripesCurrentNetworkCurrencySymbolKey];
const DynaStripesCurrentNetworkRpcUrl = networkConfig[DynaStripesCurrentNetworkRpcUrlKey];
const DynaStripesCurrentNetworkExplorerUrl = networkConfig[DynaStripesCurrentNetworkExplorerUrlKey];
const DynaStripesContractAddress = networkConfig[DynaStripesContractAddressKey];

function networkConfigFor(currentNetwork) { 
    if (currentNetwork === DynaStripesLocalhostNetwork) {
        return {
            DynaStripesCurrentNetworkIDKey: 1337, 
            DynaStripesCurrentNetworkNameKey: "localhost",
            DynaStripesCurrentNetworkCurrencySymbolKey: "MATIC",
            DynaStripesCurrentNetworkRpcUrlKey: "https://www.superbad.com/",
            DynaStripesCurrentNetworkExplorerUrlKey: 'https://www.superbad.com/',
            DynaStripesContractAddressKey: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
        }    
    } else if (currentNetwork === DynaStripesMumbaiNetwork) {
        return {
            DynaStripesCurrentNetworkIDKey: 80001,
            DynaStripesCurrentNetworkNameKey: "Matic Mumbai",
            DynaStripesCurrentNetworkCurrencySymbolKey: "MATIC",
            DynaStripesCurrentNetworkRpcUrlKey: "https://rpc-mumbai.maticvigil.com/",
            DynaStripesCurrentNetworkExplorerUrlKey: "https://mumbai.polygonscan.com/",
            DynaStripesContractAddressKey: '0xfE5b53733fA92D335e08dAe84fC98f98Fb8BD535'
        }
    } else if (currentNetwork === DynaStripeRinkebyNetwork) {
        return {
            DynaStripesCurrentNetworkIDKey: 4, 
            DynaStripesCurrentNetworkNameKey: "rinkeby",
            DynaStripesCurrentNetworkCurrencySymbolKey: "ETH",
            DynaStripesCurrentNetworkRpcUrlKey: "https://rinkeby.infura.io/v3/",
            DynaStripesCurrentNetworkExplorerUrlKey: 'https://rinkeby.etherscan.io/',
            DynaStripesContractAddressKey: '0x26E2aaaDfADc86Cf4A704126ef27d4B802dBBB93'
        }
    }
}

// ETHEREUM

// Rinkeby
// const DynaStripesCurrentNetworkID = 4; 
// const DynaStripesCurrentNetworkName = "Rinkeby Testnet";
// const DynaStripesContractAddress = '0x95C2274aCC5B0AEc7d1544d71CF4620124f6ec1c';
// const DynaStripesCurrentNetworkExplorerUrl = 'https://rinkeby.etherscan.io/'; 

// Ropsten
// const DynaStripesCurrentNetworkID = 3; 
// const DynaStripesCurrentNetworkName = "Ropsten Testnet";
// const DynaStripesContractAddress = '0x379A3dA759A131504085E485a75cA2202fB80476'; 
// const DynaStripesCurrentNetworkExplorerUrl = 'https://ropsen.etherscan.io/'; 

// Mainnet
// const DynaStripesCurrentNetworkID = 1; 
// const DynaStripesCurrentNetworkName = "Ethereum Mainnet";
// const DynaStripesContractAddress = '0xeD03568eaC21c1D0316c87cC09c0ce85f0000c65'; 
// const DynaStripesCurrentNetworkExplorerUrl = 'https://www.etherscan.io/';

// POLYGON


export { DynaStripesMaxTokensPerUser,
         DynaStripesCurrentNetworkID, 
         DynaStripesCurrentNetworkName, 
         DynaStripesCurrentNetworkCurrencySymbol, 
         DynaStripesCurrentNetworkRpcUrl,
         DynaStripesCurrentNetworkExplorerUrl };

export default DynaStripesContractAddress;
