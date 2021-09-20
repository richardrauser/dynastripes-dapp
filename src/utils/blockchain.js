import {showErrorMessage} from './ui.js';

import { ethers } from 'ethers';
import ColourPulse from '../artifacts/contracts/ColourPulse.sol/ColourPulse.json';

const colourPulseAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export async function getContract() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(colourPulseAddress, ColourPulse.abi, provider);
      return contract;
    } else {
      showErrorMessage('Could not get contract.');
      console.log('Could not get contract. Returning null..');
      return null;
    }
  }
  
export async function getContractWithSigner() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(colourPulseAddress, ColourPulse.abi, provider);
      const signer = provider.getSigner();
  
      const contractWithSigner = contract.connect(signer);
      return contractWithSigner;
    } else {
      showErrorMessage('Could not get signer.');
      console.log('Could not get contract with signer. Returning null..');
      return null;
    }
  }
  
  