
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

const AccountDetailsKey = "DS_ACCOUNT_DETAILS_KEY";

export async function isAccountConnected() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [account] = await provider.listAccounts();
  console.log("isAccountConnected, account: " + account);
  if (account === undefined || account === null) {
    return false;
  }
  return true;
}

export async function fetchAccount() {
  checkWallet();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  var [account] = await provider.listAccounts();
  
  console.log("GOT ACCOUNT FROM LIST ACCOUNTS: " + account);
  if (account === undefined || account === null)  {
    [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    console.log("ACCOUNT FROM ETH_REQUESTACCOUNTS: " + account);    
  }

  if (account === undefined || account === null) {
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
  const displayBalance = Number(ethers.utils.formatEther(weiBalance)).toFixed(4);

  var accountDetails = new AccountDetails(ethAddress, weiBalance, displayBalance);

  localStorage.setItem(AccountDetailsKey, accountDetails);
  return accountDetails;
}

export async function isCurrentAccountOwner() {
  console.log("Checking current account owner status..");

  const connected = await isAccountConnected();
  if (!connected) {
    console.log("NOT CONNECTED.");
    return false;
  }

  const account = await fetchAccount();

  const ethAddress = account.toString().toLowerCase();
  const contract = await getContract();
  const ownerAddress = (await contract.owner()).toString().toLowerCase();
  console.log("connected account address: " + ethAddress);
  console.log("owner address: " + ownerAddress);

  return (ethAddress === ownerAddress);
}


export function fetchCachedAccountDetails() {
  const accountDetails = localStorage.getItem(AccountDetailsKey);
  
  if (accountDetails === null) {
     return null;
  }

  if (accountDetails.address === undefined || accountDetails.weiBalance === undefined || accountDetails.displayBalance === undefined) {
    clearCachedAccountDetails();
    return null;
  } else {
    return accountDetails;
  }
}

export function clearCachedAccountDetails() {
  localStorage.removeItem(AccountDetailsKey);
}

class AccountDetails {
  constructor(address, weiBalance, displayBalance) {
    this.address = address;
    this.weiBalance = weiBalance;
    this.displayBalance = displayBalance; // ETH
  }
}
  
export async function fetchMintPrice() {
  checkWallet();
  const contract = await getContract();
  const mintPrice = await contract.getMintPrice();
  return mintPrice;
}
  