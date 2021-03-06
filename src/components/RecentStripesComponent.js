import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import TokenList from './TokenList';

import { getContract } from '../utils/BlockchainAPI';
import DynaSpan from './DynaSpan';
import MetaMaskLink from './MetaMaskLink';
import { handleError } from '../utils/ErrorHandler';
import * as Errors from '../utils/ErrorMessages';

class RecentStripesComponent extends React.Component {
  
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
  
        var tokenIds = [];
  
        const tokenCount = await contract.totalSupply();
        console.log("Total supply: " + tokenCount);
        const maxToDisplay = 12;
        
        for (var i = tokenCount - 1; i >= 0 && i >= tokenCount - maxToDisplay; i--) {
          const tokenId = await contract.tokenByIndex(i);
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
          this.setState({
            hasWallet: true,
            loading: false,
            tokenIds: []
          });
          handleError(err);  
        }
      }
    }
  
    render() {

      const tokenIds = this.state.tokenIds;
      console.log("RENDER TOKEN IDS: " + tokenIds);

      if (this.state.loading === true) {
        return (
          <div className="content">
            <h1>Recently minted <DynaSpan/> NFTs</h1>
            <Spinner animation="grow" variant="dark" />
          </div>
        );
      } else if (this.state.hasWallet !== undefined && this.state.hasWallet === false) {
        return (
            <div className="content">
              <h1>Recently minted <DynaSpan /> NFTs</h1>
              A crypto wallet is required to view recent <DynaSpan />. Install <MetaMaskLink />.
            </div>
        );
      } else if (tokenIds === null || tokenIds.length === 0) {
        return (
          <div className="content">
            <h1>Recently minted <DynaSpan/> NFTs</h1>
              No stripes have been minted yet.
          </div>
        );
      } else {
        return (
          <div className="content">
            <h1>Recently minted <DynaSpan/> NFTs</h1>
            <TokenList tokens= { tokenIds } />
          </div>
        );  
      }
    }
  }
  
  export default RecentStripesComponent;