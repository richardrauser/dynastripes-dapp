
import { ethers } from 'ethers';
import DynaStripes from '../artifacts/contracts/DynaStripes.sol/DynaStripes.json';

// const dynaStripesContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // localhost
// const dynaStripesContractAddress = '0x379A3dA759A131504085E485a75cA2202fB80476'; // ropsten
const dynaStripesContractAddress = '0x2BeeB093f65635589007Ba7b85bfc1C82E851412'; // rinkeby

function checkWallet() {
  if (typeof window.ethereum === 'undefined') {
    console.log('Could not get contract. Returning null..');
    throw Error("NO_ETH_WALLET");
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
  
export async function fetchMintPrice() {
  const contract = await getContract();
  const mintPrice = await contract.getMintPrice();
  console.log("blockchain.js: Mint price: " + mintPrice);

  return mintPrice;
}

  