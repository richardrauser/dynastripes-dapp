
import { ethers } from 'ethers';
import DynaStripes from '../artifacts/contracts/DynaStripes.sol/DynaStripes.json';
import * as Errors from './errors.js';

// const dynaStripesContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // localhost
// const dynaStripesContractAddress = '0x379A3dA759A131504085E485a75cA2202fB80476'; // ropsten
const dynaStripesContractAddress = '0x2BeeB093f65635589007Ba7b85bfc1C82E851412'; // rinkeby

function checkWallet() {
  console.log("Checking wallet...");
  if (typeof window.ethereum === 'undefined') {
    console.log('Could not get wallet. Throwing error NO_ETH_WALLET');
    throw Error(Errors.DS_NO_ETH_WALLET);
  } else {
    console.log('Has wallet.');
  }
}
export async function getContract() {
  console.log("Getting contract...");
  checkWallet();
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);
  // const provider = new ethers.providers.getNetwork("Ropsten");

  // const provider = ethers.getDefaultProvider('ropsten');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const { chainId } = await provider.getNetwork()
  console.log("CHAIN ID: " + chainId) // 42
  
  if (chainId !== 4) {
    // not on Rinkeby!
    console.log("Not on Rinkeby.");
    throw Error(Errors.DS_WRONG_ETH_NETWORK);
  }
  const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);
  return contract;
}
  
export async function getContractWithSigner() {
  checkWallet();

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);
  // const provider = ethers.getDefaultProvider('ropsten');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);
  const signer = provider.getSigner();
  const contractWithSigner = contract.connect(signer);  
  return contractWithSigner;
}

const accountAddressKey = "accountAddress";
const accountBalanceKey = "accountBalance";

export async function fetchAccountDetails() {
  console.log("Fetching account details..");
  checkWallet();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

  if (account.count < 1) {
    throw Error(Errors.DS_NO_ETH_ACCOUNT);
  }
    
  var ethAddress = account.toString();

  console.log("Getting details of account: " + ethAddress); 

  if (ethAddress.length > 10) {
    ethAddress = ethAddress.substring(0, 6) +  "..." + ethAddress.slice(-4);        
  }

  const weiBalance = await provider.getBalance(account);
  const ethBalance = Number(ethers.utils.formatEther(weiBalance)).toFixed(4);

  localStorage.setItem(accountAddressKey, ethAddress);
  localStorage.setItem(accountBalanceKey, ethBalance);  
  var accountDetails = new AccountDetails(ethAddress, ethBalance);

  return accountDetails;
}

export function fetchCachedAccountDetails() {
  const address = localStorage.getItem(accountAddressKey);
  const balance = localStorage.getItem(accountBalanceKey);

  if (address === null || balance === null) {
    return null;
  }

  var accountDetails = new AccountDetails(address, balance);

  return accountDetails;
}

export function clearCachedAccountDetails() {
  localStorage.removeItem(accountAddressKey);
  localStorage.removeItem(accountBalanceKey);
}

class AccountDetails {
  constructor(address, balance) {
    this.address = address;
    this.balance = balance;
  }
}
  
export async function fetchMintPrice() {
  checkWallet();
  const contract = await getContract();
  const mintPrice = await contract.getMintPrice();
  return mintPrice;
}
  