import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import TokenList from './TokenList';

import { getContract } from '../utils/BlockchainAPI';
import DynaSpan from './DynaSpan';
import MetaMaskLink from './MetaMaskLink';
import { handleError } from '../utils/ErrorHandler';
import * as Errors from '../utils/ErrorMessages';

class YourStripesComponent extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        tokenIds: []
      }
    }
  
    componentDidMount() {
      this.fetchTokens();
    }
  
    async fetchTokens() {  
      try {
        const contract = await getContract();
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        var tokenIds = [];
  
        const tokenCount = await contract.balanceOf(account);
        console.log("TOKEN COUNT: " + tokenCount);
  
        for (var i = 0; i < tokenCount; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(account, i);
          tokenIds.push(tokenId);
        }
        
        this.setState({
          loading: false,
          tokenIds: tokenIds
        });
      } catch (err) {

        if (err.message === Errors.DS_NO_ETH_WALLET) {
          this.setState({
            loading: false,
            hasWallet: false
          });  
        } else {
          handleError(err);
          this.setState({
            hasWallet: true,
            loading: false,
            tokenIds: []
          });  
        }
      }
    }
  
    render() {

      const tokenIds = this.state.tokenIds;
      console.log("RENDER TOKEN IDS: " + tokenIds);
      if (this.state.loading === true) {
        return (
          <div className="content">
            <h1>Your <DynaSpan /> NFTs</h1>
            <Spinner animation="grow" variant="dark" />
          </div>
        );
      } else if (this.state.hasWallet !== undefined && this.state.hasWallet === false) {
        return (
            <div className="content">
              <h1>Your <DynaSpan /> NFTs</h1>
              A crypto wallet is required to view your <DynaSpan />. Install <MetaMaskLink />.
            </div>
        );

      } else if (tokenIds === null || tokenIds.length === 0) {
        return (
            <div className="content">
              <h1>Your <DynaSpan /> NFTs</h1>
                You have no DynaStripes yet.
            </div>
        );
      } else {
        return (
            <div className="content">
              <h1>Your <DynaSpan /> NFTs</h1>
              <TokenList tokens= { tokenIds } />
            </div>
        );  
      }
    }
  }
  
  export default YourStripesComponent;