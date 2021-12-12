import { showErrorMessage } from './UIUtils';
import * as Errors from './ErrorMessages';
import { DynaStripesCurrentEthNeworkID } from './Constants';
import { addMumbai } from './BlockchainAPI';

export function handleError(err) {
    console.log('Handling error ' + err.code + ': ' + err.message);
  
    if (err.code === 4001) {
      showErrorMessage('You rejected the transaction. :-(');
    } else if (err.code === -32002) {
      // -32002: already requesting accounts
      showErrorMessage('Already requesting accounts. Please open MetaMask to confirm.');
    } else if (err.code === -32603) {
      // Internal JSON RPC error
      if (err.data != null && err.data.message != null) {
        showErrorMessage('Oops, an error ocurred. ' + err.data.message);
      } else {
        showErrorMessage('Oops, an Internal JSON RPC error occurred. ');
      }
    } else if (err.message === Errors.DS_NO_ETH_WALLET) {
      showErrorMessage("No ETH wallet detected. Please install MetaMask. Read the 'How to' guide for more info.");
    } else if (err.message === Errors.DS_NO_ETH_ACCOUNT) {
      showErrorMessage("You need to connect an account via your ETH wallet before you can do that. Read the 'How to' guide for more info.");      
    } else if (err.message === Errors.DS_WRONG_ETH_NETWORK) {
      if (DynaStripesCurrentEthNeworkID === 4) {
        showErrorMessage("You're on the wrong ETH network Please switch to Rinkeby. Read the 'How to' guide for more info.");
      } else if (DynaStripesCurrentEthNeworkID === 1337) {
        showErrorMessage("You're on the wrong ETH network Please switch to localhost. Read the 'How to' guide for more info.");
      } else if (DynaStripesCurrentEthNeworkID === 1) {
        showErrorMessage("You're on the wrong ETH network Please switch to mainnet. Read the 'How to' guide for more info.");
      } else if (DynaStripesCurrentEthNeworkID === 80001) {
        const onClose = addMumbai;
        showErrorMessage("You're on the wrong network. Tap to switch to Matic Mumbai, or read the 'How to' guide for more info.", addMumbai);
      } else {
        showErrorMessage("You're on the wrong network. Read the 'How to' guide to learn how to change to the right one.");
      }
    } else if (err.code != null) {
      showErrorMessage('An error occurred: (' + err.code + ') ' + err.message);
    } else {
      showErrorMessage('An error occurred.');
    }
  }
  
  