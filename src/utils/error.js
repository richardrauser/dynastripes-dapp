
import { showErrorMessage } from './ui';
import * as Errors from './errors.js';

export function handleError(err) {
    console.log('Handling error ' + err.code + ': ' + err.message);
  
    if (err.code === 4001) {
      showErrorMessage('You rejected the transaction. :-(');
      // -32002: already requesting accounts
    } else if (err.code === -32603) {
      // Internal JSON RPC error
      if (err.data != null && err.data.message != null) {
        showErrorMessage('Oops, an error ocurred. ' + err.data.message);
      } else {
        showErrorMessage('Oops, an Internal JSON RPC error occurred. ');
      }
    } else if (err.message === Errors.DS_NO_ETH_WALLET) {
      showErrorMessage('No ETH wallet detected. Please install MetaMask.');
    } else if (err.message === Errors.DS_NO_ETH_ACCOUNT) {
      showErrorMessage('You need to connect an account via your ETH wallet before you can do that.');      
    } else if (err.message === Errors.DS_WRONG_ETH_NETWORK) {
      showErrorMessage("You're on the wrong ETH network Please switch to Rinkeby.");
    } else if (err.code != null) {
      showErrorMessage('An error occurred: (' + err.code + ') ' + err.message);
    } else {
      showErrorMessage('An error occurred.');
    }
  }
  
  