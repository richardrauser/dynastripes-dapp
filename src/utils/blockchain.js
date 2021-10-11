import {showErrorMessage} from './ui.js';

import { ethers } from 'ethers';
import DynaStripes from '../artifacts/contracts/DynaStripes.sol/DynaStripes.json';

const dynaStripesContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // localhost
// const dynaStripesContractAddress = '0x379A3dA759A131504085E485a75cA2202fB80476'; /. ropsten


export async function getContract() {
  console.log("Getting contract...");
    if (typeof window.ethereum === 'undefined') {
      showErrorMessage('Could not get contract.');
      console.log('Could not get contract. Returning null..');
      return null;
    }
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);
    // const provider = new ethers.providers.getNetwork("Ropsten");

    // const provider = ethers.getDefaultProvider('ropsten');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);
    return contract;
  }
  
export async function getContractWithSigner() {
    console.log("Getting signer...");
    if (typeof window.ethereum === 'undefined') {
      showErrorMessage('Could not get signer.');
      console.log('Could not get contract with signer. Returning null..');
      return null;
    }

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);

    // const provider = ethers.getDefaultProvider('ropsten');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(dynaStripesContractAddress, DynaStripes.abi, provider);

    const signer = provider.getSigner();

    const contractWithSigner = contract.connect(signer);
    return contractWithSigner;
  }
  
  