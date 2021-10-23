
import { ethers } from 'ethers';
import DynaStripes from '../artifacts/contracts/DynaStripes.sol/DynaStripes.json';
import * as Errors from './errors.js';

// const dynaStripesContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // localhost
// const dynaStripesContractAddress = '0x379A3dA759A131504085E485a75cA2202fB80476'; // ropsten
const dynaStripesContractAddress = '0x2BeeB093f65635589007Ba7b85bfc1C82E851412'; // rinkeby

function checkWallet() {
  // console.log("Checking wallet...");
  if (typeof window.ethereum === 'undefined') {
    // console.log('Could not get wallet. Throwing error NO_ETH_WALLET');
    throw Error(Errors.DS_NO_ETH_WALLET);
  } else {
    // console.log('Has wallet.');
  }
}
export async function getContract() {
  checkWallet();
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);
  // const provider = new ethers.providers.getNetwork("Ropsten");

  // const provider = ethers.getDefaultProvider('ropsten');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const { chainId } = await provider.getNetwork()
  console.log("CHAIN ID: " + chainId); // 42
  
  if (chainId !== 4) {
    console.log("Not on Rinkeby.");
    throw Error(Errors.DS_WRONG_ETH_NETWORK);
  }
  const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);
  return contract;
}

export async function getSigner() {
  checkWallet();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return signer;
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

async function fetchAccount() {
  checkWallet();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [account] = await provider.listAccounts();

  if (account === undefined || account === null || account.length < 1) {
    throw Error(Errors.DS_NO_ETH_ACCOUNT);
  }
  return account;
}

export async function fetchAccountDetails() {
  console.log("Fetching account details..");
    
  const account = await fetchAccount();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

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

export async function isCurrentAccountOwner() {
  console.log("Checking current account owner status..");

  const account = await fetchAccount();

  const ethAddress = account.toString();
  const contract = await getContract();
  const ownerAddress = await contract.owner();

  return (ethAddress === ownerAddress);
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
  